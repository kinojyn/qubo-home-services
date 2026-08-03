import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/admin/auth";
import { getQuotesData, saveQuotesData } from "@/lib/admin/quoteStorage";
import type { QuotesData } from "@/types/quotes";
import { rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";

const id = z.string().regex(/^[a-z0-9-]{1,80}$/);
const adjustmentSchema = z
  .object({
    amount: z.number().finite().min(-100_000).max(100_000),
    label: z.string().trim().max(120),
    type: z.enum(["fixed", "percentage", "per_unit"]),
    unitField: z.string().max(80).optional(),
  })
  .strict();
const quotesDataSchema = z
  .object({
    categories: z
      .array(
        z
          .object({
            icon: z.string().max(80),
            id,
            name: z.string().trim().min(1).max(100),
            order: z.number().int().min(0).max(100),
          })
          .strict(),
      )
      .min(1)
      .max(20),
    services: z
      .array(
        z
          .object({
            basePrice: z.number().finite().min(0).max(100_000),
            categoryId: id,
            description: z.string().trim().max(500),
            id,
            name: z.string().trim().min(1).max(120),
            order: z.number().int().min(0).max(100),
            pricingRules: z
              .array(
                z
                  .object({
                    adjustments: z.array(adjustmentSchema).max(10),
                    conditions: z
                      .array(
                        z
                          .object({
                            field: z.string().max(80),
                            operator: z.enum(["eq", "neq", "gt", "gte", "lt", "lte"]),
                            value: z.union([z.string().max(100), z.number().finite(), z.boolean()]),
                          })
                          .strict(),
                      )
                      .max(10),
                    id,
                  })
                  .strict(),
              )
              .max(20),
            questions: z
              .array(
                z
                  .object({
                    id,
                    key: z.string().regex(/^[a-zA-Z0-9_]{1,80}$/),
                    label: z.string().trim().max(150),
                    options: z.array(z.string().trim().max(100)).max(50),
                    order: z.number().int().min(0).max(100),
                    required: z.boolean(),
                    type: z.enum([
                      "dropdown",
                      "radio",
                      "checkbox",
                      "number",
                      "text",
                      "image",
                      "toggle",
                    ]),
                  })
                  .strict(),
              )
              .max(20),
          })
          .strict(),
      )
      .max(100),
  })
  .strict();

export async function GET() {
  const data = await getQuotesData();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = quotesDataSchema.parse(await request.json()) as QuotesData;
    await saveQuotesData(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json({ error: "Invalid quote configuration." }, { status: 400 });
    return safeErrorResponse();
  }
}
