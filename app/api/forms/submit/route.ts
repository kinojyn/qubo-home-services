import { NextResponse } from "next/server";
import { z } from "zod";

import { contactRequestSchema } from "@/features/contact";
import { estimateRequestSchema } from "@/features/estimate";
import { enforceRateLimit, rejectUntrustedRequest } from "@/lib/security";

export const runtime = "nodejs";

const requestSchema = z
  .object({
    data: z.unknown(),
    form: z.enum(["contact", "estimate"]),
    website: z.string().max(200).optional().default(""),
  })
  .strict();

export async function POST(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const rateLimitError = await enforceRateLimit(request, {
    limit: 5,
    name: "public-forms",
    windowMs: 10 * 60_000,
  });
  if (rateLimitError) return rateLimitError;

  const parsedRequest = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsedRequest.success) {
    return NextResponse.json({ error: "Invalid form request." }, { status: 400 });
  }
  if (parsedRequest.data.website) {
    return NextResponse.json({ success: true });
  }

  const isValid =
    parsedRequest.data.form === "contact"
      ? contactRequestSchema.safeParse(parsedRequest.data.data).success
      : estimateRequestSchema.safeParse(parsedRequest.data.data).success;

  if (!isValid) {
    return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
