import type { ReactNode } from "react";

import { getSession } from "@/lib/admin/auth";
import { getDraft } from "@/lib/admin/content";
import { AdminProvider } from "@/contexts/AdminContext";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { initStorage } from "@/lib/admin/storage";

type AdminLayoutProps = {
  children: ReactNode;
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
