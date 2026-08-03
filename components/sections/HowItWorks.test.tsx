import { screen, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { PROCESS_CONTENT, PROCESS_STEPS } from "@/locales/process";
import { renderWithLocale } from "@/tests/test-utils";

import { HowItWorks } from "./HowItWorks";

const CONTENT = PROCESS_CONTENT.it;
const STEPS = PROCESS_STEPS.it;

describe("HowItWorks", () => {
  it("renders the complete four-step process in order", () => {
    renderWithLocale(<HowItWorks />);

    expect(screen.getByRole("heading", { level: 2, name: CONTENT.title })).toBeInTheDocument();

    const timeline = screen.getByRole("list", { name: CONTENT.listLabel });
    const steps = within(timeline).getAllByRole("listitem");

    expect(steps).toHaveLength(STEPS.length);
    STEPS.forEach((step, index) => {
      expect(within(steps[index]).getByText(step.number)).toBeInTheDocument();
      expect(within(steps[index]).getByRole("heading", { name: step.title })).toBeInTheDocument();
      expect(within(steps[index]).getByText(step.description)).toBeInTheDocument();
    });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<HowItWorks />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
