import { describe, expect, it } from "vitest";

import { findFvgLocality, FVG_LOCALITY_CATALOGUE, searchFvgLocalities } from "./fvgLocalities";

describe("FVG locality catalogue", () => {
  it("contains every current municipality and the populated-place catalogue", () => {
    expect(FVG_LOCALITY_CATALOGUE.municipalityCount).toBe(215);
    expect(FVG_LOCALITY_CATALOGUE.localityCount).toBeGreaterThanOrEqual(1_900);
  });

  it.each(["Ruda", "Villesse", "Perteole"])("contains %s", (name) => {
    expect(findFvgLocality(name)?.name).toBe(name);
  });

  it("associates Perteole with the municipality of Ruda", () => {
    expect(findFvgLocality("Perteole")).toMatchObject({
      kind: "locality",
      municipality: "Ruda",
    });
  });

  it("searches names without requiring accents", () => {
    expect(searchFvgLocalities("citta", 20).some((item) => item.name.includes("Città"))).toBe(true);
  });

  it("uses the €1.20/km tariff rounded to €5 with a €10 minimum", () => {
    for (const locality of FVG_LOCALITY_CATALOGUE.localities) {
      const expectedFee = Math.floor((locality.distance * 1.2) / 5 + 0.5) * 5;
      expect(locality.fee).toBe(Math.max(10, expectedFee));
    }
  });
});
