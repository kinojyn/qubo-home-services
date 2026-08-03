import { screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SERVICE_DETAILS } from "@/data/services";
import { renderWithLocale } from "@/tests/test-utils";

import ServicePage, { generateMetadata, generateStaticParams } from "./page";

const SERVICE = SERVICE_DETAILS[0];

async function renderServicePage() {
  const page = await ServicePage({ params: Promise.resolve({ slug: SERVICE.slug }) });
  return renderWithLocale(page);
}

describe("ServicePage", () => {
  it("prebuilds every service route", () => {
    expect(generateStaticParams()).toEqual(
      SERVICE_DETAILS.map((service) => ({ slug: service.slug })),
    );
  });

  it("renders the complete service template with one H1", async () => {
    const { container } = await renderServicePage();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(SERVICE.headline);
    expect(
      screen.getByRole("heading", { name: "Un piccolo lavoro, gestito con attenzione." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Situazioni comuni che gestiamo." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Prima di richiedere il servizio." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Altri piccoli lavori per la casa." }),
    ).toBeInTheDocument();
    expect(container.querySelector('script[type="application/ld+json"]')).toBeInTheDocument();
  });

  it("creates unique metadata and canonical URL", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: SERVICE.slug }) });

    expect(metadata.title).toBe(SERVICE.metadata.title);
    expect(metadata.description).toBe(SERVICE.metadata.description);
    expect(metadata.alternates).toMatchObject({ canonical: `/services/${SERVICE.slug}` });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = await renderServicePage();
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
