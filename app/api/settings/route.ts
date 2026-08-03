import { getSession } from "@/lib/admin/auth";
import { readSettings, writeSettings } from "@/lib/admin/storage";
import type { ReviewProvider } from "@/types/reviews";
import { z } from "zod";
import { rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";

const DEFAULT_WHATSAPP_NUMBER = "393201391900";

export type AppSettings = {
  whatsappNumber: string;
  reviewProvider: ReviewProvider;
  heroRating: number;
  heroReviewCount: number;
  heroReviewSource: string;
};

const DEFAULT_SETTINGS: AppSettings = {
  whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
  reviewProvider: "manual",
  heroRating: 4.9,
  heroReviewCount: 12,
  heroReviewSource: "Recensioni clienti",
};

const settingsSchema = z
  .object({
    heroRating: z.number().min(0).max(5).optional(),
    heroReviewCount: z.number().int().min(0).max(100_000).optional(),
    heroReviewSource: z.string().trim().min(1).max(80).optional(),
    reviewProvider: z.enum(["manual", "google", "both"]).optional(),
    whatsappNumber: z
      .string()
      .regex(/^\d{8,15}$/)
      .optional(),
  })
  .strict();

async function getSettings(): Promise<AppSettings> {
  const stored = await readSettings<Partial<AppSettings> | null>(null);
  return stored ? { ...DEFAULT_SETTINGS, ...stored } : DEFAULT_SETTINGS;
}

export async function GET() {
  return Response.json(await getSettings());
}

export async function PUT(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = settingsSchema.parse(await request.json());
    const current = await getSettings();
    const updated: AppSettings = {
      ...current,
      whatsappNumber: body.whatsappNumber ?? current.whatsappNumber,
      reviewProvider: (body.reviewProvider as ReviewProvider) ?? current.reviewProvider,
      heroRating: body.heroRating ?? current.heroRating,
      heroReviewCount: body.heroReviewCount ?? current.heroReviewCount,
      heroReviewSource: body.heroReviewSource ?? current.heroReviewSource,
    };
    await writeSettings(updated);
    return Response.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid settings." }, { status: 400 });
    }
    return safeErrorResponse();
  }
}
