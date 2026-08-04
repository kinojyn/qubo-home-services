export async function reportFormDelivery(input: {
  id: string;
  kind: "form" | "quote";
  token: string;
  status: "delivered" | "failed";
  error?: string;
}) {
  await fetch("/api/forms/delivery", {
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).catch(() => undefined);
}
