import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SERVICE_DETAILS } from "@/data/services";
import { SERVICES_PAGE_CONTENT, SERVICES_PAGE_METADATA } from "@/locales/servicesPage";
import { renderWithLocale } from "@/tests/test-utils";

import ServicesPage, { metadata } from "./page";

const CONTENT = SERVICES_PAGE_CONTENT.it;

describe("ServicesPage", () => {
  it("composes the overview page with links to every service", () => {
    renderWithLocale(<ServicesPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(CONTENT.title);
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThanOrEqual(
      SERVICE_DETAILS.length,
    );
    const serviceLinks = screen.getAllByRole("link", { name: "Scopri il servizio" });
    expect(serviceLinks).toHaveLength(SERVICE_DETAILS.length);
    SERVICE_DETAILS.forEach((service, index) => {
      expect(serviceLinks[index]).toHaveAttribute("href", `/services/${service.slug}`);
    });
  });

  it("defines unique SEO metadata and a canonical route", () => {
    expect(metadata.title).toBe(SERVICES_PAGE_METADATA.it.title);
    expect(metadata.description).toBe(SERVICES_PAGE_METADATA.it.description);
    expect(metadata.alternates).toMatchObject({ canonical: SERVICES_PAGE_METADATA.it.path });
  });
});
