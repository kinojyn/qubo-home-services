import { NextResponse } from "next/server";
import { createHash } from "crypto";

import { consumeDatabaseRateLimit, usesDatabaseStorage } from "@/lib/admin/storage";

type RateLimitOptions = {
  limit: number;
  name: string;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const globalRateLimit = globalThis as typeof globalThis & {
  __quboRateLimitBuckets?: Map<string, RateLimitBucket>;
};

const rateLimitBuckets =
  globalRateLimit.__quboRateLimitBuckets ?? new Map<string, RateLimitBucket>();
globalRateLimit.__quboRateLimitBuckets = rateLimitBuckets;
const MAX_LOCAL_BUCKETS = 10_000;

function clientIdentifier(request: Request) {
  const platformIp =
    request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-real-ip");
  return platformIp?.split(",")[0]?.trim() || "anonymous";
}

export function rejectUntrustedRequest(request: Request) {
  const origin = request.headers.get("origin");
  const configuredOrigin =
    process.env.VERCEL_ENV === "production" && process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
      : null;
  const expectedOrigin = configuredOrigin ?? new URL(request.url).origin;

  if (origin !== expectedOrigin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  return null;
}

export async function enforceRateLimit(request: Request, options: RateLimitOptions) {
  const now = Date.now();
  const identifierHash = createHash("sha256").update(clientIdentifier(request)).digest("hex");
  const key = `${options.name}:${identifierHash}`;

  if (usesDatabaseStorage()) {
    try {
      const current = await consumeDatabaseRateLimit(key, options.windowMs);
      if (current && current.count > options.limit) {
        const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          {
            status: 429,
            headers: {
              "Retry-After": String(retryAfter),
              "X-RateLimit-Limit": String(options.limit),
              "X-RateLimit-Remaining": "0",
            },
          },
        );
      }
      return null;
    } catch {
      return safeErrorResponse(503, "Request protection is temporarily unavailable.");
    }
  }

  const current = rateLimitBuckets.get(key);

  for (const [bucketKey, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) rateLimitBuckets.delete(bucketKey);
  }

  if (current && current.resetAt > now && current.count >= options.limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(options.limit),
          "X-RateLimit-Remaining": "0",
        },
      },
    );
  }

  const next =
    current && current.resetAt > now
      ? { ...current, count: current.count + 1 }
      : { count: 1, resetAt: now + options.windowMs };
  rateLimitBuckets.set(key, next);
  if (rateLimitBuckets.size > MAX_LOCAL_BUCKETS) {
    const oldestKey = rateLimitBuckets.keys().next().value as string | undefined;
    if (oldestKey) rateLimitBuckets.delete(oldestKey);
  }

  return null;
}

export function safeErrorResponse(status = 500, message = "Unable to process the request.") {
  return NextResponse.json({ error: message }, { status });
}

export function containsUnsafeObjectKeys(value: unknown, depth = 0): boolean {
  if (depth > 12 || value === null || typeof value !== "object") return depth > 12;
  if (Array.isArray(value)) return value.some((item) => containsUnsafeObjectKeys(item, depth + 1));

  return Object.entries(value).some(
    ([key, item]) =>
      key === "__proto__" ||
      key === "prototype" ||
      key === "constructor" ||
      containsUnsafeObjectKeys(item, depth + 1),
  );
}
