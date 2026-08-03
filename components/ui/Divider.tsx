import type { HTMLAttributes } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type DividerOrientation = "horizontal" | "vertical";

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: DividerOrientation;
};

const ORIENTATION_CLASSES: Record<DividerOrientation, string> = {
  horizontal: "h-px w-full",
  vertical: "h-full min-h-touch-target w-px self-stretch",
};

export function Divider({ className, orientation = "horizontal", ...props }: DividerProps) {
  return (
    <div
      aria-orientation={orientation}
      className={mergeClassNames(
        "shrink-0 bg-divider",
        ORIENTATION_CLASSES[orientation],
        className,
      )}
      role="separator"
      {...props}
    />
  );
}
