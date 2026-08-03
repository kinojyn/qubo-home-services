import { siteConfig } from "@/config/site";
import { getAbsoluteUrl, SEO_ENTITY_IDS } from "@/lib/seo";

import type { ServiceDetail } from "./types";

export function createServiceStructuredData(service: ServiceDetail) {
  const serviceUrl = getAbsoluteUrl(`/services/${service.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        areaServed: { "@type": "AdministrativeArea", name: "Friuli Venezia Giulia" },
        description: service.introduction,
        name: service.title,
        provider: { "@id": SEO_ENTITY_IDS.business },
        serviceType: service.title,
        url: serviceUrl,
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          acceptedAnswer: { "@type": "Answer", text: item.answer },
          name: item.question,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", item: siteConfig.url, name: "Home", position: 1 },
          {
            "@type": "ListItem",
            item: getAbsoluteUrl("/services"),
            name: "Servizi",
            position: 2,
          },
          { "@type": "ListItem", item: serviceUrl, name: service.title, position: 3 },
        ],
      },
    ],
  };
}
