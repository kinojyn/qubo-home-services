import { LoaderCircle } from "lucide-react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type SpinnerSize = "sm" | "md" | "lg";

type SpinnerProps = {
  className?: string;
  label?: string;
  size?: SpinnerSize;
};

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  sm: "size-icon-sm",
  md: "size-icon-md",
  lg: "size-icon-lg",
};

export function Spinner({ className, label = "Loading", size = "md" }: SpinnerProps) {
  return (
    <span className={mergeClassNames("inline-flex", className)} role="status">
      <LoaderCircle
        aria-hidden="true"
        className={mergeClassNames(
          SIZE_CLASSES[size],
          "motion-safe:animate-spin motion-reduce:animate-none",
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
