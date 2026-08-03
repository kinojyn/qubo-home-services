import { siteConfig } from "@/config/site";
import { SERVICE_AREAS } from "@/data/serviceAreas";
import { getAbsoluteUrl, SEO_ENTITY_IDS } from "@/lib/seo/urls";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type StructuredPageType = "AboutPage" | "CollectionPage" | "ContactPage" | "WebPage";

type PageStructuredDataInput = {
  breadcrumbs?: readonly BreadcrumbItem[];
  description: string;
  path: string;
  title: string;
  type?: StructuredPageType;
};

export function createSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SEO_ENTITY_IDS.website,
        description: siteConfig.description,
        inLanguage: siteConfig.languageTag,
        name: siteConfig.name,
        publisher: { "@id": SEO_ENTITY_IDS.business },
        url: siteConfig.url,
      },
      {
        "@type": "LocalBusiness",
        "@id": SEO_ENTITY_IDS.business,
        areaServed: [
          { "@type": "AdministrativeArea", name: siteConfig.region },
          ...SERVICE_AREAS.map((area) => ({
            "@type": "City",
            containedInPlace: { "@type": "AdministrativeArea", name: siteConfig.region },
            name: area.city,
          })),
        ],
        description: siteConfig.description,
        image: getAbsoluteUrl(siteConfig.socialImage),
        knowsLanguage: siteConfig.languageTag,
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
  };
}

export function createPageStructuredData({
  breadcrumbs,
  description,
  path,
  title,
  type = "WebPage",
}: PageStructuredDataInput) {
  const pageUrl = getAbsoluteUrl(path);
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": type,
      "@id": `${pageUrl}#webpage`,
      about: { "@id": SEO_ENTITY_IDS.business },
      description,
      inLanguage: siteConfig.languageTag,
      isPartOf: { "@id": SEO_ENTITY_IDS.website },
      name: title,
      url: pageUrl,
    },
  ];

  if (breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        item: getAbsoluteUrl(item.path),
        name: item.name,
        position: index + 1,
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
