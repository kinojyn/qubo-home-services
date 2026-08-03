import { SERVICE_DETAILS } from "@/data/services";

import type { ServiceDetail } from "./types";

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}

export function getRelatedServices(service: ServiceDetail): ServiceDetail[] {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((relatedService): relatedService is ServiceDetail => Boolean(relatedService));
}
