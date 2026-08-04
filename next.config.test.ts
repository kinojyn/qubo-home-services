import { describe, expect, it } from "vitest";

import nextConfig from "./next.config";

describe("Next security headers", () => {
  it("applies the required security headers to every route", async () => {
    const entries = await nextConfig.headers?.();
    const headers = new Map(entries?.[0]?.headers.map((header) => [header.key, header.value]));

    expect(entries?.[0]?.source).toBe("/(.*)");
    expect(headers.get("Content-Security-Policy")).toContain("frame-ancestors 'none'");
    expect(headers.get("Content-Security-Policy")).toContain(
      "connect-src 'self' https://api.web3forms.com",
    );
    expect(headers.get("Permissions-Policy")).toContain("camera=()");
    expect(headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(headers.get("Strict-Transport-Security")).toBe(
      "max-age=63072000; includeSubDomains; preload",
    );
    expect(headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headers.get("X-Frame-Options")).toBe("DENY");
  });

  it("enables optimized image caching", async () => {
    const entries = await nextConfig.headers?.();
    const imageHeaders = new Map(entries?.[1]?.headers.map((header) => [header.key, header.value]));

    expect(nextConfig.images).toMatchObject({ minimumCacheTTL: 86400 });
    expect(entries?.[1]?.source).toBe("/images/:path*");
    expect(imageHeaders.get("Cache-Control")).toContain("stale-while-revalidate=604800");
  });
});
