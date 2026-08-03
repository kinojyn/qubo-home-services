import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import axe from "axe-core";
import { beforeEach, describe, expect, it } from "vitest";

import { LocaleProvider } from "@/contexts/LocaleContext";

import { Navbar } from "./Navbar";

function renderNavbar() {
  return render(
    <LocaleProvider>
      <Navbar />
      <main id="main-content" tabIndex={-1} />
    </LocaleProvider>,
  );
}

describe("Navbar", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  it("renders the approved navigation content", () => {
    renderNavbar();

    expect(screen.getByRole("banner")).toHaveAttribute("data-state", "transparent");
    expect(screen.getByRole("navigation", { name: "Navigazione principale" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Richiedi un preventivo" })).not.toHaveLength(0);
    expect(screen.getAllByRole("button", { name: "Lingua: Italiano" })).not.toHaveLength(0);
  });

  it("becomes solid after scrolling", async () => {
    renderNavbar();
    Object.defineProperty(window, "scrollY", { configurable: true, value: 1 });

    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByRole("banner")).toHaveAttribute("data-state", "solid");
    });
  });

  it("opens and closes the mobile menu accessibly", async () => {
    renderNavbar();
    const menuButton = screen.getByRole("button", { name: "Apri il menu" });

    menuButton.focus();
    fireEvent.click(menuButton);
    const drawer = screen.getByRole("dialog", { name: "Menu" });

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(menuButton).toHaveAttribute("aria-controls", drawer.id);
    expect(menuButton).toHaveAccessibleName("Chiudi il menu");
    expect(
      within(drawer).getByRole("navigation", { name: "Navigazione mobile" }),
    ).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => {
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
      expect(menuButton).toHaveFocus();
    });
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderNavbar();
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
