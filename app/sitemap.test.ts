import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import { SERVICE_AREAS } from "@/data/serviceAreas";
import { SERVICE_DETAILS } from "@/data/services";

import sitemap from "./sitemap";

describe("sitemap", () => {
  it("contains every public static and service route exactly once", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    const expectedPaths = [
      "/",
      "/services",
      "/richiedi-preventivo",
      "/about",
      "/contact",
      "/gallery",
      "/faq",
      "/zone-servite",
      "/privacy",
      "/cookie-policy",
      "/termini",
      ...SERVICE_DETAILS.map((service) => `/services/${service.slug}`),
      ...SERVICE_AREAS.map((area) => `/zone-servite/${area.slug}`),
    ];

    expect(entries).toHaveLength(expectedPaths.length);
    expect(new Set(urls).size).toBe(urls.length);
    expectedPaths.forEach((path) => {
      expect(urls).toContain(new URL(path, siteConfig.url).toString());
    });
    entries.forEach((entry) => {
      expect(entry.priority).toBeGreaterThan(0);
      expect(entry.changeFrequency).toBeDefined();
      expect(entry.alternates?.languages?.[siteConfig.languageTag]).toBe(entry.url);
    });
  });
});
