import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession, hashPassword, saveUser } from "@/lib/admin/auth";
import { enforceRateLimit, rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";

const passwordSchema = z
  .object({
    password: z.string().min(12).max(128).regex(/[a-z]/).regex(/[A-Z]/).regex(/\d/),
  })
  .strict();

export async function POST(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const rateLimitError = await enforceRateLimit(request, {
    limit: 5,
    name: "auth-password",
    windowMs: 15 * 60_000,
  });
  if (rateLimitError) return rateLimitError;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { password } = passwordSchema.parse(await request.json());

    const hash = await hashPassword(password);
    await saveUser({ username: session.username, passwordHash: hash });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Use a 12+ character password with uppercase, lowercase, and a number." },
        { status: 400 },
      );
    }
    return safeErrorResponse();
  }
}
