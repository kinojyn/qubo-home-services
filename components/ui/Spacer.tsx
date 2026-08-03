import { mergeClassNames } from "@/utils/mergeClassNames";

type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type SpacerProps = {
  className?: string;
  size?: SpacerSize;
};

const SIZE_CLASSES: Record<SpacerSize, string> = {
  xs: "h-2",
  sm: "h-4",
  md: "h-8",
  lg: "h-12",
  xl: "h-16",
  "2xl": "h-24",
};

export function Spacer({ className, size = "md" }: SpacerProps) {
  return (
    <div
      aria-hidden="true"
      className={mergeClassNames("shrink-0", SIZE_CLASSES[size], className)}
    />
  );
}
