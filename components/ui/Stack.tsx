import type { HTMLAttributes } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type StackAlign = "start" | "center" | "end" | "stretch";
type StackDirection = "row" | "column";
type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

type StackProps = HTMLAttributes<HTMLDivElement> & {
  align?: StackAlign;
  direction?: StackDirection;
  gap?: StackGap;
};

const ALIGN_CLASSES: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const DIRECTION_CLASSES: Record<StackDirection, string> = {
  row: "flex-row",
  column: "flex-col",
};

const GAP_CLASSES: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

export function Stack({
  align = "stretch",
  className,
  direction = "column",
  gap = "md",
  ...props
}: StackProps) {
  return (
    <div
      className={mergeClassNames(
        "flex",
        ALIGN_CLASSES[align],
        DIRECTION_CLASSES[direction],
        GAP_CLASSES[gap],
        className,
      )}
      {...props}
    />
  );
}
