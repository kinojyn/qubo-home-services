import type { EstimateRequestData } from "./schema";
import { reportFormDelivery } from "@/services/reportFormDelivery";
import { sendToWeb3Forms } from "@/services/web3forms";

export async function submitEstimate(request: EstimateRequestData) {
  const response = await fetch("/api/forms/submit", {
    body: JSON.stringify({ data: request, form: "estimate", website: request.website }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  const result = (await response.json().catch(() => null)) as {
    deliveryToken?: string;
    error?: string;
    id?: string;
    success?: boolean;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.error ?? "Unable to send the form right now.");
  }

  try {
    await sendToWeb3Forms({ data: request, form: "estimate" });
    if (result.id && result.deliveryToken) {
      await reportFormDelivery({
        id: result.id,
        kind: "form",
        status: "delivered",
        token: result.deliveryToken,
      });
    }
  } catch (error) {
    if (result.id && result.deliveryToken) {
      await reportFormDelivery({
        error: error instanceof Error ? error.message.slice(0, 200) : undefined,
        id: result.id,
        kind: "form",
        status: "failed",
        token: result.deliveryToken,
      });
    }
  }
}
