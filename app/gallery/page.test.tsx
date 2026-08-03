import { screen, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { GALLERY_CONTENT, GALLERY_PAGE_CONTENT, GALLERY_PAGE_METADATA } from "@/locales/gallery";
import { GALLERY_PROJECTS } from "@/data/gallery";
import { renderWithLocale } from "@/tests/test-utils";

import GalleryPage, { metadata } from "./page";

const PAGE_CONTENT = GALLERY_PAGE_CONTENT.it;
const CONTENT = GALLERY_CONTENT.it;

describe("GalleryPage", () => {
  it("renders one page heading and every before-and-after project", () => {
    renderWithLocale(<GalleryPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(PAGE_CONTENT.title);

    const gallery = screen.getByRole("list", { name: CONTENT.listLabel });
    expect(within(gallery).getAllByRole("button")).toHaveLength(GALLERY_PROJECTS.length);
    expect(within(gallery).getAllByRole("img")).toHaveLength(GALLERY_PROJECTS.length * 2);
  });

  it("offers direct paths to the gallery and estimate request", () => {
    renderWithLocale(<GalleryPage />);

    expect(screen.getByRole("link", { name: PAGE_CONTENT.primaryCtaLabel })).toHaveAttribute(
      "href",
      PAGE_CONTENT.primaryCtaHref,
    );
    expect(
      screen.getAllByRole("link", { name: PAGE_CONTENT.secondaryCtaLabel })[0],
    ).toHaveAttribute("href", PAGE_CONTENT.secondaryCtaHref);
  });

  it("defines unique SEO metadata and a canonical route", () => {
    expect(metadata.title).toBe(GALLERY_PAGE_METADATA.it.title);
    expect(metadata.description).toBe(GALLERY_PAGE_METADATA.it.description);
    expect(metadata.alternates).toMatchObject({ canonical: GALLERY_PAGE_METADATA.it.path });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<GalleryPage />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
