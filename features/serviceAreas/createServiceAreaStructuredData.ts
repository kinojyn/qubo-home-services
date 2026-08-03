import { siteConfig } from "@/config/site";
import { SERVICE_DETAILS } from "@/data/services";
import { getAbsoluteUrl, SEO_ENTITY_IDS } from "@/lib/seo";

import type { ServiceArea } from "./types";

export function createServiceAreaStructuredData(area: ServiceArea) {
  const path = `/zone-servite/${area.slug}`;
  const pageUrl = getAbsoluteUrl(path);
  const city = {
    "@type": "City",
    name: area.city,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: siteConfig.region,
    },
  } as const;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        about: { "@id": SEO_ENTITY_IDS.business },
        description: area.metadata.description,
        inLanguage: siteConfig.languageTag,
        isPartOf: { "@id": SEO_ENTITY_IDS.website },
        name: area.metadata.title,
        spatialCoverage: city,
        url: pageUrl,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#home-services`,
        areaServed: city,
        description: area.introduction,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Servizi per la casa a ${area.city}`,
          itemListElement: SERVICE_DETAILS.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              url: getAbsoluteUrl(`/services/${service.slug}`),
            },
          })),
        },
        name: `Servizi per la casa a ${area.city}`,
        provider: { "@id": SEO_ENTITY_IDS.business },
        serviceType: "Piccole riparazioni e installazioni domestiche",
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            item: getAbsoluteUrl("/"),
            name: "Home",
            position: 1,
          },
          {
            "@type": "ListItem",
            item: getAbsoluteUrl("/zone-servite"),
            name: "Zone servite",
            position: 2,
          },
          {
            "@type": "ListItem",
            item: pageUrl,
            name: area.city,
            position: 3,
          },
        ],
      },
    ],
  };
}
