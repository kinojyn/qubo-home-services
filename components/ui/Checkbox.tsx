"use client";

import { forwardRef, type InputHTMLAttributes, useId } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  description?: string;
  error?: string;
  label: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, description, error, id, label, ...props },
  ref,
) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const descriptionId = `${checkboxId}-description`;
  const supportingText = error ?? description;

  return (
    <div className="grid gap-2">
      <label className="flex min-h-touch-target cursor-pointer items-start gap-3 text-sm text-text-primary">
        <input
          aria-describedby={supportingText ? descriptionId : undefined}
          aria-invalid={Boolean(error)}
          className={mergeClassNames(
            "mt-1 size-icon-md shrink-0 rounded-xs border-border-strong accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:opacity-[var(--ds-opacity-disabled)]",
            className,
          )}
          id={checkboxId}
          ref={ref}
          type="checkbox"
          {...props}
        />
        <span>{label}</span>
      </label>
      {supportingText && (
        <p
          className={mergeClassNames("pl-8 text-xs text-text-muted", error && "text-error")}
          id={descriptionId}
          role={error ? "alert" : undefined}
        >
          {supportingText}
        </p>
      )}
    </div>
  );
});
