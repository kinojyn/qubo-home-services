import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Web3FormsError, sendQuoteToWeb3Forms, sendToWeb3Forms } from "./web3forms";

const originalAccessKey = process.env.WEB3FORMS_ACCESS_KEY;

describe("Web3Forms server delivery", () => {
  beforeEach(() => {
    process.env.WEB3FORMS_ACCESS_KEY = "server-form-key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ success: true }),
        ok: true,
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    if (originalAccessKey === undefined) delete process.env.WEB3FORMS_ACCESS_KEY;
    else process.env.WEB3FORMS_ACCESS_KEY = originalAccessKey;
  });

  it("submits a validated contact form directly to Web3Forms", async () => {
    await sendToWeb3Forms({
      data: {
        consent: true,
        email: "mario@example.com",
        fullName: "Mario Rossi",
        message: "Vorrei informazioni su un intervento.",
        subject: "Informazioni",
        website: "",
      },
      form: "contact",
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({ method: "POST" }),
    );
    const request = vi.mocked(fetch).mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      access_key: "server-form-key",
      botcheck: false,
      from_name: "QUBO",
      subject: "QUBO — Informazioni",
    });
  });

  it("does not forward honeypot submissions", async () => {
    await sendToWeb3Forms({
      data: {
        consent: true,
        email: "mario@example.com",
        fullName: "Mario Rossi",
        message: "Vorrei informazioni su un intervento.",
        subject: "Informazioni",
        website: "https://spam.example",
      },
      form: "contact",
    });

    expect(fetch).not.toHaveBeenCalled();
  });

  it("includes the quote details and reports provider failures", async () => {
    await sendQuoteToWeb3Forms({
      answers: { metri: 20 },
      calculatedPrice: 120,
      categoryId: "pittura",
      consentAt: 1_700_000_000_000,
      createdAt: 1_700_000_000_000,
      customerInfo: {
        address: "Via Roma 1",
        city: "Ruda",
        email: "mario@example.com",
        name: "Mario Rossi",
        notes: "Parete soggiorno",
        phone: "+393201391900",
        photoPaths: [],
        preferredDate: "",
        preferredTime: "",
        zipCode: "",
      },
      customDescription: "",
      customRequest: false,
      id: "Q1",
      localityId: "ruda",
      priceBreakdown: [],
      privacyConsent: true,
      privacyPolicyVersion: "2026-07-19",
      serviceId: "tinteggiatura-pareti",
      status: "new",
      travelDistanceKm: 10,
      travelFee: 10,
      travelOffice: "Cervignano del Friuli",
    });

    const request = vi.mocked(fetch).mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toMatchObject({
      access_key: "server-form-key",
      botcheck: false,
      subject: "Nuova richiesta preventivo — tinteggiatura-pareti",
    });

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({ message: "Invalid form key", success: false }),
      ok: false,
    } as Response);

    await expect(
      sendToWeb3Forms({
        data: {
          consent: true,
          email: "mario@example.com",
          fullName: "Mario Rossi",
          message: "Vorrei informazioni su un intervento.",
          subject: "Informazioni",
          website: "",
        },
        form: "contact",
      }),
    ).rejects.toBeInstanceOf(Web3FormsError);
  });
});
