import { describe, expect, it } from "vitest";

import { estimateRequestSchema, validateEstimateField } from "./schema";

const VALID_REQUEST = {
  consent: true,
  details: "Serve sistemare una porta interna.",
  email: "mario@example.it",
  fullName: "Mario Rossi",
  phone: "+39 320 123 4567",
  service: "doors",
};

describe("estimateRequestSchema", () => {
  it("accepts and normalizes a valid request", () => {
    const result = estimateRequestSchema.parse({
      ...VALID_REQUEST,
      fullName: "  Mario Rossi  ",
    });

    expect(result.fullName).toBe("Mario Rossi");
  });

  it("rejects invalid phone and email values", () => {
    expect(validateEstimateField("phone", "123")).toBe("Inserisci un numero di telefono valido.");
    expect(validateEstimateField("email", "not-an-email")).toBe(
      "Inserisci un indirizzo email valido.",
    );
  });

  it("requires explicit contact consent", () => {
    const result = estimateRequestSchema.safeParse({ ...VALID_REQUEST, consent: false });

    expect(result.success).toBe(false);
  });
});
