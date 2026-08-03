"use client";

import type { ReactNode } from "react";
import { useAdmin } from "@/contexts/AdminContext";

type SectionWrapperProps = {
  id: string;
  label: string;
  visible: boolean;
  isSelected: boolean;
  onSelect: () => void;
  editMode: "preview" | "edit";
  children: ReactNode;
};

export function SectionWrapper({
  id,
  label,
  visible,
  isSelected,
  onSelect,
  editMode,
  children,
}: SectionWrapperProps) {
  const { toggleVisibility } = useAdmin();

  if (!visible && editMode === "preview") return null;

  async function handleToggle() {
    await toggleVisibility("home", id);
  }

  return (
    <div
      className={`group relative mb-4 transition-all ${
        isSelected ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-zinc-950" : ""
      } ${!visible ? "opacity-40" : ""}`}
      onClick={onSelect}
    >
      {editMode === "edit" && (
        <div className="absolute -top-3 left-4 z-40 flex items-center gap-2">
          <span className="rounded bg-amber-600 px-2 py-0.5 text-xs font-medium text-white shadow-lg">
            {label}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            className={`rounded px-2 py-0.5 text-xs font-medium text-white shadow-lg transition-colors ${
              visible ? "bg-zinc-700 hover:bg-zinc-600" : "bg-green-700 hover:bg-green-600"
            }`}
            title={visible ? "Hide section" : "Show section"}
          >
            {visible ? "Hide" : "Show"}
          </button>
        </div>
      )}

      {editMode === "edit" && !visible && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <span className="rounded bg-zinc-800 px-3 py-1 text-xs text-zinc-500">
            Section hidden
          </span>
        </div>
      )}

      {children}
    </div>
  );
}
