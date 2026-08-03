import { describe, expect, it } from "vitest";

import { SERVICE_AREAS } from "@/data/serviceAreas";

import { getRelatedServiceAreas, getServiceAreaBySlug } from "./getServiceArea";

describe("service-area helpers", () => {
  it("finds every configured service area by slug", () => {
    SERVICE_AREAS.forEach((area) => {
      expect(getServiceAreaBySlug(area.slug)).toEqual(area);
    });
    expect(getServiceAreaBySlug("area-non-configurata")).toBeUndefined();
  });

  it("returns the other configured cities as related areas", () => {
    const current = SERVICE_AREAS[0];
    const related = getRelatedServiceAreas(current.slug);

    expect(related).toHaveLength(SERVICE_AREAS.length - 1);
    expect(related).not.toContainEqual(current);
  });
});
