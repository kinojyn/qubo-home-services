import { screen, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { STATISTICS_CONTENT, STATISTICS } from "@/locales/statistics";
import { renderWithLocale } from "@/tests/test-utils";

import { Statistics } from "./Statistics";

const CONTENT = STATISTICS_CONTENT.it;
const STATS = STATISTICS.it;

describe("Statistics", () => {
  it("renders only the approved, source-backed service statistics", () => {
    renderWithLocale(<Statistics />);

    expect(screen.getByRole("heading", { level: 2, name: CONTENT.title })).toBeInTheDocument();

    const statisticList = screen.getByRole("list", { name: CONTENT.listLabel });
    const statisticItems = within(statisticList).getAllByRole("listitem");

    expect(statisticItems).toHaveLength(STATS.length);
    STATS.forEach((statistic) => {
      expect(within(statisticList).getByText(statistic.accessibleValue)).toBeInTheDocument();
      expect(
        within(statisticList).getByRole("heading", { name: statistic.label }),
      ).toBeInTheDocument();
      expect(within(statisticList).getByText(statistic.description)).toBeInTheDocument();
    });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<Statistics />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
