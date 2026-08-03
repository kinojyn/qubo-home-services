import type { HTMLAttributes } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "error" | "info";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: "bg-background-secondary text-text-secondary",
  accent: "bg-accent text-on-accent",
  success: "bg-success-surface text-success",
  warning: "bg-warning-surface text-warning",
  error: "bg-error-surface text-error",
  info: "bg-info-surface text-info",
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={mergeClassNames(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
