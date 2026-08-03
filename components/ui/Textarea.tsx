"use client";

import { forwardRef, type TextareaHTMLAttributes, useId } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  hint?: string;
  label: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, error, hint, id, label, required, rows = 5, ...props },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const descriptionId = `${textareaId}-description`;
  const description = error ?? hint;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-text-primary" htmlFor={textareaId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <textarea
        aria-describedby={description ? descriptionId : undefined}
        aria-invalid={Boolean(error)}
        className={mergeClassNames(
          "premium-field w-full resize-y rounded-md border border-border-strong bg-surface px-4 py-3 text-sm text-text-primary shadow-xs outline-none transition duration-[var(--ds-duration-normal)] ease-standard placeholder:text-text-muted hover:border-text-primary focus-visible:border-focus-ring focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:bg-disabled-background disabled:text-disabled-text disabled:opacity-[var(--ds-opacity-disabled)]",
          error && "border-error focus-visible:border-error focus-visible:ring-error",
          className,
        )}
        id={textareaId}
        ref={ref}
        required={required}
        rows={rows}
        {...props}
      />
      {description && (
        <p
          className={mergeClassNames("text-xs text-text-muted", error && "text-error")}
          id={descriptionId}
          role={error ? "alert" : undefined}
        >
          {description}
        </p>
      )}
    </div>
  );
});
