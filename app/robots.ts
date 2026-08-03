import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAbsoluteUrl } from "@/lib/seo";

export function createRobotsFile(isIndexable = siteConfig.isIndexable): MetadataRoute.Robots {
  if (!isIndexable) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}

export default function robots(): MetadataRoute.Robots {
  return createRobotsFile();
}
