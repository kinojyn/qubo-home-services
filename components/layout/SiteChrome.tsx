"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Keeps the existing site shell intact; advertising pages supply their own shell. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/pubblicita") return null;

  return children;
}
