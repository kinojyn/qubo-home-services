import { screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FAQ_ITEMS, FAQ_PAGE_CONTENT, FAQ_PAGE_METADATA } from "@/locales/faq";
import { renderWithLocale } from "@/tests/test-utils";

import FaqPage, { metadata } from "./page";

const CONTENT = FAQ_PAGE_CONTENT.it;
const ITEMS = FAQ_ITEMS.it;

describe("FaqPage", () => {
  it("renders one page heading and every approved question", () => {
    renderWithLocale(<FaqPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(CONTENT.title);
    ITEMS.forEach((item) => {
      expect(screen.getByRole("button", { name: item.question })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });
  });

  it("offers direct paths to the answers and contact page", () => {
    renderWithLocale(<FaqPage />);

    expect(screen.getByRole("link", { name: CONTENT.primaryCtaLabel })).toHaveAttribute(
      "href",
      CONTENT.primaryCtaHref,
    );
    expect(screen.getByRole("link", { name: CONTENT.secondaryCtaLabel })).toHaveAttribute(
      "href",
      CONTENT.secondaryCtaHref,
    );
  });

  it("defines unique SEO metadata and a canonical route", () => {
    expect(metadata.title).toBe(FAQ_PAGE_METADATA.it.title);
    expect(metadata.description).toBe(FAQ_PAGE_METADATA.it.description);
    expect(metadata.alternates).toMatchObject({ canonical: FAQ_PAGE_METADATA.it.path });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<FaqPage />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
