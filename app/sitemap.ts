import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { SERVICE_AREAS } from "@/data/serviceAreas";
import { SERVICE_DETAILS } from "@/data/services";
import { getAbsoluteUrl } from "@/lib/seo";

const STATIC_ROUTES: ReadonlyArray<{
  changeFrequency: "monthly" | "weekly" | "yearly";
  path: string;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/richiedi-preventivo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/zone-servite", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/termini", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: getAbsoluteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: { [siteConfig.languageTag]: getAbsoluteUrl(route.path) },
    },
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICE_DETAILS.map((service) => {
    const path = `/services/${service.slug}`;

    return {
      url: getAbsoluteUrl(path),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: { [siteConfig.languageTag]: getAbsoluteUrl(path) },
      },
    };
  });

  const serviceAreaEntries: MetadataRoute.Sitemap = SERVICE_AREAS.map((area) => {
    const path = `/zone-servite/${area.slug}`;

    return {
      url: getAbsoluteUrl(path),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: { [siteConfig.languageTag]: getAbsoluteUrl(path) },
      },
    };
  });

  return [...staticEntries, ...serviceEntries, ...serviceAreaEntries];
}
