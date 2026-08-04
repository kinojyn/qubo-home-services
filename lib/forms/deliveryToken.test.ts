import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { createDeliveryToken, verifyDeliveryToken } from "./deliveryToken";

const originalSecret = process.env.ADMIN_JWT_SECRET;

describe("delivery status tokens", () => {
  beforeEach(() => {
    process.env.ADMIN_JWT_SECRET = "test-secret-that-is-long-enough-for-delivery-status";
  });

  afterEach(() => {
    if (originalSecret === undefined) delete process.env.ADMIN_JWT_SECRET;
    else process.env.ADMIN_JWT_SECRET = originalSecret;
  });

  it("accepts only the matching submission kind and id", () => {
    const token = createDeliveryToken("form", "F1785860033081");

    expect(verifyDeliveryToken("form", "F1785860033081", token)).toBe(true);
    expect(verifyDeliveryToken("quote", "F1785860033081", token)).toBe(false);
    expect(verifyDeliveryToken("form", "F1785860033082", token)).toBe(false);
    expect(verifyDeliveryToken("form", "F1785860033081", "0".repeat(64))).toBe(false);
  });
});
