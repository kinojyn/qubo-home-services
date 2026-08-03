import { screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { CONTACT_CONTENT, CONTACT_PAGE_CONTENT, CONTACT_PAGE_METADATA } from "@/locales/contact";
import { renderWithLocale } from "@/tests/test-utils";

import ContactPage, { metadata } from "./page";

const PAGE_CONTENT = CONTACT_PAGE_CONTENT.it;
const CONTENT = CONTACT_CONTENT.it;

describe("ContactPage", () => {
  it("renders one page heading and the existing contact form", async () => {
    renderWithLocale(<ContactPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(PAGE_CONTENT.title);
    expect(screen.getByRole("heading", { level: 2, name: CONTENT.title })).toBeInTheDocument();
    expect(await screen.findByRole("form", { name: CONTENT.formLabel })).toBeInTheDocument();
  });

  it("provides clear paths to the contact form and estimate request", () => {
    renderWithLocale(<ContactPage />);

    expect(screen.getAllByRole("link", { name: PAGE_CONTENT.primaryCtaLabel })[0]).toHaveAttribute(
      "href",
      PAGE_CONTENT.primaryCtaHref,
    );
    expect(
      screen.getAllByRole("link", { name: PAGE_CONTENT.secondaryCtaLabel })[0],
    ).toHaveAttribute("href", PAGE_CONTENT.secondaryCtaHref);
  });

  it("defines unique SEO metadata and a canonical route", () => {
    expect(metadata.title).toBe(CONTACT_PAGE_METADATA.it.title);
    expect(metadata.description).toBe(CONTACT_PAGE_METADATA.it.description);
    expect(metadata.alternates).toMatchObject({ canonical: CONTACT_PAGE_METADATA.it.path });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<ContactPage />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
