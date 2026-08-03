import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithLocale } from "@/tests/test-utils";

import { InteractiveHouse } from "./InteractiveHouse";

describe("InteractiveHouse", () => {
  it("renders the optimized house image with service links", () => {
    renderWithLocale(<InteractiveHouse />);
    const house = screen.getByRole("figure", { name: "Casa isometrica interattiva" });
    const image = within(house).getByRole("presentation");

    expect(image.getAttribute("src")).toContain("house%20servizi.webp");
    expect(within(house).getAllByRole("link")).toHaveLength(5);
    expect(within(house).getByRole("link", { name: "Elettricità" })).toHaveAttribute(
      "href",
      "/services/riparazioni-elettriche",
    );
    expect(within(house).getByRole("link", { name: "Montaggio mobili" })).toHaveAttribute(
      "href",
      "/services/montaggio-mobili",
    );
  });
});
