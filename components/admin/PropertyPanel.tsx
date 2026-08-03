"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { useLocale } from "@/contexts/LocaleContext";
import type { ContentDraft, SectionId } from "@/types/admin";
import { SECTION_EDITOR_CONFIGS, type SectionField } from "@/lib/admin/editor-config";
import { ListItemsEditor } from "@/components/admin/editors/ListItemsEditor";
import { HERO_CONTENT, HERO_TRUST_INDICATORS } from "@/locales/hero";
import { SERVICES_CONTENT } from "@/locales/services";
import { PROCESS_CONTENT, PROCESS_STEPS } from "@/locales/process";
import { WHY_CHOOSE_US_CONTENT, WHY_CHOOSE_US_FEATURES } from "@/locales/whyChooseUs";
import { STATISTICS_CONTENT, STATISTICS } from "@/locales/statistics";
import { TESTIMONIALS_CONTENT } from "@/locales/testimonials";
import { GALLERY_CONTENT } from "@/locales/gallery";
import { FAQ_CONTENT, FAQ_ITEMS } from "@/locales/faq";
import { ESTIMATE_CONTENT } from "@/constants/estimate";
import { CONTACT_CONTENT } from "@/constants/contact";
import { FINAL_CTA_CONTENT } from "@/locales/finalCta";

type PropertyPanelProps = {
  sectionId: string | null;
  content: Record<string, unknown> | null;
};

function getDefaultContent(sectionId: SectionId, locale: string): Record<string, unknown> {
  switch (sectionId) {
    case "hero":
      return HERO_CONTENT[locale as keyof typeof HERO_CONTENT] as unknown as Record<
        string,
        unknown
      >;
    case "services":
      return SERVICES_CONTENT[locale as keyof typeof SERVICES_CONTENT] as unknown as Record<
        string,
        unknown
      >;
    case "howItWorks":
      return { ...PROCESS_CONTENT[locale as keyof typeof PROCESS_CONTENT] };
    case "whyChooseUs":
      return WHY_CHOOSE_US_CONTENT[
        locale as keyof typeof WHY_CHOOSE_US_CONTENT
      ] as unknown as Record<string, unknown>;
    case "statistics":
      return STATISTICS_CONTENT[locale as keyof typeof STATISTICS_CONTENT] as unknown as Record<
        string,
        unknown
      >;
    case "testimonials":
      return TESTIMONIALS_CONTENT[locale as keyof typeof TESTIMONIALS_CONTENT] as unknown as Record<
        string,
        unknown
      >;
    case "gallery":
      return GALLERY_CONTENT[locale as keyof typeof GALLERY_CONTENT] as unknown as Record<
        string,
        unknown
      >;
    case "faq":
      return FAQ_CONTENT[locale as keyof typeof FAQ_CONTENT] as unknown as Record<string, unknown>;
    case "estimate":
      return { ...ESTIMATE_CONTENT } as unknown as Record<string, unknown>;
    case "contact":
      return { ...CONTACT_CONTENT } as unknown as Record<string, unknown>;
    case "finalCta":
      return FINAL_CTA_CONTENT[locale as keyof typeof FINAL_CTA_CONTENT] as unknown as Record<
        string,
        unknown
      >;
    default:
      return {};
  }
}

function getDefaultListItems(sectionId: SectionId, locale: string): Record<string, unknown>[] {
  switch (sectionId) {
    case "hero":
      return [
        ...HERO_TRUST_INDICATORS[locale as keyof typeof HERO_TRUST_INDICATORS],
      ] as unknown as Record<string, unknown>[];
    case "howItWorks":
      return [...PROCESS_STEPS[locale as keyof typeof PROCESS_STEPS]] as unknown as Record<
        string,
        unknown
      >[];
    case "whyChooseUs":
      return [
        ...WHY_CHOOSE_US_FEATURES[locale as keyof typeof WHY_CHOOSE_US_FEATURES],
      ] as unknown as Record<string, unknown>[];
    case "statistics":
      return [...STATISTICS[locale as keyof typeof STATISTICS]] as unknown as Record<
        string,
        unknown
      >[];
    case "faq":
      return [...FAQ_ITEMS[locale as keyof typeof FAQ_ITEMS]] as unknown as Record<
        string,
        unknown
      >[];
    default:
      return [];
  }
}

function fieldsEqual(
  a: Record<string, string>,
  b: Record<string, unknown> | null,
  configFields: SectionField[],
): boolean {
  if (!b) return false;
  for (const field of configFields) {
    if (String(a[field.key] ?? "") !== String(b[field.key] ?? "")) return false;
  }
  return true;
}

function itemsEqual(
  a: Record<string, unknown>[] | null,
  b: Record<string, unknown> | null,
): boolean {
  if (a === null && !b) return true;
  const bItems = b?._items || b?._listItems;
  if (!a && !Array.isArray(bItems)) return true;
  if (!a || !Array.isArray(bItems)) return false;
  if (a.length !== bItems.length) return false;
  return a.every((item, i) => {
    const bItem = bItems[i] as Record<string, unknown>;
    return Object.keys(item).every((k) => String(item[k] ?? "") === String(bItem[k] ?? ""));
  });
}

