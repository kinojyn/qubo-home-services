import { screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FINAL_CTA_CONTENT } from "@/locales/finalCta";
import { renderWithLocale } from "@/tests/test-utils";

import { FinalCta } from "./FinalCta";

const CONTENT = FINAL_CTA_CONTENT.it;

describe("FinalCta", () => {
  it("renders a clear heading and both CTA destinations", () => {
    renderWithLocale(<FinalCta />);

    expect(screen.getByRole("heading", { level: 2, name: CONTENT.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: CONTENT.primaryLabel })).toHaveAttribute(
      "href",
      CONTENT.primaryHref,
    );
    expect(screen.getByRole("link", { name: CONTENT.secondaryLabel })).toHaveAttribute(
      "href",
      CONTENT.secondaryHref,
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<FinalCta />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
