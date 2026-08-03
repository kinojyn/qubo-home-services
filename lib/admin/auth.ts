import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { cookies } from "next/headers";
import type { AdminUser } from "@/types/admin";

import { readUsers, writeUsers } from "./storage";

const SESSION_COOKIE =
  process.env.NODE_ENV === "production" ? "__Host-qubo_admin_session" : "qubo_admin_session";
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours
const JWT_ISSUER = "qubo-admin";
const JWT_AUDIENCE = "qubo-admin-panel";
const DEVELOPMENT_SECRET_FILE = join(process.cwd(), "content", ".admin-jwt-secret");

let developmentJwtSecret: string | undefined;

function getDevelopmentJwtSecret() {
  if (developmentJwtSecret) return developmentJwtSecret;

  try {
    if (existsSync(DEVELOPMENT_SECRET_FILE)) {
      const savedSecret = readFileSync(DEVELOPMENT_SECRET_FILE, "utf8").trim();
      if (savedSecret.length >= 32) {
        developmentJwtSecret = savedSecret;
        return savedSecret;
      }
    }

    const generatedSecret = randomBytes(48).toString("hex");
    mkdirSync(dirname(DEVELOPMENT_SECRET_FILE), { recursive: true });
    writeFileSync(DEVELOPMENT_SECRET_FILE, generatedSecret, {
      encoding: "utf8",
      mode: 0o600,
    });
    developmentJwtSecret = generatedSecret;
    return generatedSecret;
  } catch {
    developmentJwtSecret = randomBytes(48).toString("hex");
    return developmentJwtSecret;
  }
}

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET?.trim();
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_JWT_SECRET must be set to at least 32 characters in production.");
  }
  return getDevelopmentJwtSecret();
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createToken(username: string): string {
  return jwt.sign({ username }, getJwtSecret(), {
    algorithm: "HS256",
    audience: JWT_AUDIENCE,
    expiresIn: SESSION_MAX_AGE,
    issuer: JWT_ISSUER,
  });
}

export function verifyToken(token: string): { username: string } | null {
  try {
    return jwt.verify(token, getJwtSecret(), {
      algorithms: ["HS256"],
      audience: JWT_AUDIENCE,
      issuer: JWT_ISSUER,
    }) as { username: string };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<{ username: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setSessionCookie(username: string) {
  const cookieStore = await cookies();
  const token = createToken(username);
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_MAX_AGE,
    path: "/",
    priority: "high",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function getUsers(): Promise<AdminUser[]> {
  return readUsers<AdminUser[]>([]);
}

export async function saveUser(user: AdminUser) {
  const users = (await getUsers()).filter((u) => u.username !== user.username);
  users.push(user);
  await writeUsers(users);
}

export async function hasUsers(): Promise<boolean> {
  return (await getUsers()).length > 0;
}

export async function ensureAdminUser() {
  if (!(await hasUsers())) {
    const username = process.env.ADMIN_INITIAL_USERNAME?.trim();
    const password = process.env.ADMIN_INITIAL_PASSWORD;
    if (!username || !password || password.length < 12) {
      throw new Error(
        "Set ADMIN_INITIAL_USERNAME and a 12+ character ADMIN_INITIAL_PASSWORD to create the first admin.",
      );
    }
    await saveUser({
      username,
      passwordHash: await hashPassword(password),
    });
  }
}
