import { NextResponse } from "next/server";
import { z } from "zod";

import {
  ensureAdminUser,
  getUsers,
  hasUsers,
  setSessionCookie,
  verifyPassword,
} from "@/lib/admin/auth";
import { enforceRateLimit, rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";

const loginSchema = z
  .object({
    password: z.string().min(1).max(256),
    username: z
      .string()
      .trim()
      .min(1)
      .max(80)
      .regex(/^[a-zA-Z0-9._-]+$/),
  })
  .strict();

export async function POST(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const rateLimitError = await enforceRateLimit(request, {
    limit: 5,
    name: "auth-login",
    windowMs: 60_000,
  });
  if (rateLimitError) return rateLimitError;

  try {
    const { username, password } = loginSchema.parse(await request.json());

    if (!(await hasUsers())) {
      await ensureAdminUser();
    }

    const user = (await getUsers()).find((candidate) => candidate.username === username);
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await setSessionCookie(username);
    return NextResponse.json({ success: true, username });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
    }
    return safeErrorResponse();
  }
}
