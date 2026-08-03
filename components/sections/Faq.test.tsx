import { fireEvent, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { FAQ_CONTENT, FAQ_ITEMS } from "@/locales/faq";
import { renderWithLocale } from "@/tests/test-utils";

import { Faq } from "./Faq";

const CONTENT = FAQ_CONTENT.it;
const ITEMS = FAQ_ITEMS.it;

describe("Faq", () => {
  it("renders semantic questions and one answer at a time", () => {
    renderWithLocale(<Faq />);

    expect(screen.getByRole("heading", { level: 2, name: CONTENT.title })).toBeInTheDocument();
    const firstTrigger = screen.getByRole("button", { name: ITEMS[0].question });
    const secondTrigger = screen.getByRole("button", { name: ITEMS[1].question });

    fireEvent.click(firstTrigger);
    expect(screen.getByText(ITEMS[0].answer)).toBeInTheDocument();

    fireEvent.click(secondTrigger);
    expect(secondTrigger).toHaveAttribute("aria-expanded", "true");
    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
  });

  it("includes matching FAQ structured data", () => {
    const { container } = renderWithLocale(<Faq />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const structuredData = JSON.parse(script?.textContent ?? "{}");

    expect(structuredData["@type"]).toBe("FAQPage");
    expect(structuredData.mainEntity).toHaveLength(ITEMS.length);
    expect(structuredData.mainEntity[0].name).toBe(ITEMS[0].question);
    expect(structuredData.mainEntity[0].acceptedAnswer.text).toBe(ITEMS[0].answer);
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<Faq />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
