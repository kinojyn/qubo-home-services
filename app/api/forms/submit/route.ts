import { NextResponse } from "next/server";
import { z } from "zod";

import { contactRequestSchema } from "@/features/contact";
import { estimateRequestSchema } from "@/features/estimate";
import { getSession } from "@/lib/admin/auth";
import {
  addFormSubmission,
  getFormSubmissions,
  type StoredFormSubmission,
  updateFormSubmissionDelivery,
} from "@/lib/admin/formSubmissionStorage";
import { enforceRateLimit, rejectUntrustedRequest, safeErrorResponse } from "@/lib/security";
import { sendToWeb3Forms } from "@/services/web3forms";

export const runtime = "nodejs";

const requestSchema = z
  .object({
    data: z.unknown(),
    form: z.enum(["contact", "estimate"]),
    website: z.string().max(200).optional().default(""),
  })
  .strict();

function deliveryErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message.slice(0, 200)
    : "The notification provider rejected the request.";
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const submissions = await getFormSubmissions();
  submissions.sort((a, b) => b.createdAt - a.createdAt);
  return NextResponse.json(submissions);
}

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

  const parsedData =
    parsedRequest.data.form === "contact"
      ? contactRequestSchema.safeParse(parsedRequest.data.data)
      : estimateRequestSchema.safeParse(parsedRequest.data.data);

  if (!parsedData.success) {
    return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
  }

  try {
    const id = `F${Date.now()}`;
    const createdAt = Date.now();
    const submission = {
      id,
      createdAt,
      form: parsedRequest.data.form,
      data: parsedData.data,
      delivery: { status: "pending" as const },
    } as StoredFormSubmission;

    await addFormSubmission(submission);

    try {
      await sendToWeb3Forms(
        submission.form === "contact"
          ? { form: "contact", data: submission.data }
          : { form: "estimate", data: submission.data },
      );
      await updateFormSubmissionDelivery(id, {
        status: "delivered",
        attemptedAt: Date.now(),
      });
      return NextResponse.json({ success: true, saved: true, delivered: true, id });
    } catch (error) {
      const message = deliveryErrorMessage(error);
      console.error("Form notification delivery failed", { id, message });
      await updateFormSubmissionDelivery(id, {
        status: "failed",
        attemptedAt: Date.now(),
        error: message,
      });
      return NextResponse.json({ success: true, saved: true, delivered: false, id });
    }
  } catch {
    return safeErrorResponse();
  }
}
