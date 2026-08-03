import { screen, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { HERO_CONTENT, HERO_TRUST_INDICATORS } from "@/locales/hero";
import { renderWithProviders } from "@/tests/test-utils";

import { Hero } from "./Hero";

const CONTENT = HERO_CONTENT.it;
const TRUST = HERO_TRUST_INDICATORS.it;

describe("Hero", () => {
  it("renders the approved message, actions, and trust indicators", () => {
    const { container } = renderWithProviders(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    const hero = container.querySelector("[aria-labelledby='hero-title']");
    const trustList = screen.getByRole("list", {
      name: CONTENT.trustLabel,
    });

    expect(heading).toHaveTextContent(CONTENT.headlineFirstLine + CONTENT.headlineSecondLine);
    expect(hero).toHaveAttribute("aria-describedby", "hero-description");
    expect(screen.getByText(CONTENT.description)).toHaveAttribute("id", "hero-description");
    expect(screen.getByRole("link", { name: CONTENT.primaryCtaLabel })).toHaveAttribute(
      "href",
      CONTENT.primaryCtaHref,
    );
    expect(screen.getByRole("link", { name: CONTENT.emergencyCtaLabel })).toHaveAttribute(
      "href",
      "https://wa.me/393201391900",
    );
    expect(within(trustList).getByText(TRUST[0].label)).toBeInTheDocument();
    expect(within(trustList).getByText(TRUST[1].label)).toBeInTheDocument();
    expect(within(trustList).getByText(TRUST[2].label)).toBeInTheDocument();

    expect(screen.getByRole("figure", { name: "Casa isometrica interattiva" })).toBeInTheDocument();
    expect(container.querySelector("[data-house-placeholder]")).not.toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithProviders(<Hero />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
