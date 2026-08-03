import { screen, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { WHY_CHOOSE_US_CONTENT, WHY_CHOOSE_US_FEATURES } from "@/locales/whyChooseUs";
import { renderWithLocale } from "@/tests/test-utils";

import { WhyChooseUs } from "./WhyChooseUs";

const CONTENT = WHY_CHOOSE_US_CONTENT.it;
const FEATURES = WHY_CHOOSE_US_FEATURES.it;

describe("WhyChooseUs", () => {
  it("renders every approved customer benefit", () => {
    renderWithLocale(<WhyChooseUs />);

    expect(screen.getByRole("heading", { level: 2, name: CONTENT.title })).toBeInTheDocument();

    const featureList = screen.getByRole("list", { name: CONTENT.listLabel });
    const featureItems = within(featureList).getAllByRole("listitem");

    expect(featureItems).toHaveLength(FEATURES.length);
    FEATURES.forEach((feature) => {
      expect(within(featureList).getByRole("heading", { name: feature.title })).toBeInTheDocument();
      expect(within(featureList).getByText(feature.description)).toBeInTheDocument();
    });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<WhyChooseUs />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
