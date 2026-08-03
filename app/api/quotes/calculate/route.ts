import { NextResponse } from "next/server";
import { z } from "zod";
import { getQuotesData } from "@/lib/admin/quoteStorage";
import { calculatePrice } from "@/lib/quotes/ruleEngine";
import { enforceRateLimit, rejectUntrustedRequest } from "@/lib/security";

const calculateSchema = z
  .object({
    answers: z
      .record(z.string().max(60), z.union([z.string().max(250), z.number().finite(), z.boolean()]))
      .default({}),
    customRequest: z.boolean().optional(),
    serviceId: z
      .string()
      .regex(/^[a-z0-9-]{1,80}$/)
      .optional(),
  })
  .strict();

export async function POST(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const rateLimitError = await enforceRateLimit(request, {
    limit: 30,
    name: "quote-calculate",
    windowMs: 60_000,
  });
  if (rateLimitError) return rateLimitError;

  const parsed = calculateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid quote request." }, { status: 400 });
  const { serviceId, answers, customRequest } = parsed.data;

  if (customRequest) {
    return NextResponse.json({ total: 0, breakdown: [] });
  }

  const data = await getQuotesData();
  const service = data.services.find((s) => s.id === serviceId);
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const result = calculatePrice(service.basePrice, service.pricingRules, answers ?? {});
  return NextResponse.json({
    total: result.total,
    breakdown: result.breakdown,
    basePrice: service.basePrice,
  });
}
