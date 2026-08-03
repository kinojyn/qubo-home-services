import { screen, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { SERVICES } from "@/constants/services";
import { SERVICE_DETAILS_LOCALE } from "@/locales/serviceData";
import { SERVICES_CONTENT } from "@/locales/services";
import { renderWithLocale } from "@/tests/test-utils";

import { Services } from "./Services";

const CONTENT = SERVICES_CONTENT.it;

describe("Services", () => {
  it("renders every approved service category and the section CTA", () => {
    renderWithLocale(<Services />);

    expect(screen.getByRole("heading", { level: 2, name: CONTENT.title })).toBeInTheDocument();

    const serviceList = screen.getByRole("list", { name: CONTENT.listLabel });
    const serviceItems = within(serviceList).getAllByRole("listitem");

    expect(serviceItems).toHaveLength(SERVICES.length);
    SERVICES.forEach((service) => {
      expect(within(serviceList).getByRole("heading", { name: service.title })).toBeInTheDocument();
      expect(within(serviceList).getByText(service.description)).toBeInTheDocument();
      expect(
        within(serviceList).getByRole("link", {
          name: `${CONTENT.discoverServiceLabel} ${service.title}`,
        }),
      ).toHaveAttribute("href", `/services/${service.slug}`);
    });

    expect(screen.getByRole("link", { name: CONTENT.ctaLabel })).toHaveAttribute(
      "href",
      CONTENT.ctaHref,
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<Services />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });

  it("uses the selected locale for every card title and description", async () => {
    window.localStorage.setItem("qubo-locale", "en");
    renderWithLocale(<Services />);

    const firstService = SERVICES[0];
    const localizedService = SERVICE_DETAILS_LOCALE.en[firstService.slug];

    expect(
      await screen.findByRole("heading", { name: localizedService.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(localizedService.description)).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: `${SERVICES_CONTENT.en.discoverServiceLabel} ${localizedService.title}`,
      }),
    ).toHaveAttribute("href", `/services/${firstService.slug}`);
  });
});
