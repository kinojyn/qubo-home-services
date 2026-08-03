import { contactRequestSchema, type ContactRequestData } from "@/features/contact";
import { estimateRequestSchema, type EstimateRequestData } from "@/features/estimate";
import type { QuoteSubmission } from "@/types/quotes";
import { PRIVACY_POLICY_VERSION } from "@/constants/privacy";

type Submission =
  { form: "contact"; data: ContactRequestData } | { form: "estimate"; data: EstimateRequestData };

export class Web3FormsError extends Error {
  constructor(message = "Unable to deliver the form right now.") {
    super(message);
    this.name = "Web3FormsError";
  }
}

function getAccessKey() {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    throw new Web3FormsError("Form delivery is not configured.");
  }

  return accessKey;
}

async function postToWeb3Forms(payload: Record<string, unknown>) {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      signal: AbortSignal.timeout(10_000),
    });

    const result = (await response.json().catch(() => null)) as {
      message?: string;
      success?: boolean;
    } | null;
    if (!response.ok || !result?.success) {
      throw new Web3FormsError(result?.message);
    }
  } catch (error) {
    if (error instanceof Web3FormsError) throw error;
    throw new Web3FormsError(
      error instanceof Error ? error.message : "Unable to deliver the form right now.",
    );
  }
}

export async function sendToWeb3Forms(submission: Submission) {
  if (submission.data.website) return;

  const payload =
    submission.form === "contact"
      ? (() => {
          const data = contactRequestSchema.parse(submission.data);
          return {
            access_key: getAccessKey(),
            botcheck: false,
            email: data.email,
            from_name: "QUBO",
            message: data.message,
            name: data.fullName,
            replyto: data.email,
            request_type: "contact",
            subject: `QUBO — ${data.subject}`,
            topic: data.subject,
            privacy_consent: "accepted",
            privacy_policy_version: PRIVACY_POLICY_VERSION,
            consent_recorded_at: new Date().toISOString(),
          };
        })()
      : (() => {
          const data = estimateRequestSchema.parse(submission.data);
          return {
            access_key: getAccessKey(),
            botcheck: false,
            email: data.email || undefined,
            from_name: "QUBO",
            message: data.details,
            name: data.fullName,
            phone: data.phone,
            replyto: data.email || undefined,
            request_type: "estimate",
            service: data.service,
            subject: `Nuova richiesta preventivo — ${data.service}`,
            privacy_consent: "accepted",
            privacy_policy_version: PRIVACY_POLICY_VERSION,
            consent_recorded_at: new Date().toISOString(),
          };
        })();

  await postToWeb3Forms(payload);
}

export async function sendQuoteToWeb3Forms(submission: QuoteSubmission) {
  const { customerInfo } = submission;
  const service = submission.serviceId || submission.categoryId || "Richiesta personalizzata";
  const answers = Object.entries(submission.answers)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join("\n");
  const message = [
    `Nome: ${customerInfo.name}`,
    `Email: ${customerInfo.email || "Non fornito"}`,
    `Telefono: ${customerInfo.phone || "Non fornito"}`,
    `Comune FVG: ${customerInfo.city || "Non fornito"}`,
    `Indirizzo: ${customerInfo.address || "Non fornito"}`,
    `CAP: ${customerInfo.zipCode || "Non fornito"}`,
    `Data preferita: ${customerInfo.preferredDate || "Non fornita"}`,
    `Orario preferito: ${customerInfo.preferredTime || "Non fornito"}`,
    `Servizio: ${service}`,
    `Prezzo stimato: €${submission.calculatedPrice}`,
    `Supplemento viaggio: ${submission.travelFee > 0 ? `€${submission.travelFee}` : "Incluso"}`,
    submission.travelDistanceKm !== null
      ? `Distanza da ${submission.travelOffice}: ${submission.travelDistanceKm} km`
      : "",
    submission.customRequest ? `Richiesta personalizzata: ${submission.customDescription}` : "",
    answers ? `Risposte:\n${answers}` : "",
    customerInfo.notes ? `Note: ${customerInfo.notes}` : "",
    `ID richiesta: ${submission.id}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  await postToWeb3Forms({
    access_key: getAccessKey(),
    botcheck: false,
    email: customerInfo.email || undefined,
    from_name: "QUBO",
    message,
    name: customerInfo.name,
    phone: customerInfo.phone || undefined,
    replyto: customerInfo.email || undefined,
    request_type: "estimate",
    service,
    subject: `Nuova richiesta preventivo — ${service}`,
    privacy_consent: "accepted",
    privacy_policy_version: submission.privacyPolicyVersion,
    consent_recorded_at: new Date(submission.consentAt).toISOString(),
  });
}
