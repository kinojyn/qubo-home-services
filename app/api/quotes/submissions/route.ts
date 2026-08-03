import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/admin/auth";
import { addSubmission, getSubmissions } from "@/lib/admin/quoteStorage";
import type { QuoteSubmission } from "@/types/quotes";
import { calculatePrice } from "@/lib/quotes/ruleEngine";
import { getQuotesData } from "@/lib/admin/quoteStorage";
import { enforceRateLimit, rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";
import { findFvgLocality, formatFvgLocality } from "@/data/fvgLocalities";
import { PRIVACY_POLICY_VERSION } from "@/constants/privacy";

const submissionSchema = z
  .object({
    answers: z
      .record(
        z.string().max(60),
        z.union([
          z.string().max(250),
          z.number().finite(),
          z.boolean(),
          z.array(z.string().max(100)).max(10),
        ]),
      )
      .default({}),
    categoryId: z.string().regex(/^[a-z0-9-]{1,80}$/),
    customDescription: z.string().trim().max(1_000).optional(),
    customRequest: z.boolean().optional(),
    localityId: z
      .string()
      .trim()
      .regex(/^[a-z0-9-]{1,64}$/i),
    privacyConsent: z.literal(true),
    privacyPolicyVersion: z.literal(PRIVACY_POLICY_VERSION),
    consentAt: z.number().int().nonnegative(),
    customerInfo: z
      .object({
        address: z.string().trim().min(2).max(200),
        city: z.string().trim().min(2).max(100),
        email: z
          .string()
          .trim()
          .max(254)
          .refine((value) => value === "" || z.email().safeParse(value).success),
        name: z.string().trim().min(2).max(80),
        notes: z.string().trim().max(1_000),
        phone: z
          .string()
          .trim()
          .regex(/^[+\d][\d\s().-]{6,23}$/),
      })
      .strip(),
    serviceId: z
      .string()
      .regex(/^[a-z0-9-]{1,80}$/)
      .optional(),
    travelDistanceKm: z.number().finite().min(0).max(300).nullable().optional(),
    travelFee: z.number().finite().min(0).max(500).optional(),
    travelOffice: z.string().trim().max(100).optional(),
  })
  .strip();
const honeypotSchema = z
  .object({ website: z.string().max(200).optional().default("") })
  .passthrough();

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const submissions = await getSubmissions();
  submissions.sort((a, b) => b.createdAt - a.createdAt);
  return NextResponse.json(submissions);
}

export async function POST(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const rateLimitError = await enforceRateLimit(request, {
    limit: 5,
    name: "quote-submissions",
    windowMs: 10 * 60_000,
  });
  if (rateLimitError) return rateLimitError;

  const rawBody: unknown = await request.json().catch(() => null);
  const honeypot = honeypotSchema.safeParse(rawBody);
  if (honeypot.success && honeypot.data.website) return NextResponse.json({ success: true });

  const parsed = submissionSchema.safeParse(rawBody);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid quote submission." }, { status: 400 });

  try {
    const body = parsed.data;
    const locality = findFvgLocality(body.localityId);
    if (!locality) {
      return NextResponse.json({ error: "Invalid FVG locality." }, { status: 400 });
    }
    const quotesData = await getQuotesData();
    const service = quotesData.services.find(
      (item) => item.id === body.serviceId && item.categoryId === body.categoryId,
    );
    const customRequest = body.customRequest === true;
    if (!customRequest && !service) {
      return NextResponse.json({ error: "Invalid quote service." }, { status: 400 });
    }
    const calculatedService = service
      ? calculatePrice(service.basePrice, service.pricingRules, body.answers)
      : { total: 0, breakdown: [] };
    const submission: QuoteSubmission = {
      id: `Q${Date.now()}`,
      createdAt: Date.now(),
      ...body,
      customerInfo: {
        ...body.customerInfo,
        city: formatFvgLocality(locality),
        photoPaths: [],
        preferredDate: "",
        preferredTime: "",
        zipCode: "",
      },
      serviceId: body.serviceId ?? "",
      calculatedPrice: calculatedService.total + locality.fee,
      customDescription: body.customDescription ?? "",
      customRequest,
      privacyConsent: true,
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      consentAt: Date.now(),
      priceBreakdown: [
        ...(service ? [{ label: service.name, amount: service.basePrice }] : []),
        ...calculatedService.breakdown,
        ...(locality.fee > 0
          ? [{ label: `Supplemento viaggio (${locality.name})`, amount: locality.fee }]
          : []),
      ],
      travelFee: locality.fee,
      travelDistanceKm: locality.distance,
      travelOffice: "Cervignano del Friuli",
      status: "new",
    };

    await addSubmission(submission);

    return NextResponse.json({ success: true, id: submission.id });
  } catch {
    return safeErrorResponse();
  }
}
