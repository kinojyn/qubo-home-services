import { IMAGE_UPLOAD_CONFIG, IMAGE_UPLOAD_CONTENT } from "@/constants/upload";

export type ImageFileValidationResult =
  { file: File; success: true } | { message: string; success: false };

export function validateImageFile(files: FileList | readonly File[]): ImageFileValidationResult {
  if (files.length !== 1) {
    return { message: IMAGE_UPLOAD_CONTENT.fileCountError, success: false };
  }

  const file = files[0];

  if (!file || file.size === 0) {
    return { message: IMAGE_UPLOAD_CONTENT.emptyFileError, success: false };
  }

  if (!IMAGE_UPLOAD_CONFIG.acceptedMimeTypes.some((mimeType) => mimeType === file.type)) {
    return { message: IMAGE_UPLOAD_CONTENT.fileTypeError, success: false };
  }

  if (file.size > IMAGE_UPLOAD_CONFIG.maxFileSizeBytes) {
    return { message: IMAGE_UPLOAD_CONTENT.fileSizeError, success: false };
  }

  return { file, success: true };
}
