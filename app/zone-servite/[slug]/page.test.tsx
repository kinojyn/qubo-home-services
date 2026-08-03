import { screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SERVICE_AREAS } from "@/data/serviceAreas";
import { SERVICE_DETAILS } from "@/data/services";
import { renderWithLocale } from "@/tests/test-utils";

import ServiceAreaPage, { generateMetadata, generateStaticParams } from "./page";

const AREA = SERVICE_AREAS[0];

async function renderServiceAreaPage() {
  const page = await ServiceAreaPage({ params: Promise.resolve({ slug: AREA.slug }) });
  return renderWithLocale(page);
}

describe("ServiceAreaPage", () => {
  it("prebuilds every configured city route", () => {
    expect(generateStaticParams()).toEqual(SERVICE_AREAS.map((area) => ({ slug: area.slug })));
  });

  it("renders unique local content, services, nearby areas, and internal links", async () => {
    const { container } = await renderServiceAreaPage();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(AREA.headline);
    expect(screen.getByText(AREA.localContext)).toBeInTheDocument();
    AREA.nearbyAreas.forEach((nearbyArea) => {
      expect(screen.getByText(nearbyArea)).toBeInTheDocument();
    });
    SERVICE_DETAILS.forEach((service) => {
      expect(screen.getByRole("link", { name: `Scopri ${service.title}` })).toHaveAttribute(
        "href",
        `/services/${service.slug}`,
      );
    });
    expect(container.querySelector('script[type="application/ld+json"]')).toBeInTheDocument();
  });

  it("creates unique metadata and a canonical city URL", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: AREA.slug }) });

    expect(metadata.title).toBe(AREA.metadata.title);
    expect(metadata.description).toBe(AREA.metadata.description);
    expect(metadata.alternates).toMatchObject({ canonical: `/zone-servite/${AREA.slug}` });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = await renderServiceAreaPage();
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
