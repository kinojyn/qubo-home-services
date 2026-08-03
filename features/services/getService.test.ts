import { describe, expect, it } from "vitest";

import { SERVICE_DETAILS } from "@/data/services";

import { createServiceStructuredData } from "./createServiceStructuredData";
import { getRelatedServices, getServiceBySlug } from "./getService";

describe("service data helpers", () => {
  it("resolves every approved service by its unique slug", () => {
    const slugs = SERVICE_DETAILS.map((service) => service.slug);

    expect(new Set(slugs).size).toBe(SERVICE_DETAILS.length);
    SERVICE_DETAILS.forEach((service) => {
      expect(getServiceBySlug(service.slug)).toBe(service);
    });
    expect(getServiceBySlug("servizio-inesistente")).toBeUndefined();
  });

  it("returns three valid related services without the current service", () => {
    const service = SERVICE_DETAILS[0];
    const relatedServices = getRelatedServices(service);

    expect(relatedServices).toHaveLength(3);
    expect(relatedServices).not.toContain(service);
  });

  it("creates Service, FAQ, and Breadcrumb structured data", () => {
    const structuredData = createServiceStructuredData(SERVICE_DETAILS[0]);
    const types = structuredData["@graph"].map((entry) => entry["@type"]);

    expect(types).toEqual(["Service", "FAQPage", "BreadcrumbList"]);
  });

  it("keeps every SEO title and description within the approved length", () => {
    const titleSuffix = " | QUBO";

    SERVICE_DETAILS.forEach((service) => {
      const titleLength = `${service.metadata.title}${titleSuffix}`.length;

      expect(titleLength).toBeGreaterThanOrEqual(35);
      expect(titleLength).toBeLessThanOrEqual(65);
      expect(service.metadata.description.length).toBeGreaterThanOrEqual(120);
      expect(service.metadata.description.length).toBeLessThanOrEqual(170);
    });
  });
});
