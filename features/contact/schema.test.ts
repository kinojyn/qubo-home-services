import { describe, expect, it } from "vitest";

import { contactRequestSchema, validateContactField } from "./schema";

const VALID_REQUEST = {
  consent: true,
  email: "mario@example.it",
  fullName: "Mario Rossi",
  message: "Vorrei sapere quali zone servite.",
  subject: "services",
};

describe("contactRequestSchema", () => {
  it("accepts and normalizes a valid message", () => {
    const result = contactRequestSchema.parse({
      ...VALID_REQUEST,
      fullName: "  Mario Rossi  ",
      message: "  Vorrei sapere quali zone servite.  ",
    });

    expect(result.fullName).toBe("Mario Rossi");
    expect(result.message).toBe("Vorrei sapere quali zone servite.");
  });

  it("rejects invalid email and short messages", () => {
    expect(validateContactField("email", "not-an-email")).toBe(
      "Inserisci un indirizzo email valido.",
    );
    expect(validateContactField("message", "Ciao")).toBe(
      "Scrivi un messaggio di almeno 10 caratteri.",
    );
  });

  it("requires explicit contact consent", () => {
    const result = contactRequestSchema.safeParse({ ...VALID_REQUEST, consent: false });

    expect(result.success).toBe(false);
  });
});
