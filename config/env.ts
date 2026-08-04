import { z } from "zod";

const environmentSchema = z.object({
  ADMIN_JWT_SECRET: z.string().trim().optional(),
  CRON_SECRET: z.string().trim().optional(),
  DATABASE_URL: z.string().trim().url().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().trim().url().optional(),
  WEB3FORMS_ACCESS_KEY: z.string().trim().min(1).optional(),
  VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
  VERCEL_URL: z.string().trim().min(1).optional(),
});

function getOrigin(value: string) {
  const url = new URL(value.includes("://") ? value : `https://${value}`);

  if (url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error("The site URL must contain only an origin, without a path or credentials.");
  }

  return url.origin;
}

export function resolveDeploymentEnvironment(input: unknown) {
  const environment = environmentSchema.parse(input);
  const explicitSiteUrl = environment.NEXT_PUBLIC_SITE_URL
    ? getOrigin(environment.NEXT_PUBLIC_SITE_URL)
    : undefined;
  const isVercelProduction = environment.VERCEL_ENV === "production";

  if (isVercelProduction) {
    const missing = [
      !environment.DATABASE_URL && "DATABASE_URL",
      (!environment.ADMIN_JWT_SECRET || environment.ADMIN_JWT_SECRET.length < 32) &&
        "ADMIN_JWT_SECRET (32+ characters)",
      (!environment.CRON_SECRET || environment.CRON_SECRET.length < 32) &&
        "CRON_SECRET (32+ characters)",
      !environment.WEB3FORMS_ACCESS_KEY && "WEB3FORMS_ACCESS_KEY",
    ].filter(Boolean);

    if (missing.length > 0) {
      throw new Error(`Missing required production configuration: ${missing.join(", ")}.`);
    }
  }

  if (isVercelProduction && !explicitSiteUrl) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is required for production deployments so canonical URLs remain stable.",
    );
  }

  if (isVercelProduction && explicitSiteUrl && new URL(explicitSiteUrl).protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS in production.");
  }

  const previewUrl = environment.VERCEL_URL ? getOrigin(environment.VERCEL_URL) : undefined;
  const siteUrl = explicitSiteUrl ?? previewUrl ?? "http://localhost:3000";

  return {
    isIndexable: isVercelProduction && Boolean(explicitSiteUrl),
    siteUrl,
    target: environment.VERCEL_ENV ?? "development",
  } as const;
}

export const deploymentEnvironment = resolveDeploymentEnvironment({
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
  CRON_SECRET: process.env.CRON_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  WEB3FORMS_ACCESS_KEY: process.env.WEB3FORMS_ACCESS_KEY,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
});
