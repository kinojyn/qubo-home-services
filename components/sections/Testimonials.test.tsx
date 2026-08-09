import { screen, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { TESTIMONIALS_CONTENT } from "@/locales/testimonials";
import { renderWithLocale } from "@/tests/test-utils";

import { Testimonials } from "./Testimonials";

const CONTENT = TESTIMONIALS_CONTENT.it;

describe("Testimonials", () => {
  it("renders an honest empty state until verified reviews are published", () => {
    const { container } = renderWithLocale(<Testimonials />);

    expect(screen.getByRole("heading", { level: 2, name: CONTENT.title })).toBeInTheDocument();
    const carousel = screen.getByRole("region", { name: CONTENT.listLabel });
    expect(within(carousel).queryAllByRole("article")).toHaveLength(0);
    expect(within(carousel).getByText(CONTENT.noReviewsLabel)).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();

    expect(screen.getByRole("button", { name: CONTENT.previousLabel })).toBeDisabled();
    expect(screen.getByRole("button", { name: CONTENT.nextLabel })).toBeDisabled();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<Testimonials />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
