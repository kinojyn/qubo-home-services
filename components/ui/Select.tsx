"use client";

import { ChevronDown } from "lucide-react";
import { forwardRef, type SelectHTMLAttributes, useId } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type SelectOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  error?: string;
  hint?: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, error, hint, id, label, options, placeholder, required, ...props },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const descriptionId = `${selectId}-description`;
  const description = error ?? hint;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-text-primary" htmlFor={selectId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <div className="relative">
        <select
          aria-describedby={description ? descriptionId : undefined}
          aria-invalid={Boolean(error)}
          className={mergeClassNames(
            "premium-field h-input w-full appearance-none rounded-md border border-border-strong bg-surface px-4 pr-12 text-sm text-text-primary shadow-xs outline-none transition duration-[var(--ds-duration-normal)] ease-standard hover:border-text-primary focus-visible:border-focus-ring focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:bg-disabled-background disabled:text-disabled-text disabled:opacity-[var(--ds-opacity-disabled)]",
            error && "border-error focus-visible:border-error focus-visible:ring-error",
            className,
          )}
          id={selectId}
          ref={ref}
          required={required}
          {...props}
        >
          {placeholder && (
            <option disabled value="">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option disabled={option.disabled} key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 size-icon-md -translate-y-1/2 text-accent"
        />
      </div>

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
