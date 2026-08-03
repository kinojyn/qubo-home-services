import type { ContactRequestData } from "./schema";
import { sendToWeb3Forms } from "@/services/web3forms";

export async function submitContact(request: ContactRequestData) {
  const response = await fetch("/api/forms/submit", {
    body: JSON.stringify({ data: request, form: "contact", website: request.website }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  const result = (await response.json().catch(() => null)) as {
    error?: string;
    success?: boolean;
  } | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.error ?? "Unable to send the form right now.");
  }

  await sendToWeb3Forms({ data: request, form: "contact" });
}