export function PropertyPanel({ sectionId, content }: PropertyPanelProps) {
  const { updateSection } = useAdmin();
  const { locale } = useLocale();
  const [localFields, setLocalFields] = useState<Record<string, string>>({});
  const [localItems, setLocalItems] = useState<Record<string, unknown>[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const config = useMemo(() => {
    if (!sectionId) return null;
    return SECTION_EDITOR_CONFIGS[sectionId as SectionId] ?? null;
  }, [sectionId]);

  useEffect(() => {
    if (!sectionId || !config) {
      setLocalFields({});
      setLocalItems(null);
      return;
    }
    const defaults = getDefaultContent(sectionId as SectionId, locale);
    const merged: Record<string, string> = {};
    for (const field of config.fields) {
      const override = content?.[field.key];
      const defaultValue = defaults[field.key];
      merged[field.key] = String(override ?? defaultValue ?? "");
    }
    setLocalFields(merged);

    if (config.listConfig) {
      const defaultItems = getDefaultListItems(sectionId as SectionId, locale);
      const overrideItems = content?._items || content?._listItems;
      setLocalItems(
        Array.isArray(overrideItems) && overrideItems.length > 0
          ? (overrideItems as Record<string, unknown>[])
          : defaultItems,
      );
    } else {
      setLocalItems(null);
    }

    setSaved(false);
  }, [sectionId, content, config, locale]);

  const dirty = useMemo(() => {
    if (!config || !sectionId) return false;
    if (saved) return false;
    if (localItems !== null && config.listConfig) {
      if (!itemsEqual(localItems, content)) return true;
    }
    if (!fieldsEqual(localFields, content, config.fields)) return true;
    return false;
  }, [config, sectionId, localFields, localItems, content, saved]);

  const handleFieldChange = useCallback((key: string, value: string) => {
    setLocalFields((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const handleItemsChange = useCallback((items: Record<string, unknown>[]) => {
    setLocalItems(items);
    setSaved(false);
  }, []);

  const handleSave = useCallback(async () => {
    if (!sectionId) return;
    setSaving(true);
    try {
      const payload: Record<string, unknown> = { ...localFields };
      if (localItems !== null) {
        payload._items = localItems;
      }
      await updateSection("home" as keyof ContentDraft, sectionId, payload);
      setSaved(true);
      clearTimeout(savedTimer.current);
      savedTimer.current = setTimeout(() => setSaved(false), 3000);
    } catch {
      // save failed — keep dirty
    } finally {
      setSaving(false);
    }
  }, [sectionId, localFields, localItems, updateSection]);

  // cleanup timer
  useEffect(() => {
    return () => clearTimeout(savedTimer.current);
  }, []);

  if (!sectionId) {
    return (
      <div className="flex items-center justify-center p-8 text-sm text-zinc-500">
        Select a section to edit
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex items-center justify-center p-8 text-sm text-zinc-500">
        No editor config for &ldquo;{sectionId}&rdquo;
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">{sectionId}</h3>
        {dirty && (
          <span className="rounded bg-amber-600/20 px-2 py-0.5 text-[10px] font-medium text-amber-400">
            Unsaved
          </span>
        )}
        {saved && (
          <span className="rounded bg-emerald-600/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
            Saved
          </span>
        )}
      </div>

      {config.fields.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold tracking-wide text-zinc-400">Content Fields</h4>
          {config.fields.map((field) => (
            <FieldEditor
              key={field.key}
              field={field}
              value={localFields[field.key] ?? ""}
              onChange={(v) => handleFieldChange(field.key, v)}
            />
          ))}
        </div>
      )}

      {config.listConfig && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold tracking-wide text-zinc-400">
            {config.listConfig.itemsLabel}
          </h4>
          <ListItemsEditor
            config={config.listConfig}
            items={localItems ?? []}
            onChange={handleItemsChange}
          />
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving || !dirty}
        className="w-full rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-500 disabled:opacity-40"
      >
        {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

function ImageFieldEditor({
  value,
  onChange,
  baseClass,
}: {
  value: string;
  onChange: (value: string) => void;
  baseClass: string;
}) {
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={baseClass}
        placeholder="https://example.com/image.jpg"
      />
      {value && (
        <div className="relative h-20 w-full overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
            onLoad={(e) => {
              (e.target as HTMLImageElement).style.display = "block";
            }}
          />
        </div>
      )}
    </div>
  );
}

function HrefFieldEditor({
  value,
  onChange,
  baseClass,
}: {
  value: string;
  onChange: (value: string) => void;
  baseClass: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0 text-xs text-zinc-600">/</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={baseClass}
        placeholder="e.g. services or https://..."
      />
    </div>
  );
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: SectionField;
  value: string;
  onChange: (value: string) => void;
}) {
  const baseClass =
    "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";

  if (field.type === "image") {
    return (
      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-400">{field.label}</label>
        <ImageFieldEditor value={value} onChange={onChange} baseClass={baseClass} />
      </div>
    );
  }

  if (field.type === "href") {
    return (
      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-400">{field.label}</label>
        <HrefFieldEditor value={value} onChange={onChange} baseClass={baseClass} />
      </div>
    );
  }

  if (field.type === "icon") {
    return (
      <div>
        <label className="mb-1 block text-xs font-medium text-zinc-400">{field.label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)} className={baseClass}>
          <option value="">Select icon...</option>
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="furniture">Furniture</option>
          <option value="media">Media / TV</option>
          <option value="doors">Doors</option>
          <option value="handyman">Handyman</option>
          <option value="contact">Contact</option>
          <option value="visit">Visit</option>
          <option value="communication">Communication</option>
          <option value="care">Care</option>
          <option value="response">Response</option>
          <option value="local">Local</option>
          <option value="team">Team</option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-zinc-400">{field.label}</label>
      {field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          rows={3}
          placeholder={field.placeholder}
        />
      ) : (
        <input
          type={field.type === "number" ? "number" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          placeholder={field.placeholder}
        />
      )}
    </div>
  );
}
