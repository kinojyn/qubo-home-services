"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { ContentDraft } from "@/types/admin";

type AdminContextValue = {
  draft: ContentDraft | null;
  loading: boolean;
  saving: boolean;
  selectedSection: string | null;
  editMode: "preview" | "edit";
  refreshDraft: () => Promise<void>;
  updateSection: (
    page: keyof ContentDraft,
    sectionId: string,
    content: Record<string, unknown>,
  ) => Promise<void>;
  toggleVisibility: (page: keyof ContentDraft, sectionId: string) => Promise<void>;
  reorderSections: (page: keyof ContentDraft, orderedIds: string[]) => Promise<void>;
  publish: () => Promise<void>;
  setSelectedSection: (id: string | null) => void;
  setEditMode: (mode: "preview" | "edit") => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({
  children,
  initial,
}: {
  children: ReactNode;
  initial: ContentDraft | null;
}) {
  const [draft, setDraft] = useState<ContentDraft | null>(initial);
  const [loading, setLoading] = useState(!initial);
  const [saving, setSaving] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<"preview" | "edit">("edit");

  const refreshDraft = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content");
      if (res.ok) setDraft(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  const apiCall = useCallback(async (body: unknown) => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) setDraft(await res.json());
      return res.ok;
    } finally {
      setSaving(false);
    }
  }, []);

  const updateSection = useCallback(
    async (page: keyof ContentDraft, sectionId: string, content: Record<string, unknown>) => {
      await apiCall({ action: "updateSection", page, sectionId, content });
    },
    [apiCall],
  );

  const toggleVisibility = useCallback(
    async (page: keyof ContentDraft, sectionId: string) => {
      await apiCall({ action: "toggleVisibility", page, sectionId });
    },
    [apiCall],
  );

  const reorderSections = useCallback(
    async (page: keyof ContentDraft, orderedIds: string[]) => {
      await apiCall({ action: "reorder", page, orderedIds });
    },
    [apiCall],
  );

  const publish = useCallback(async () => {
    await apiCall({ action: "publish" });
  }, [apiCall]);

  return (
    <AdminContext.Provider
      value={{
        draft,
        loading,
        saving,
        selectedSection,
        editMode,
        refreshDraft,
        updateSection,
        toggleVisibility,
        reorderSections,
        publish,
        setSelectedSection,
        setEditMode,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
