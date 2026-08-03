import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { dirname, isAbsolute, join, resolve } from "path";
import postgres, { type Sql } from "postgres";

const configuredContentDir = process.env.CONTENT_STORAGE_DIR?.trim();
if (configuredContentDir && !isAbsolute(configuredContentDir)) {
  throw new Error("CONTENT_STORAGE_DIR must be an absolute path.");
}

const CONTENT_DIR = configuredContentDir
  ? resolve(configuredContentDir)
  : join(process.cwd(), "content");
const DRAFTS_DIR = join(CONTENT_DIR, "drafts");
const VERSIONS_DIR = join(CONTENT_DIR, "versions");
const MEDIA_DIR = join(CONTENT_DIR, "media");
const SETTINGS_FILE = join(CONTENT_DIR, "settings.json");
const USERS_FILE = join(CONTENT_DIR, "users.json");
const DATABASE_URL = process.env.DATABASE_URL?.trim();
const IS_VERCEL_PRODUCTION = process.env.VERCEL_ENV === "production";

let sqlClient: Sql | undefined;
let schemaPromise: Promise<void> | undefined;

export class PersistentStorageConfigurationError extends Error {
  constructor() {
    super("Persistent storage is not configured for this production deployment.");
    this.name = "PersistentStorageConfigurationError";
  }
}

function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function assertFileWritesAllowed() {
  if (IS_VERCEL_PRODUCTION && !DATABASE_URL) {
    throw new PersistentStorageConfigurationError();
  }
}

