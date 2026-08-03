import { screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import NotFound, { metadata } from "./not-found";
import { renderWithLocale } from "@/tests/test-utils";

describe("NotFound", () => {
  it("offers a clear route back to the homepage", () => {
    renderWithLocale(<NotFound />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Questa pagina non è disponibile.",
    );
    expect(screen.getByRole("link", { name: "Torna alla home" })).toHaveAttribute("href", "/");
  });

  it("prevents missing routes from being indexed", () => {
    expect(metadata.title).toBe("Pagina non trovata");
    expect(metadata.robots).toMatchObject({ follow: false, index: false });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<NotFound />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
