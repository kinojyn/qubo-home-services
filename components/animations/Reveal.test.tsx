import { render, screen } from "@testing-library/react";
import { useReducedMotion } from "framer-motion";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Reveal } from "./Reveal";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return { ...actual, useReducedMotion: vi.fn(() => false) };
});

describe("Reveal", () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  it("keeps its content available while applying progressive motion", () => {
    render(
      <Reveal>
        <p>Contenuto visibile</p>
      </Reveal>,
    );

    expect(screen.getByText("Contenuto visibile")).toBeInTheDocument();
  });

  it("removes entrance transforms when reduced motion is requested", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    const { container } = render(
      <Reveal>
        <p>Contenuto senza movimento</p>
      </Reveal>,
    );

    const reveal = container.firstElementChild as HTMLElement;
    expect(reveal).not.toHaveStyle({ opacity: "0" });
    expect(reveal.style.transform).toBe("");
  });
});
