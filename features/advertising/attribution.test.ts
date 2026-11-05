import { describe, expect, it } from "vitest";

import {
  ADVERTISING_WHATSAPP_MESSAGE,
  ADVERTISING_WHATSAPP_URL,
  getAdvertisingLinks,
} from "./attribution";

describe("advertising attribution", () => {
  it("keeps the approved destinations and exact message without a campaign", () => {
    const links = getAdvertisingLinks("");
    expect(links.website).toBe("https://quboservice.com/");
    expect(new URL(links.whatsapp).searchParams.get("text")).toBe(ADVERTISING_WHATSAPP_MESSAGE);
    expect(new URL(ADVERTISING_WHATSAPP_URL).pathname).toBe("/393201391900");
  });

  it("preserves campaign labels on the website and in the editable WhatsApp message", () => {
    const links = getAdvertisingLinks(
      "?utm_source=facebook&utm_medium=paid_social&utm_campaign=casa-2026&utm_content=video_1&utm_term=montaggi",
    );
    const website = new URL(links.website);
    expect(website.searchParams.get("utm_source")).toBe("facebook");
    expect(website.searchParams.size).toBe(5);
    const whatsapp = new URL(links.whatsapp);
    expect(whatsapp.origin).toBe("https://wa.me");
    expect(whatsapp.searchParams.size).toBe(1);
    expect(whatsapp.searchParams.get("text")).toContain(
      "Riferimento campagna: utm_source=facebook",
    );
    expect(whatsapp.searchParams.get("text")).toContain("utm_campaign=casa-2026");
  });

  it("drops unrelated identifiers, personal contact fields and unsafe campaign labels", () => {
    const links = getAdvertisingLinks(
      "?email=mario@example.com&phone=393201391900&fbclid=secret&redirect=https://evil.example&utm_source=facebook&utm_campaign=mario%40example.com&utm_content=%3Cscript%3E&utm_term=" +
        "a".repeat(101),
    );
    expect(new URL(links.website).search).toBe("?utm_source=facebook");
    expect(new URL(links.whatsapp).searchParams.get("text")).toBe(
      `${ADVERTISING_WHATSAPP_MESSAGE}\n\nRiferimento campagna: utm_source=facebook`,
    );
  });
});
