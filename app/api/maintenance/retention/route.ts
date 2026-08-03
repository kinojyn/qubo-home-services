import { timingSafeEqual } from "node:crypto";

import { pruneExpiredSubmissions } from "@/lib/admin/quoteStorage";
import { safeErrorResponse } from "@/lib/security";

const QUOTE_RETENTION_MS = 365 * 24 * 60 * 60 * 1_000;

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const authorization = request.headers.get("authorization");
  if (!secret || secret.length < 32 || !authorization?.startsWith("Bearer ")) return false;
  const supplied = authorization.slice("Bearer ".length);
  const expectedBuffer = Buffer.from(secret);
  const suppliedBuffer = Buffer.from(supplied);
  return (
    expectedBuffer.length === suppliedBuffer.length &&
    timingSafeEqual(expectedBuffer, suppliedBuffer)
  );
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const removed = await pruneExpiredSubmissions(Date.now() - QUOTE_RETENTION_MS);
    return Response.json({ removed, success: true });
  } catch {
    return safeErrorResponse(500, "Retention task failed.");
  }
}
