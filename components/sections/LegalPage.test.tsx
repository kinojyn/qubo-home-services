import { screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { LegalPage } from "@/components/sections/LegalPage";
import { COOKIE_DOCUMENT, PRIVACY_DOCUMENT, TERMS_DOCUMENT } from "@/constants/legal";
import { LEGAL_CONTENT } from "@/locales/legal";
import { renderWithLocale } from "@/tests/test-utils";

const DOCUMENTS = [PRIVACY_DOCUMENT, COOKIE_DOCUMENT, TERMS_DOCUMENT] as const;

describe("LegalPage", () => {
  it.each(DOCUMENTS)("renders one h1 and every section for $path", (document) => {
    renderWithLocale(<LegalPage document={document} />);

    expect(screen.getByRole("heading", { level: 1, name: document.title })).toBeInTheDocument();
    document.sections.forEach((section) => {
      expect(screen.getByRole("heading", { level: 2, name: section.title })).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: LEGAL_CONTENT.it.backLabel })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<LegalPage document={PRIVACY_DOCUMENT} />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
