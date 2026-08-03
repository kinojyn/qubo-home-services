import { SERVICE_AREAS } from "@/data/serviceAreas";

import type { ServiceArea } from "./types";

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return SERVICE_AREAS.find((area) => area.slug === slug);
}

export function getRelatedServiceAreas(slug: string): readonly ServiceArea[] {
  return SERVICE_AREAS.filter((area) => area.slug !== slug);
}
