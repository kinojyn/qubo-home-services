import { fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Drawer } from "./Drawer";
import { Modal } from "./Modal";

describe("overlay primitives", () => {
  it("closes a modal with Escape", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Request details">
        Modal content
      </Modal>,
    );

    expect(screen.getByRole("dialog", { name: "Request details" })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("provides an accessible drawer close action", () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen onClose={onClose} title="Filters">
        Drawer content
      </Drawer>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close panel" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("keeps keyboard focus inside a modal and makes background content inert", () => {
    const onClose = vi.fn();
    const { container } = render(
      <>
        <button type="button">Outside action</button>
        <Modal isOpen onClose={onClose} title="Request details">
          <button type="button">Confirm request</button>
        </Modal>
      </>,
    );

    const closeButton = screen.getByRole("button", { name: "Close dialog" });
    const confirmButton = screen.getByRole("button", { name: "Confirm request" });
    const outsideButton = screen.getByRole("button", { name: "Outside action", hidden: true });

    expect(container).toHaveProperty("inert", true);
    expect(closeButton).toHaveFocus();

    outsideButton.focus();
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(confirmButton).toHaveFocus();
  });

  it("has no automatically detectable accessibility violations while open", async () => {
    render(
      <Modal
        description="Review the request before confirming."
        isOpen
        onClose={() => undefined}
        title="Request details"
      >
        <button type="button">Confirm request</button>
      </Modal>,
    );

    const results = await axe.run(document.body, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
