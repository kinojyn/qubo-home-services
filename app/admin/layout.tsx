import type { ReactNode } from "react";
import type { Metadata } from "next";

import { getSession } from "@/lib/admin/auth";
import { getDraft } from "@/lib/admin/content";
import { AdminProvider } from "@/contexts/AdminContext";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { initStorage } from "@/lib/admin/storage";

type AdminLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  initStorage();
  const session = await getSession();

  if (!session) {
    return <AdminAuthGate>{children}</AdminAuthGate>;
  }

  const draft = await getDraft();

  return (
    <AdminProvider initial={draft}>
      <AdminShell username={session.username}>{children}</AdminShell>
    </AdminProvider>
  );
}
