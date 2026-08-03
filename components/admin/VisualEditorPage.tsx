"use client";

import { useCallback, useMemo, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { SectionWrapper } from "@/components/admin/SectionWrapper";
import { PropertyPanel } from "@/components/admin/PropertyPanel";
import { SectionPreview } from "@/components/admin/editors/SectionPreview";
import type { SectionId } from "@/types/admin";

const SECTION_LABELS: Record<SectionId, string> = {
  hero: "Hero",
  services: "Services",
  howItWorks: "How It Works",
  whyChooseUs: "Why Choose Us",
  statistics: "Statistics",
  testimonials: "Testimonials",
  gallery: "Gallery",
  faq: "FAQ",
  estimate: "Request Estimate",
  contact: "Contact",
  finalCta: "Final CTA",
};

export function VisualEditorPage() {
  const { draft, editMode, selectedSection, setSelectedSection, setEditMode, saving, publish } =
    useAdmin();
  const [activeTab, setActiveTab] = useState<"sections" | "properties">("properties");
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const sections = useMemo(() => {
    if (!draft) return [];
    return [...draft.home.sections]
      .sort((a, b) => a.order - b.order)
      .map((s) => ({
        ...s,
        label: SECTION_LABELS[s.id as SectionId] || s.id,
      }));
  }, [draft]);

  const selectedContent = useMemo(() => {
    if (!selectedSection || !draft) return null;
    const section = draft.home.sections.find((s) => s.id === selectedSection);
    return section?.content || null;
  }, [selectedSection, draft]);

  const handleSelect = useCallback(
    (id: string) => {
      if (editMode !== "edit") return;
      const newId = id === selectedSection ? null : id;
      setSelectedSection(newId);
      if (newId) setActiveTab("properties");
    },
    [selectedSection, setSelectedSection, editMode],
  );

  const handlePublish = useCallback(async () => {
    setPublishing(true);
    try {
      await publish();
      setPublished(true);
      setTimeout(() => setPublished(false), 3000);
    } finally {
      setPublishing(false);
    }
  }, [publish]);

  if (!draft) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-0px)]">
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-6 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-500">Mode:</span>
              <button
                onClick={() => {
                  setEditMode("edit");
                  setSelectedSection(null);
                }}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                  editMode === "edit"
                    ? "bg-amber-600/20 text-amber-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Edit
              </button>
              <span className="text-zinc-700">|</span>
              <button
                onClick={() => {
                  setEditMode("preview");
                  setSelectedSection(null);
                }}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                  editMode === "preview"
                    ? "bg-amber-600/20 text-amber-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Preview
              </button>
            </div>

            <div className="ml-auto flex items-center gap-3">
              {saving && <span className="text-xs text-zinc-500">Saving...</span>}

              <button
                onClick={handlePublish}
                disabled={publishing}
                className="flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                {publishing ? "Publishing..." : published ? "Published!" : "Publish"}
              </button>
            </div>
          </div>

          {editMode === "edit" && (
            <div className="border-t border-zinc-800/50 px-6 py-1.5">
              <p className="text-[11px] text-zinc-600">
                Click any section to edit its content.{" "}
                {sections.filter((s) => !s.visible).length > 0 &&
                  `${sections.filter((s) => !s.visible).length} section(s) hidden.`}
              </p>
            </div>
          )}
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-8">
            {editMode === "preview"
              ? sections
                  .filter((s) => s.visible)
                  .map((section) => (
                    <div key={section.id} className="mb-4">
                      <SectionPreview
                        sectionId={section.id as SectionId}
                        content={section.content}
                      />
                    </div>
                  ))
              : sections.map((section) => (
                  <SectionWrapper
                    key={section.id}
                    id={section.id}
                    label={section.label}
                    visible={section.visible}
                    isSelected={selectedSection === section.id}
                    onSelect={() => handleSelect(section.id)}
                    editMode={editMode}
                  >
                    <SectionPreview sectionId={section.id as SectionId} content={section.content} />
                  </SectionWrapper>
                ))}

            {editMode === "preview" && sections.filter((s) => s.visible).length === 0 && (
              <div className="flex items-center justify-center p-12">
                <p className="text-sm text-zinc-500">
                  All sections are hidden. Switch to Edit mode to show sections.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <aside className="hidden w-80 shrink-0 border-l border-zinc-800 bg-zinc-900 laptop:block">
        <div className="flex border-b border-zinc-800">
          <button
            onClick={() => setActiveTab("sections")}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeTab === "sections"
                ? "border-b-2 border-amber-500 text-amber-400"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Sections
          </button>
          <button
            onClick={() => setActiveTab("properties")}
            className={`flex-1 px-4 py-3 text-sm transition-colors ${
              activeTab === "properties"
                ? "border-b-2 border-amber-500 text-amber-400"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Properties
          </button>
        </div>

        <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(100vh - 108px)" }}>
          {activeTab === "sections" ? (
            <div className="space-y-1">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                All Sections
              </p>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSelect(section.id)}
                  disabled={editMode !== "edit"}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    selectedSection === section.id
                      ? "bg-amber-600/20 text-amber-400"
                      : editMode === "edit"
                        ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                        : "cursor-default text-zinc-600"
                  }`}
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      section.visible ? "bg-green-500" : "bg-zinc-600"
                    }`}
                  />
                  <span className="flex-1 capitalize">{section.label}</span>
                  <span className="text-xs text-zinc-600">#{section.order}</span>
                </button>
              ))}
            </div>
          ) : (
            <PropertyPanel
              sectionId={editMode === "edit" ? selectedSection : null}
              content={selectedContent}
            />
          )}
        </div>
      </aside>
    </div>
  );
}
