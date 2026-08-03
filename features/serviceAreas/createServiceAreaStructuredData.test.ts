import { describe, expect, it } from "vitest";

import { SERVICE_AREAS } from "@/data/serviceAreas";
import { SERVICE_DETAILS } from "@/data/services";
import { SEO_ENTITY_IDS } from "@/lib/seo";

import { createServiceAreaStructuredData } from "./createServiceAreaStructuredData";

describe("createServiceAreaStructuredData", () => {
  it("connects the city page, local service catalog, provider, and breadcrumbs", () => {
    const area = SERVICE_AREAS[0];
    const data = createServiceAreaStructuredData(area);
    const [webPage, service, breadcrumbs] = data["@graph"];

    expect(webPage).toMatchObject({
      "@type": "WebPage",
      spatialCoverage: { "@type": "City", name: area.city },
    });
    expect(service).toMatchObject({
      "@type": "Service",
      areaServed: { "@type": "City", name: area.city },
      provider: { "@id": SEO_ENTITY_IDS.business },
    });
    const offerCatalog = "hasOfferCatalog" in service ? service.hasOfferCatalog : undefined;
    expect(offerCatalog?.itemListElement).toHaveLength(SERVICE_DETAILS.length);
    expect(breadcrumbs).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [{ position: 1 }, { position: 2 }, { position: 3 }],
    });
  });
});
