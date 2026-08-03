"use client";

import { forwardRef, type InputHTMLAttributes, useId } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  hint?: string;
  label: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, hint, id, label, required, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const description = error ?? hint;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-text-primary" htmlFor={inputId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        aria-describedby={description ? descriptionId : undefined}
        aria-invalid={Boolean(error)}
        className={mergeClassNames(
          "premium-field h-input w-full rounded-md border border-border-strong bg-surface px-4 text-sm text-text-primary shadow-xs outline-none transition duration-[var(--ds-duration-normal)] ease-standard placeholder:text-text-muted hover:border-text-primary focus-visible:border-focus-ring focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:bg-disabled-background disabled:text-disabled-text disabled:opacity-[var(--ds-opacity-disabled)]",
          error && "border-error focus-visible:border-error focus-visible:ring-error",
          className,
        )}
        id={inputId}
        ref={ref}
        required={required}
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
