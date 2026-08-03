import type { HTMLAttributes } from "react";

import { mergeClassNames } from "@/utils/mergeClassNames";

type PageWrapperProps = HTMLAttributes<HTMLElement>;

export function PageWrapper({ className, ...props }: PageWrapperProps) {
  return (
    <main
      className={mergeClassNames("min-h-screen bg-background-primary text-text-primary", className)}
      id="main-content"
      tabIndex={-1}
      {...props}
    />
  );
}
