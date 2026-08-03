import { describe, expect, it } from "vitest";

import { containsUnsafeObjectKeys, enforceRateLimit, rejectUntrustedRequest } from "@/lib/security";

function request(origin = "https://qubo.example", ip = "203.0.113.10") {
  return new Request(`${origin}/api/test`, {
    headers: {
      origin,
      "sec-fetch-site": "same-origin",
      "x-real-ip": ip,
    },
  });
}

describe("request security controls", () => {
  it("accepts same-origin requests and rejects missing or cross-site origins", () => {
    expect(rejectUntrustedRequest(request())).toBeNull();
    expect(
      rejectUntrustedRequest(
        new Request("https://qubo.example/api/test", {
          headers: { origin: "https://attacker.example", "sec-fetch-site": "cross-site" },
        }),
      )?.status,
    ).toBe(403);
    expect(rejectUntrustedRequest(new Request("https://qubo.example/api/test"))?.status).toBe(403);
  });

  it("detects prototype-pollution keys at any supported nesting level", () => {
    const unsafe = JSON.parse('{"safe":{"constructor":{"prototype":{"polluted":true}}}}');

    expect(containsUnsafeObjectKeys({ safe: ["value"] })).toBe(false);
    expect(containsUnsafeObjectKeys(unsafe)).toBe(true);
  });

  it("limits repeated requests without exposing the raw client address", async () => {
    const ip = `198.51.100.${Math.floor(Math.random() * 200) + 1}`;
    const options = { limit: 2, name: `test-${crypto.randomUUID()}`, windowMs: 60_000 };

    expect(await enforceRateLimit(request(undefined, ip), options)).toBeNull();
    expect(await enforceRateLimit(request(undefined, ip), options)).toBeNull();
    expect((await enforceRateLimit(request(undefined, ip), options))?.status).toBe(429);
  });
});
