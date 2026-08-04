import { NextResponse } from "next/server";
import { z } from "zod";

import { updateFormSubmissionDelivery } from "@/lib/admin/formSubmissionStorage";
import { updateSubmissionDelivery } from "@/lib/admin/quoteStorage";
import { verifyDeliveryToken } from "@/lib/forms/deliveryToken";
import { enforceRateLimit, rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";

export const runtime = "nodejs";

const deliverySchema = z
  .object({
    error: z.string().trim().max(200).optional(),
    id: z.string().regex(/^[FQ]\d{10,20}$/),
    kind: z.enum(["form", "quote"]),
    status: z.enum(["delivered", "failed"]),
    token: z.string().regex(/^[a-f0-9]{64}$/),
  })
  .strict();

export async function POST(request: Request) {
  const originError = rejectUntrustedRequest(request);
  if (originError) return originError;
  const rateLimitError = await enforceRateLimit(request, {
    limit: 10,
    name: "form-delivery-status",
    windowMs: 10 * 60_000,
  });
  if (rateLimitError) return rateLimitError;

  const parsed = deliverySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid delivery status." }, { status: 400 });
  }

  const { error, id, kind, status, token } = parsed.data;
  if (!verifyDeliveryToken(kind, id, token)) {
    return NextResponse.json({ error: "Invalid delivery token." }, { status: 403 });
  }

  try {
    if (status === "failed") {
      console.error("Browser notification delivery failed", {
        id,
        kind,
        message: error ?? "Unknown browser delivery error.",
      });
    }
    const delivery = {
      status,
      attemptedAt: Date.now(),
      ...(status === "failed" && error ? { error } : {}),
    } as const;
    const updated =
      kind === "form"
        ? await updateFormSubmissionDelivery(id, delivery)
        : await updateSubmissionDelivery(id, delivery);
    return NextResponse.json({ success: updated });
  } catch {
    return safeErrorResponse();
  }
}
