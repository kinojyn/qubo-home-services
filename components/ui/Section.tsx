import type { HTMLAttributes } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type SectionSpacing = "sm" | "md" | "lg" | "xl" | "2xl";
type SectionSurface = "primary" | "secondary" | "transparent";

type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: SectionSpacing;
  surface?: SectionSurface;
};

const SPACING_CLASSES: Record<SectionSpacing, string> = {
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
  xl: "py-section-xl",
  "2xl": "py-section-2xl",
};

const SURFACE_CLASSES: Record<SectionSurface, string> = {
  primary: "bg-background-primary",
  secondary: "bg-background-secondary",
  transparent: "bg-transparent",
};

export function Section({
  className,
  spacing = "lg",
  surface = "transparent",
  ...props
}: SectionProps) {
  return (
    <section
      className={mergeClassNames(SPACING_CLASSES[spacing], SURFACE_CLASSES[surface], className)}
      {...props}
    />
  );
}
