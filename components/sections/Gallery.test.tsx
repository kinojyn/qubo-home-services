import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { GALLERY_CONTENT } from "@/locales/gallery";
import { GALLERY_PROJECTS } from "@/data/gallery";
import { renderWithLocale } from "@/tests/test-utils";

import { Gallery } from "./Gallery";

const CONTENT = GALLERY_CONTENT.it;

describe("Gallery", () => {
  it("renders lazy-loaded comparison images with descriptive alternative text", () => {
    renderWithLocale(<Gallery />);

    expect(screen.getByText(CONTENT.notice)).toBeInTheDocument();
    const gallery = screen.getByRole("list", { name: CONTENT.listLabel });
    const images = within(gallery).getAllByRole("img");

    expect(images).toHaveLength(GALLERY_PROJECTS.length * 2);
    images.forEach((image) => expect(image).toHaveAttribute("loading", "lazy"));
    GALLERY_PROJECTS.forEach((project) => {
      expect(within(gallery).getByAltText(project.before.alt)).toBeInTheDocument();
      expect(within(gallery).getByAltText(project.after.alt)).toBeInTheDocument();
    });
  });

  it("opens, navigates, and closes the lightbox accessibly", async () => {
    renderWithLocale(<Gallery />);

    fireEvent.click(
      screen.getByRole("button", { name: `Apri il confronto: ${GALLERY_PROJECTS[0].title}` }),
    );
    expect(
      await screen.findByRole("dialog", { name: GALLERY_PROJECTS[0].title }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: CONTENT.nextLabel }));
    expect(screen.getByRole("dialog", { name: GALLERY_PROJECTS[1].title })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = renderWithLocale(<Gallery />);
    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });
});
