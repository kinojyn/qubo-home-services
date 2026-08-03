import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/admin/auth";
import { getReviewsData, saveReviewsData } from "@/lib/admin/reviewStorage";
import type { Review } from "@/types/reviews";
import { rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";

const reviewSchema = z
  .object({
    avatar: z.string().max(500).optional(),
    badges: z
      .array(z.enum(["verified", "recommended", "emergency", "repeat", "new"]))
      .max(5)
      .optional(),
    city: z.string().trim().max(80).optional(),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    name: z.string().trim().max(80).optional(),
    pinned: z.boolean().optional(),
    provider: z.enum(["manual", "google", "both"]).optional(),
    rating: z.number().min(0.5).max(5).optional(),
    service: z.string().trim().max(100).optional(),
    status: z.enum(["visible", "hidden"]).optional(),
    text: z.string().trim().max(1_000).optional(),
  })
  .strict();

const reviewsDataSchema = z
  .object({
    provider: z.enum(["manual", "google", "both"]).optional(),
    reviews: z.array(reviewSchema).max(200).optional(),
  })
  .strict();

export async function GET() {
  const data = await getReviewsData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = reviewSchema.parse(await request.json()) as Partial<Review>;
    const data = await getReviewsData();
    const now = Date.now();
    const review: Review = {
      id: body.id || `review-${now}-${Math.random().toString(36).slice(2, 7)}`,
      name: body.name || "",
      city: body.city || "",
      service: body.service || "",
      rating: Math.min(5, Math.max(0.5, body.rating ?? 5)),
      text: body.text || "",
      date: body.date || new Date().toISOString().split("T")[0],
      createdAt: body.createdAt || now,
      updatedAt: now,
      status: body.status ?? "visible",
      pinned: body.pinned ?? false,
      badges: body.badges ?? ["verified"],
      avatar: body.avatar,
      provider: body.provider ?? "manual",
      googleReviewId: body.googleReviewId,
      customerId: body.customerId,
    };
    data.reviews = [review, ...data.reviews];
    await saveReviewsData(data);
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: "Invalid review." }, { status: 400 });
    return safeErrorResponse();
  }
}

export async function PUT(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = reviewsDataSchema.parse(await request.json()) as {
      provider?: string;
      reviews?: Review[];
    };
    const data = await getReviewsData();

    if (body.provider) {
      data.provider = body.provider as "manual" | "google" | "both";
    }

    if (body.reviews) {
      data.reviews = body.reviews;
    }

    await saveReviewsData(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: "Invalid reviews data." }, { status: 400 });
    return safeErrorResponse();
  }
}
