import { createHmac, timingSafeEqual } from "crypto";

export type DeliverySubmissionKind = "form" | "quote";

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET?.trim();
  if (!secret) throw new Error("Delivery status signing is not configured.");
  return secret;
}

export function createDeliveryToken(kind: DeliverySubmissionKind, id: string) {
  return createHmac("sha256", getSecret()).update(`${kind}:${id}`).digest("hex");
}

export function verifyDeliveryToken(kind: DeliverySubmissionKind, id: string, token: string) {
  const expected = createDeliveryToken(kind, id);
  const actualBuffer = Buffer.from(token, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");
  return (
    actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer)
  );
}