function readFileJson<T>(file: string, fallback: T): T {
  try {
    if (!existsSync(file)) return fallback;
    return JSON.parse(readFileSync(file, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function writeFileJson<T>(file: string, data: T) {
  assertFileWritesAllowed();
  ensureDir(dirname(file));
  const temporaryFile = `${file}.${process.pid}.${Date.now()}.tmp`;
  writeFileSync(temporaryFile, JSON.stringify(data, null, 2), {
    encoding: "utf-8",
    mode: 0o600,
  });
  renameSync(temporaryFile, file);
}

function getSql() {
  if (!DATABASE_URL) return null;
  sqlClient ??= postgres(DATABASE_URL, {
    connect_timeout: 10,
    idle_timeout: 20,
    max: 5,
    prepare: false,
    ssl: "require",
  });
  return sqlClient;
}

async function ensureDatabaseSchema(sql: Sql) {
  schemaPromise ??= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS qubo_documents (
        key text PRIMARY KEY,
        data jsonb NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS qubo_media (
        filename text PRIMARY KEY,
        mime_type text NOT NULL,
        data bytea NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS qubo_rate_limits (
        key text PRIMARY KEY,
        count integer NOT NULL,
        reset_at timestamptz NOT NULL
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS qubo_rate_limits_reset_at_idx
      ON qubo_rate_limits (reset_at)
    `;
  })();
  await schemaPromise;
}

async function readDocument<T>(key: string, fallback: T): Promise<T> {
  const sql = getSql();
  if (!sql) return fallback;
  await ensureDatabaseSchema(sql);
  const rows = await sql<{ data: T }[]>`
    SELECT data
    FROM qubo_documents
    WHERE key = ${key}
    LIMIT 1
  `;
  return rows[0]?.data ?? fallback;
}

async function writeDocument<T>(key: string, data: T) {
  const sql = getSql();
  if (!sql) throw new PersistentStorageConfigurationError();
  await ensureDatabaseSchema(sql);
  await sql`
    INSERT INTO qubo_documents (key, data, updated_at)
    VALUES (${key}, ${sql.json(data as never)}, now())
    ON CONFLICT (key)
    DO UPDATE SET data = EXCLUDED.data, updated_at = now()
  `;
}

async function mutateDocument<T>(key: string, fallback: T, mutate: (current: T) => T): Promise<T> {
  const sql = getSql();
  if (!sql) throw new PersistentStorageConfigurationError();
  await ensureDatabaseSchema(sql);
  return (await sql.begin(async (transaction) => {
    const rows = await transaction<{ data: T }[]>`
      SELECT data
      FROM qubo_documents
      WHERE key = ${key}
      FOR UPDATE
    `;
    const next = mutate(rows[0]?.data ?? fallback);
    await transaction`
      INSERT INTO qubo_documents (key, data, updated_at)
      VALUES (${key}, ${transaction.json(next as never)}, now())
      ON CONFLICT (key)
      DO UPDATE SET data = EXCLUDED.data, updated_at = now()
    `;
    return next;
  })) as T;
}

async function readJson<T>(key: string, file: string, fallback: T): Promise<T> {
  if (DATABASE_URL) return readDocument(key, fallback);
  return readFileJson(file, fallback);
}

async function writeJson<T>(key: string, file: string, data: T) {
  if (DATABASE_URL) {
    await writeDocument(key, data);
    return;
  }
  writeFileJson(file, data);
}

export function usesDatabaseStorage() {
  return Boolean(DATABASE_URL);
}

export async function consumeDatabaseRateLimit(key: string, windowMs: number) {
  const sql = getSql();
  if (!sql) return null;
  await ensureDatabaseSchema(sql);
  const resetAt = new Date(Date.now() + windowMs);
  const rows = await sql<{ count: number; reset_at: Date }[]>`
    INSERT INTO qubo_rate_limits (key, count, reset_at)
    VALUES (${key}, 1, ${resetAt})
    ON CONFLICT (key)
    DO UPDATE SET
      count = CASE
        WHEN qubo_rate_limits.reset_at <= now() THEN 1
        ELSE qubo_rate_limits.count + 1
      END,
      reset_at = CASE
        WHEN qubo_rate_limits.reset_at <= now() THEN EXCLUDED.reset_at
        ELSE qubo_rate_limits.reset_at
      END
    RETURNING count, reset_at
  `;
  await sql`DELETE FROM qubo_rate_limits WHERE reset_at < now() - interval '1 day'`;
  const row = rows[0];
  return row
    ? { count: Number(row.count), resetAt: new Date(row.reset_at).getTime() }
    : { count: 1, resetAt: resetAt.getTime() };
}

export async function initStorage() {
  const sql = getSql();
  if (sql) {
    await ensureDatabaseSchema(sql);
    return;
  }
  assertFileWritesAllowed();
  ensureDir(CONTENT_DIR);
  ensureDir(DRAFTS_DIR);
  ensureDir(VERSIONS_DIR);
  ensureDir(MEDIA_DIR);
}

export function readDraft<T>(key: string, fallback: T): Promise<T> {
  return readJson(`draft:${key}`, join(DRAFTS_DIR, `${key}.json`), fallback);
}

export function writeDraft<T>(key: string, data: T): Promise<void> {
  return writeJson(`draft:${key}`, join(DRAFTS_DIR, `${key}.json`), data);
}

export function readPublished<T>(key: string, fallback: T): Promise<T> {
  return readJson(`published:${key}`, join(CONTENT_DIR, `${key}.json`), fallback);
}

export function publishDraft<T>(key: string, data: T): Promise<void> {
  return writeJson(`published:${key}`, join(CONTENT_DIR, `${key}.json`), data);
}

export async function mutatePublished<T>(
  key: string,
  fallback: T,
  mutate: (current: T) => T,
): Promise<T> {
  if (DATABASE_URL) return mutateDocument(`published:${key}`, fallback, mutate);
  const file = join(CONTENT_DIR, `${key}.json`);
  const next = mutate(readFileJson(file, fallback));
  writeFileJson(file, next);
  return next;
}

export async function saveVersion(key: string, record: unknown) {
  if (DATABASE_URL) {
    await mutateDocument<unknown[]>(`versions:${key}`, [], (versions) => [...versions, record]);
    return;
  }
  const file = join(VERSIONS_DIR, `${key}.json`);
  const versions = readFileJson<unknown[]>(file, []);
  writeFileJson(file, [...versions, record]);
}

export function readVersions(key: string): Promise<unknown[]> {
  return readJson(`versions:${key}`, join(VERSIONS_DIR, `${key}.json`), []);
}

export function readSettings<T>(fallback: T): Promise<T> {
  return readJson("settings", SETTINGS_FILE, fallback);
}

export function writeSettings<T>(data: T): Promise<void> {
  return writeJson("settings", SETTINGS_FILE, data);
}

export function readUsers<T>(fallback: T): Promise<T> {
  return readJson("admin-users", USERS_FILE, fallback);
}

export function writeUsers<T>(data: T): Promise<void> {
  return writeJson("admin-users", USERS_FILE, data);
}

export async function getMediaList(): Promise<string[]> {
  const sql = getSql();
  if (sql) {
    await ensureDatabaseSchema(sql);
    const rows = await sql<{ filename: string }[]>`
      SELECT filename
      FROM qubo_media
      ORDER BY created_at DESC
    `;
    return rows.map((row) => row.filename);
  }
  if (!existsSync(MEDIA_DIR)) return [];
  return readdirSync(MEDIA_DIR);
}

export async function saveMedia(filename: string, mimeType: string, data: Buffer) {
  const sql = getSql();
  if (sql) {
    await ensureDatabaseSchema(sql);
    await sql`
      INSERT INTO qubo_media (filename, mime_type, data)
      VALUES (${filename}, ${mimeType}, ${data})
    `;
    return;
  }
  assertFileWritesAllowed();
  ensureDir(MEDIA_DIR);
  writeFileSync(resolve(MEDIA_DIR, filename), data, { flag: "wx", mode: 0o600 });
}

export async function readMedia(
  filename: string,
): Promise<{ data: Buffer; mimeType: string } | null> {
  const sql = getSql();
  if (sql) {
    await ensureDatabaseSchema(sql);
    const rows = await sql<{ data: Buffer; mime_type: string }[]>`
      SELECT data, mime_type
      FROM qubo_media
      WHERE filename = ${filename}
      LIMIT 1
    `;
    const row = rows[0];
    return row ? { data: Buffer.from(row.data), mimeType: row.mime_type } : null;
  }
  const path = resolve(MEDIA_DIR, filename);
  if (!existsSync(path)) return null;
  const extension = filename.split(".").pop()?.toLowerCase();
  const mimeType =
    extension === "jpg"
      ? "image/jpeg"
      : extension === "png"
        ? "image/png"
        : extension === "webp"
          ? "image/webp"
          : "image/avif";
  return { data: Buffer.from(readFileSync(path)), mimeType };
}

export async function deleteMedia(filename: string) {
  const sql = getSql();
  if (sql) {
    await ensureDatabaseSchema(sql);
    await sql`DELETE FROM qubo_media WHERE filename = ${filename}`;
    return;
  }
  assertFileWritesAllowed();
  const path = resolve(MEDIA_DIR, filename);
  if (existsSync(path)) unlinkSync(path);
}
