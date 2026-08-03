import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SERVICE_AREAS_PAGE_CONTENT, SERVICE_AREAS_PAGE_METADATA } from "@/locales/serviceAreas";
import { SERVICE_AREAS } from "@/data/serviceAreas";
import { FEATURED_FVG_LOCALITIES, findFvgLocality } from "@/data/fvgLocalities";
import { renderWithLocale } from "@/tests/test-utils";

import ServiceAreasPage, { metadata } from "./page";

const CONTENT = SERVICE_AREAS_PAGE_CONTENT.it;

describe("ServiceAreasPage", () => {
  it("links to every configured city page", () => {
    const { container } = renderWithLocale(<ServiceAreasPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(CONTENT.title);
    SERVICE_AREAS.forEach((area) => {
      expect(
        screen.getByRole("link", {
          name: `${CONTENT.cardLinkLabel} ${area.city}`,
        }),
      ).toHaveAttribute("href", `/zone-servite/${area.slug}`);
    });
    expect(container.querySelector('script[type="application/ld+json"]')).toBeInTheDocument();
  });

  it("links every featured municipality to the quote form", () => {
    renderWithLocale(<ServiceAreasPage />);

    FEATURED_FVG_LOCALITIES.forEach((location) => {
      expect(screen.getAllByText(location.name, { exact: true }).length).toBeGreaterThan(0);
      expect(
        screen.getByRole("link", {
          name: `${CONTENT.selectCityLabel}: ${location.name}`,
        }),
      ).toHaveAttribute(
        "href",
        `/richiedi-preventivo?locality=${encodeURIComponent(location.id)}#preventivo-form`,
      );
    });
  });

  it("finds a frazione and opens the quote form with that locality selected", () => {
    renderWithLocale(<ServiceAreasPage />);
    const perteole = findFvgLocality("Perteole");
    if (!perteole) throw new Error("Perteole is missing from the FVG catalogue");

    fireEvent.change(screen.getByRole("searchbox", { name: CONTENT.searchLabel }), {
      target: { value: "Perteole" },
    });

    expect(
      screen.getByRole("link", {
        name: `${CONTENT.selectCityLabel}: Perteole`,
      }),
    ).toHaveAttribute(
      "href",
      `/richiedi-preventivo?locality=${encodeURIComponent(perteole.id)}#preventivo-form`,
    );
    expect(screen.getByText(/Ruda/)).toBeInTheDocument();
  });

  it("defines unique metadata and the canonical overview route", () => {
    expect(metadata.title).toBe(SERVICE_AREAS_PAGE_METADATA.it.title);
    expect(metadata.description).toBe(SERVICE_AREAS_PAGE_METADATA.it.description);
    expect(metadata.alternates).toMatchObject({ canonical: SERVICE_AREAS_PAGE_METADATA.it.path });
  });
});
