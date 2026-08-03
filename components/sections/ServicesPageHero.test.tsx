import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { LocaleProvider } from "@/contexts/LocaleContext";
import { RoomHoverProvider } from "@/contexts/RoomHoverContext";
import { SERVICES_PAGE_CONTENT } from "@/locales/servicesPage";

import { ServicesPageHero } from "./ServicesPageHero";

const CONTENT = SERVICES_PAGE_CONTENT.it;

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <LocaleProvider>
      <RoomHoverProvider>{ui}</RoomHoverProvider>
    </LocaleProvider>,
  );
}

describe("ServicesPageHero", () => {
  it("renders one page heading, navigation, actions, and trust points", () => {
    renderWithProviders(<ServicesPageHero />);

    expect(screen.getByRole("heading", { level: 1, name: CONTENT.title })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: CONTENT.breadcrumbLabel })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: CONTENT.primaryCtaLabel })).toHaveAttribute(
      "href",
      CONTENT.primaryCtaHref,
    );
    expect(screen.getByRole("link", { name: CONTENT.secondaryCtaLabel })).toHaveAttribute(
      "href",
      CONTENT.secondaryCtaHref,
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithProviders(<ServicesPageHero />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
