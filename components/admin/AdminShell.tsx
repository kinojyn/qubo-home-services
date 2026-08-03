"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/contexts/AdminContext";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "◉" },
  { href: "/admin/editor", label: "Visual Editor", icon: "✎" },
  { href: "/admin/quotes", label: "Quote Requests", icon: "€" },
  { href: "/admin/reviews", label: "Reviews", icon: "★" },
  { href: "/admin/media", label: "Media Library", icon: "▣" },
  { href: "/admin/versions", label: "Version History", icon: "↺" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
] as const;

export function AdminShell({ children, username }: { children: ReactNode; username: string }) {
  const pathname = usePathname();
  const { saving } = useAdmin();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.replace("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <aside className="fixed left-0 top-0 z-50 flex h-screen w-56 flex-col border-r border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-4">
          <span className="text-lg font-bold text-white">QUBO Admin</span>
          {saving && (
            <span className="ml-auto rounded bg-amber-600/20 px-2 py-0.5 text-xs text-amber-400">
              Saving...
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-amber-600/20 text-amber-400"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                }`}
              >
                <span className="w-5 text-center">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-800 p-3">
          <div className="mb-2 text-xs text-zinc-500">Signed in as</div>
          <div className="text-sm text-zinc-300">{username}</div>
          <button
            onClick={handleLogout}
            className="mt-2 w-full rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="ml-56 flex-1">{children}</main>
    </div>
  );
}
