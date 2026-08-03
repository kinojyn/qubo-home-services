import { describe, expect, it } from "vitest";

import { IMAGE_UPLOAD_CONFIG } from "@/constants/upload";
import { IMAGE_UPLOAD_CONTENT } from "@/locales/upload";

import { validateImageFile } from "./validateImageFile";

function createImageFile(name = "intervento.webp", type = "image/webp", size = 1024) {
  return new File([new Uint8Array(size)], name, { type });
}

describe("validateImageFile", () => {
  it("accepts one supported image", () => {
    const file = createImageFile();

    expect(validateImageFile([file])).toEqual({ file, success: true });
  });

  it("rejects unsupported and empty files", () => {
    expect(validateImageFile([createImageFile("plan.svg", "image/svg+xml")])).toEqual({
      message: IMAGE_UPLOAD_CONTENT.it.fileTypeError,
      success: false,
    });
    expect(validateImageFile([createImageFile("empty.png", "image/png", 0)])).toEqual({
      message: IMAGE_UPLOAD_CONTENT.it.emptyFileError,
      success: false,
    });
  });

  it("rejects oversized and multiple files", () => {
    const oversized = createImageFile(
      "large.jpg",
      "image/jpeg",
      IMAGE_UPLOAD_CONFIG.maxFileSizeBytes + 1,
    );

    expect(validateImageFile([oversized])).toEqual({
      message: IMAGE_UPLOAD_CONTENT.it.fileSizeError,
      success: false,
    });
    expect(
      validateImageFile([createImageFile(), createImageFile("second.png", "image/png")]),
    ).toEqual({
      message: IMAGE_UPLOAD_CONTENT.it.fileCountError,
      success: false,
    });
  });
});
