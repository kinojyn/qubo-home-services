import type { HTMLAttributes } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type SkeletonShape = "line" | "circle" | "block";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  shape?: SkeletonShape;
};

const SHAPE_CLASSES: Record<SkeletonShape, string> = {
  line: "h-4 w-full rounded-sm",
  circle: "size-avatar-lg rounded-full",
  block: "min-h-input w-full rounded-lg",
};

export function Skeleton({ className, shape = "line", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={mergeClassNames(
        "bg-disabled-background motion-safe:animate-pulse motion-reduce:animate-none",
        SHAPE_CLASSES[shape],
        className,
      )}
      {...props}
    />
  );
}
