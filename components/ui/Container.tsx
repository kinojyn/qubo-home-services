import type { HTMLAttributes } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type ContainerSize = "narrow" | "reading" | "content" | "wide" | "full";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
};

const SIZE_CLASSES: Record<ContainerSize, string> = {
  narrow: "max-w-narrow",
  reading: "max-w-reading",
  content: "max-w-content",
  wide: "max-w-wide",
  full: "max-w-none",
};

export function Container({ className, size = "content", ...props }: ContainerProps) {
  return (
    <div
      className={mergeClassNames(
        "mx-auto w-full px-4 tablet:px-6 laptop:px-8",
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    />
  );
}
