import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join } from "node:path";
import process from "node:process";

import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required.");
}
if (process.env.MIGRATE_LOCAL_CONTENT !== "1") {
  throw new Error("Set MIGRATE_LOCAL_CONTENT=1 to confirm migration of local runtime data.");
}

const contentDir = join(process.cwd(), "content");
const sql = postgres(databaseUrl, {
  connect_timeout: 10,
  max: 1,
  prepare: false,
  ssl: "require",
});

const documents = [
  ["published:quotes-config", join(contentDir, "quotes-config.json")],
  ["published:quotes-submissions", join(contentDir, "quotes-submissions.json")],
  ["published:reviews", join(contentDir, "reviews.json")],
  ["settings", join(contentDir, "settings.json")],
  ["admin-users", join(contentDir, "users.json")],
  ["draft:draft", join(contentDir, "drafts", "draft.json")],
  ["versions:versions", join(contentDir, "versions", "versions.json")],
];

const mimeTypes = {
  ".avif": "image/avif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

try {
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

  let documentCount = 0;
  for (const [key, file] of documents) {
    if (!existsSync(file)) continue;
    const data = JSON.parse(readFileSync(file, "utf8"));
    await sql`
      INSERT INTO qubo_documents (key, data, updated_at)
      VALUES (${key}, ${sql.json(data)}, now())
      ON CONFLICT (key)
      DO UPDATE SET data = EXCLUDED.data, updated_at = now()
    `;
    documentCount += 1;
  }

  const mediaDir = join(contentDir, "media");
  const mediaFiles = existsSync(mediaDir) ? readdirSync(mediaDir) : [];
  let mediaCount = 0;
  for (const filename of mediaFiles) {
    const mimeType = mimeTypes[extname(filename).toLowerCase()];
    if (!mimeType) continue;
    const data = readFileSync(join(mediaDir, filename));
    await sql`
      INSERT INTO qubo_media (filename, mime_type, data)
      VALUES (${filename}, ${mimeType}, ${data})
      ON CONFLICT (filename)
      DO UPDATE SET mime_type = EXCLUDED.mime_type, data = EXCLUDED.data
    `;
    mediaCount += 1;
  }

  console.log(`Migration complete: ${documentCount} documents and ${mediaCount} media files.`);
} finally {
  await sql.end({ timeout: 5 });
}
