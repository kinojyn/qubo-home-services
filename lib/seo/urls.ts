import { siteConfig } from "@/config/site";

export const SEO_ENTITY_IDS = {
  business: new URL("/#local-business", siteConfig.url).toString(),
  website: new URL("/#website", siteConfig.url).toString(),
} as const;

export function getAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
