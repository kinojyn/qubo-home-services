import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import { ABOUT_PAGE_METADATA } from "@/locales/about";
import { CONTACT_PAGE_METADATA } from "@/locales/contact";
import { FAQ_PAGE_METADATA } from "@/locales/faq";
import { GALLERY_PAGE_METADATA } from "@/locales/gallery";
import { SERVICES_PAGE_METADATA } from "@/locales/servicesPage";
import { SERVICE_AREAS_PAGE_METADATA } from "@/locales/serviceAreas";
import { SERVICE_AREAS } from "@/data/serviceAreas";
import { SERVICE_DETAILS } from "@/data/services";

import {
  createPageMetadata,
  createPageStructuredData,
  createRobotsMetadata,
  createRootMetadata,
  createSiteStructuredData,
  getAbsoluteUrl,
  serializeJsonLd,
} from "./seo";

const PAGE = {
  title: "Pagina di prova",
  description: "Una descrizione completa per verificare i metadati della pagina.",
  path: "/prova",
} as const;

describe("SEO utilities", () => {
  it("keeps every public title and description unique and search-friendly", () => {
    const pages = [
      { title: siteConfig.homeTitle, description: siteConfig.description },
      ABOUT_PAGE_METADATA.it,
      CONTACT_PAGE_METADATA.it,
      FAQ_PAGE_METADATA.it,
      GALLERY_PAGE_METADATA.it,
      SERVICES_PAGE_METADATA.it,
      SERVICE_AREAS_PAGE_METADATA.it,
      ...SERVICE_DETAILS.map((service) => service.metadata),
      ...SERVICE_AREAS.map((area) => area.metadata),
    ];
    const titles = pages.map((page) => page.title);
    const descriptions = pages.map((page) => page.description);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    pages.forEach((page) => {
      const renderedTitle = `${page.title} | ${siteConfig.name}`;
      expect(renderedTitle.length).toBeGreaterThanOrEqual(35);
      expect(renderedTitle.length).toBeLessThanOrEqual(65);
      expect(page.description.length).toBeGreaterThanOrEqual(120);
      expect(page.description.length).toBeLessThanOrEqual(170);
    });
  });

  it("creates complete, shareable page metadata from one source", () => {
    const metadata = createPageMetadata(PAGE);

    expect(metadata.title).toBe(PAGE.title);
    expect(metadata.description).toBe(PAGE.description);
    expect(metadata.alternates).toMatchObject({
      canonical: PAGE.path,
      languages: { "it-IT": PAGE.path, "x-default": PAGE.path },
    });
    expect(metadata.openGraph).toMatchObject({
      description: PAGE.description,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: `${PAGE.title} | ${siteConfig.name}`,
      type: "website",
      url: PAGE.path,
    });
    expect(metadata.openGraph?.images).toHaveLength(1);
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      description: PAGE.description,
      title: `${PAGE.title} | ${siteConfig.name}`,
    });
    expect(metadata.twitter?.images).toHaveLength(1);
    expect(metadata.robots).toBeDefined();
  });

  it("defines global title handling and publisher metadata", () => {
    const metadata = createRootMetadata();

    expect(metadata.metadataBase?.toString()).toBe(new URL(siteConfig.url).toString());
    expect(metadata.applicationName).toBe(siteConfig.name);
    expect(metadata.publisher).toBe(siteConfig.name);
    expect(metadata.title).toMatchObject({
      default: `${siteConfig.homeTitle} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    });
  });

  it("uses indexable directives only for the public production origin", () => {
    expect(createRobotsMetadata(false)).toMatchObject({ follow: false, index: false });
    expect(createRobotsMetadata(true)).toMatchObject({
      follow: true,
      index: true,
      googleBot: {
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    });
  });

  it("links WebSite, LocalBusiness, WebPage, and Breadcrumb entities", () => {
    const siteData = createSiteStructuredData();
    const pageData = createPageStructuredData({
      ...PAGE,
      type: "AboutPage",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Prova", path: PAGE.path },
      ],
    });

    expect(siteData["@graph"].map((entity) => entity["@type"])).toEqual([
      "WebSite",
      "LocalBusiness",
    ]);
    expect(siteData["@graph"][1]).toMatchObject({
      "@type": "LocalBusiness",
      areaServed: [
        { "@type": "AdministrativeArea", name: siteConfig.region },
        ...SERVICE_AREAS.map((area) => ({ "@type": "City", name: area.city })),
      ],
    });
    expect(pageData["@graph"][0]).toMatchObject({
      "@type": "AboutPage",
      url: getAbsoluteUrl(PAGE.path),
    });
    expect(pageData["@graph"][1]).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", position: 1 },
        { name: "Prova", position: 2 },
      ],
    });
  });

  it("escapes unsafe opening tags in JSON-LD", () => {
    expect(serializeJsonLd({ value: "</script><script>" })).not.toContain("<");
    expect(serializeJsonLd({ value: "</script><script>" })).toContain("\\u003c");
  });
});
