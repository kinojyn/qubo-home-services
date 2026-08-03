import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { IMAGE_UPLOAD_CONTENT } from "@/locales/upload";

import { UploadField } from "./UploadField";

const createObjectUrl = vi.fn(() => "blob:preview");
const revokeObjectUrl = vi.fn();
const NativeUrl = URL;

function createImageFile(name = "porta-prima.webp", type = "image/webp") {
  return new File([new Uint8Array(2048)], name, { type });
}

describe("UploadField", () => {
  beforeEach(() => {
    class MockUrl extends NativeUrl {
      static createObjectURL = createObjectUrl;
      static revokeObjectURL = revokeObjectUrl;
    }

    vi.stubGlobal("URL", MockUrl);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("creates a local preview and removes the selected image", async () => {
    const onFileChange = vi.fn();
    const file = createImageFile();
    render(<UploadField onFileChange={onFileChange} />);

    fireEvent.change(screen.getByLabelText(IMAGE_UPLOAD_CONTENT.it.inputLabel), {
      target: { files: [file] },
    });

    expect(
      await screen.findByRole("group", { name: IMAGE_UPLOAD_CONTENT.it.previewLabel }),
    ).toBeVisible();
    expect(screen.getByRole("img", { name: `Anteprima di ${file.name}` })).toBeVisible();
    expect(onFileChange).toHaveBeenCalledWith(file);

    fireEvent.click(
      screen.getByRole("button", { name: `${IMAGE_UPLOAD_CONTENT.it.removeLabel}: ${file.name}` }),
    );

    expect(
      screen.queryByRole("group", { name: IMAGE_UPLOAD_CONTENT.it.previewLabel }),
    ).not.toBeInTheDocument();
    expect(onFileChange).toHaveBeenLastCalledWith(null);
    await waitFor(() => expect(revokeObjectUrl).toHaveBeenCalledWith("blob:preview"));
    expect(screen.getByLabelText(IMAGE_UPLOAD_CONTENT.it.inputLabel)).toHaveFocus();
  });

  it("accepts a valid image through drag and drop", async () => {
    const file = createImageFile("rubinetto.png", "image/png");
    const { container } = render(<UploadField />);
    const dropZone = container.querySelector("label");

    expect(dropZone).not.toBeNull();
    fireEvent.dragEnter(dropZone as HTMLLabelElement, { dataTransfer: { files: [file] } });
    expect(screen.getByText(IMAGE_UPLOAD_CONTENT.it.dropActiveTitle)).toBeInTheDocument();
    fireEvent.drop(dropZone as HTMLLabelElement, { dataTransfer: { files: [file] } });

    expect(await screen.findByRole("img", { name: `Anteprima di ${file.name}` })).toBeVisible();
  });

  it("shows a helpful error for invalid dropped files", () => {
    const invalidFile = createImageFile("document.pdf", "application/pdf");
    const { container } = render(<UploadField />);
    const dropZone = container.querySelector("label");

    fireEvent.drop(dropZone as HTMLLabelElement, {
      dataTransfer: { files: [invalidFile] },
    });

    expect(screen.getByRole("alert")).toHaveTextContent(IMAGE_UPLOAD_CONTENT.it.fileTypeError);
    expect(screen.getByLabelText(IMAGE_UPLOAD_CONTENT.it.inputLabel)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("disables selection and removal while processing", async () => {
    const file = createImageFile();
    const { rerender } = render(<UploadField />);
    fireEvent.change(screen.getByLabelText(IMAGE_UPLOAD_CONTENT.it.inputLabel), {
      target: { files: [file] },
    });
    await screen.findByRole("group", { name: IMAGE_UPLOAD_CONTENT.it.previewLabel });

    rerender(<UploadField isLoading />);

    expect(screen.getByLabelText(IMAGE_UPLOAD_CONTENT.it.inputLabel)).toBeDisabled();
    expect(
      screen.getByRole("button", { name: `${IMAGE_UPLOAD_CONTENT.it.removeLabel}: ${file.name}` }),
    ).toBeDisabled();
    expect(screen.getByText(IMAGE_UPLOAD_CONTENT.it.loadingLabel)).toBeInTheDocument();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<UploadField />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
