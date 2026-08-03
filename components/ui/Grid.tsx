import type { HTMLAttributes } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type GridGap = "none" | "sm" | "md" | "lg";

type GridProps = HTMLAttributes<HTMLDivElement> & {
  gap?: GridGap;
};

const GAP_CLASSES: Record<GridGap, string> = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export function Grid({ className, gap = "md", ...props }: GridProps) {
  return (
    <div
      className={mergeClassNames(
        "grid grid-cols-4 tablet:grid-cols-8 laptop:grid-cols-12",
        GAP_CLASSES[gap],
        className,
      )}
      {...props}
    />
  );
}
