"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const LOGIN_PATH = "/admin/login";

export function AdminAuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === LOGIN_PATH;

  useEffect(() => {
    if (!isLoginPage) router.replace(LOGIN_PATH);
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  return (
    <div
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-zinc-950 p-4"
    >
      <p className="text-sm text-zinc-400">Redirecting to secure login…</p>
    </div>
  );
}
