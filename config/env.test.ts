import { describe, expect, it } from "vitest";

import { resolveDeploymentEnvironment } from "@/config/env";

const PRODUCTION_SECURITY = {
  ADMIN_JWT_SECRET: "a".repeat(48),
  CRON_SECRET: "c".repeat(48),
  DATABASE_URL: "postgresql://user:password@example.com:5432/qubo",
  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: "test-access-key",
} as const;

describe("resolveDeploymentEnvironment", () => {
  it("uses a safe local origin by default and prevents indexing", () => {
    expect(resolveDeploymentEnvironment({})).toEqual({
      isIndexable: false,
      siteUrl: "http://localhost:3000",
      target: "development",
    });
  });

  it("uses the generated Vercel URL for non-indexable previews", () => {
    expect(
      resolveDeploymentEnvironment({
        VERCEL_ENV: "preview",
        VERCEL_URL: "qubo-preview.vercel.app",
      }),
    ).toEqual({
      isIndexable: false,
      siteUrl: "https://qubo-preview.vercel.app",
      target: "preview",
    });
  });

  it("accepts an explicit HTTPS production origin", () => {
    expect(
      resolveDeploymentEnvironment({
        ...PRODUCTION_SECURITY,
        NEXT_PUBLIC_SITE_URL: "https://qubo.example/",
        VERCEL_ENV: "production",
      }),
    ).toEqual({
      isIndexable: true,
      siteUrl: "https://qubo.example",
      target: "production",
    });
  });

  it("fails when a production origin is missing or insecure", () => {
    expect(() =>
      resolveDeploymentEnvironment({ ...PRODUCTION_SECURITY, VERCEL_ENV: "production" }),
    ).toThrow("NEXT_PUBLIC_SITE_URL is required");
    expect(() =>
      resolveDeploymentEnvironment({
        ...PRODUCTION_SECURITY,
        NEXT_PUBLIC_SITE_URL: "http://qubo.example",
        VERCEL_ENV: "production",
      }),
    ).toThrow("must use HTTPS");
  });

  it("requires persistent storage, delivery, and a strong JWT secret in production", () => {
    expect(() =>
      resolveDeploymentEnvironment({
        NEXT_PUBLIC_SITE_URL: "https://qubo.example",
        VERCEL_ENV: "production",
      }),
    ).toThrow("Missing required production configuration");
  });

  it("requires the Web3Forms public form key in production", () => {
    expect(() =>
      resolveDeploymentEnvironment({
        ADMIN_JWT_SECRET: PRODUCTION_SECURITY.ADMIN_JWT_SECRET,
        CRON_SECRET: PRODUCTION_SECURITY.CRON_SECRET,
        DATABASE_URL: PRODUCTION_SECURITY.DATABASE_URL,
        NEXT_PUBLIC_SITE_URL: "https://qubo.example",
        VERCEL_ENV: "production",
      }),
    ).toThrow("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY");
  });

  it("rejects URLs containing paths, credentials, queries, or fragments", () => {
    expect(() =>
      resolveDeploymentEnvironment({ NEXT_PUBLIC_SITE_URL: "https://example.com/services" }),
    ).toThrow("must contain only an origin");
    expect(() =>
      resolveDeploymentEnvironment({ NEXT_PUBLIC_SITE_URL: "https://user@example.com" }),
    ).toThrow("must contain only an origin");
  });
});
