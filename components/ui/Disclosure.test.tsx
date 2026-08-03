import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Accordion } from "./Accordion";
import { Tabs } from "./Tabs";
import { Tooltip } from "./Tooltip";

describe("disclosure primitives", () => {
  it("keeps one accordion item open at a time", () => {
    render(
      <Accordion
        items={[
          { content: "First answer", id: "first", title: "First question" },
          { content: "Second answer", id: "second", title: "Second question" },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "First question" }));
    expect(screen.getByText("First answer")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Second question" }));
    expect(screen.getByText("Second answer")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "First question" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: "Second question" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("supports keyboard tab navigation", () => {
    render(
      <Tabs
        items={[
          { content: "Overview content", id: "overview", label: "Overview" },
          { content: "Details content", id: "details", label: "Details" },
        ]}
        label="Example content"
      />,
    );

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    fireEvent.keyDown(overviewTab, { key: "ArrowRight" });

    expect(screen.getByRole("tab", { name: "Details" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Details content");
  });

  it("shows a tooltip on keyboard focus", () => {
    render(
      <Tooltip content="Helpful context">
        <button type="button">Help</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Help" });
    fireEvent.focus(trigger);

    expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful context");
    expect(trigger).toHaveAccessibleDescription("Helpful context");
  });

  it("preserves an existing accessible description and dismisses only the tooltip with Escape", async () => {
    render(
      <>
        <span id="existing-description">Existing context</span>
        <Tooltip content="Helpful context">
          <button aria-describedby="existing-description" type="button">
            Help
          </button>
        </Tooltip>
      </>,
    );

    const trigger = screen.getByRole("button", { name: "Help" });
    fireEvent.focus(trigger);

    expect(trigger).toHaveAccessibleDescription("Existing context Helpful context");
    fireEvent.keyDown(trigger, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
    expect(trigger).toHaveAccessibleDescription("Existing context");
  });
});
