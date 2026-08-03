"use client";

import { Image as ImageIcon, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { type DragEvent, type ChangeEvent, useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { IMAGE_UPLOAD_CONFIG, IMAGE_UPLOAD_CONTENT } from "@/constants/upload";
import { validateImageFile } from "@/features/upload";
import { mergeClassNames } from "@/utils/mergeClassNames";

type UploadFieldProps = {
  className?: string;
  disabled?: boolean;
  id?: string;
  isLoading?: boolean;
  onFileChange?: (file: File | null) => void;
};

type ImageSelection = {
  file: File;
  previewUrl: string;
};

function formatFileSize(sizeInBytes: number) {
  return new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 1,
    style: "unit",
    unit: "megabyte",
    unitDisplay: "short",
  }).format(sizeInBytes / (1024 * 1024));
}

export function UploadField({
  className,
  disabled = false,
  id,
  isLoading = false,
  onFileChange,
}: UploadFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const dragDepthRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [selection, setSelection] = useState<ImageSelection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isDisabled = disabled || isLoading;

  useEffect(
    () => () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    },
    [],
  );

  function acceptFiles(files: FileList | readonly File[]) {
    const result = validateImageFile(files);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const previewUrl = URL.createObjectURL(result.file);
    previewUrlRef.current = previewUrl;
    setError(null);
    setSelection({ file: result.file, previewUrl });
    onFileChange?.(result.file);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) acceptFiles(event.target.files);
  }

  function handleDragEnter(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    if (isDisabled) return;
    dragDepthRef.current += 1;
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    dragDepthRef.current = 0;
    setIsDragging(false);
    if (!isDisabled) acceptFiles(event.dataTransfer.files);
  }

  function removeFile() {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = null;
    setSelection(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    onFileChange?.(null);
    inputRef.current?.focus();
  }

  const file = selection?.file;
  const previewUrl = selection?.previewUrl;

  return (
    <div className={mergeClassNames("grid gap-4", className)}>
      <div>
        <input
          accept={IMAGE_UPLOAD_CONFIG.acceptedMimeTypes.join(",")}
          aria-describedby={error ? errorId : hintId}
          aria-invalid={Boolean(error)}
          aria-label={IMAGE_UPLOAD_CONTENT.inputLabel}
          className="peer sr-only"
          disabled={isDisabled}
          id={inputId}
          onChange={handleInputChange}
          onClick={(event) => {
            event.currentTarget.value = "";
          }}
          ref={inputRef}
          type="file"
        />
        <label
          className={mergeClassNames(
            "flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border-strong bg-background-secondary px-6 py-8 text-center transition duration-[var(--ds-duration-normal)] ease-standard hover:border-accent hover:bg-surface peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring",
            isDragging && "border-accent bg-surface shadow-sm",
            isDisabled && "cursor-not-allowed opacity-[var(--ds-opacity-disabled)]",
          )}
          htmlFor={inputId}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {isLoading ? (
            <Spinner label={IMAGE_UPLOAD_CONTENT.loadingLabel} />
          ) : (
            <UploadCloud aria-hidden="true" className="size-icon-xl text-accent" />
          )}
          <span className="mt-4 font-heading text-md font-semibold text-text-primary">
            {isDragging ? IMAGE_UPLOAD_CONTENT.dropActiveTitle : IMAGE_UPLOAD_CONTENT.dropTitle}
          </span>
          <span className="mt-2 text-sm font-medium text-accent">
            {file ? IMAGE_UPLOAD_CONTENT.replaceLabel : IMAGE_UPLOAD_CONTENT.browseLabel}
          </span>
          <span className="mt-3 text-xs text-text-muted" id={hintId}>
            {IMAGE_UPLOAD_CONTENT.requirements}
          </span>
        </label>
      </div>

      {error && (
        <p className="text-sm text-error" id={errorId} role="alert">
          {error}
        </p>
      )}

      {file && previewUrl && (
        <div
          aria-label={IMAGE_UPLOAD_CONTENT.previewLabel}
          className="grid gap-4 rounded-xl border border-border-default bg-surface p-4 shadow-xs tablet:grid-cols-[var(--ds-size-card-compact)_1fr_auto] tablet:items-center"
          role="group"
        >
          <div className="relative aspect-video overflow-hidden rounded-lg bg-background-secondary">
            <Image
              alt={`Anteprima di ${file.name}`}
              className="object-cover"
              fill
              sizes="(max-width: 767px) 100vw, 18rem"
              src={previewUrl}
              unoptimized
            />
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-2 font-medium text-text-primary">
              <ImageIcon aria-hidden="true" className="size-icon-md shrink-0 text-accent" />
              <span className="truncate">{file.name}</span>
            </p>
            <p className="mt-1 text-xs text-text-muted">{formatFileSize(file.size)}</p>
          </div>
          <Button
            aria-label={`${IMAGE_UPLOAD_CONTENT.removeLabel}: ${file.name}`}
            className="w-full tablet:w-auto"
            disabled={isDisabled}
            leadingIcon={<Trash2 aria-hidden="true" className="size-icon-md" />}
            onClick={removeFile}
            variant="ghost"
          >
            {IMAGE_UPLOAD_CONTENT.removeLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
