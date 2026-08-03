import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

describe("form controls", () => {
  it("associates input errors with their controls", () => {
    render(<Input error="Please enter a name." label="Name" />);

    const input = screen.getByRole("textbox", { name: "Name" });

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Please enter a name.");
  });

  it("renders an accessible textarea hint", () => {
    render(<Textarea hint="Add any useful details." label="Details" />);

    expect(screen.getByRole("textbox", { name: "Details" })).toHaveAccessibleDescription(
      "Add any useful details.",
    );
  });

  it("renders selectable options", () => {
    render(
      <Select
        label="Service"
        options={[
          { label: "Electrical", value: "electrical" },
          { label: "Painting", value: "painting" },
        ]}
      />,
    );

    const select = screen.getByRole("combobox", { name: "Service" });
    fireEvent.change(select, { target: { value: "painting" } });

    expect(select).toHaveValue("painting");
  });

  it("toggles a checkbox through its label", () => {
    render(<Checkbox label="I agree" />);

    const checkbox = screen.getByRole("checkbox", { name: "I agree" });
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
