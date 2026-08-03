import { screen, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { renderWithLocale } from "@/tests/test-utils";

import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders navigation, contact, legal, and copyright content", () => {
    renderWithLocale(<Footer year={2026} />);

    const footer = screen.getByRole("contentinfo");
    const primaryNavigation = within(footer).getByRole("navigation", {
      name: "Navigazione",
    });
    const legalNavigation = within(footer).getByRole("navigation", { name: "Legal" });

    expect(within(primaryNavigation).getByRole("link", { name: "Servizi" })).toHaveAttribute(
      "href",
      "/services",
    );
    expect(within(footer).getByText("Friuli Venezia Giulia, Italia")).toBeInTheDocument();
    expect(within(footer).getByRole("link", { name: "Richiedi assistenza" })).toHaveAttribute(
      "href",
      "/#preventivo",
    );
    expect(within(legalNavigation).getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    expect(within(footer).getByText(/© 2026 QUBO/)).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<Footer year={2026} />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
