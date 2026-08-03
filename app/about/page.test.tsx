import { screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import {
  ABOUT_PAGE_CONTENT,
  ABOUT_PAGE_METADATA,
  ABOUT_STORY_CONTENT,
  ABOUT_VALUES,
} from "@/locales/about";
import { renderWithLocale } from "@/tests/test-utils";

import AboutPage, { metadata } from "./page";

const PAGE_CONTENT = ABOUT_PAGE_CONTENT.it;
const STORY_CONTENT = ABOUT_STORY_CONTENT.it;
const VALUES = ABOUT_VALUES.it;

describe("AboutPage", () => {
  it("presents the company story with a clear heading structure", () => {
    renderWithLocale(<AboutPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(PAGE_CONTENT.title);
    expect(
      screen.getByRole("heading", { level: 2, name: STORY_CONTENT.title }),
    ).toBeInTheDocument();

    VALUES.forEach((value) => {
      expect(screen.getByRole("heading", { level: 3, name: value.title })).toBeInTheDocument();
    });
  });

  it("offers direct routes to services and the estimate request", () => {
    renderWithLocale(<AboutPage />);

    expect(screen.getByRole("link", { name: PAGE_CONTENT.secondaryCtaLabel })).toHaveAttribute(
      "href",
      PAGE_CONTENT.secondaryCtaHref,
    );
    expect(screen.getAllByRole("link", { name: PAGE_CONTENT.primaryCtaLabel })[0]).toHaveAttribute(
      "href",
      PAGE_CONTENT.primaryCtaHref,
    );
  });

  it("defines unique SEO metadata and a canonical route", () => {
    expect(metadata.title).toBe(ABOUT_PAGE_METADATA.it.title);
    expect(metadata.description).toBe(ABOUT_PAGE_METADATA.it.description);
    expect(metadata.alternates).toMatchObject({ canonical: ABOUT_PAGE_METADATA.it.path });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<AboutPage />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
