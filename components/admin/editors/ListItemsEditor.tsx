"use client";

import type { SectionField, ListConfig } from "@/lib/admin/editor-config";

type ListItemsEditorProps = {
  config: ListConfig;
  items: Record<string, unknown>[];
  onChange: (items: Record<string, unknown>[]) => void;
};

function FieldInput({
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

  if (field.type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={baseClass}
        rows={3}
        placeholder={field.placeholder}
      />
    );
  }

  if (field.type === "icon") {
    return (
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
    );
  }

  return (
    <input
      type={field.type === "number" ? "number" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={baseClass}
      placeholder={field.placeholder}
    />
  );
}

export function ListItemsEditor({ config, items, onChange }: ListItemsEditorProps) {
  function handleItemChange(index: number, key: string, value: string) {
    const updated = items.map((item, i) => {
      if (i !== index) return item;
      return { ...item, [key]: value };
    });
    onChange(updated);
  }

  function addItem() {
    onChange([...items, { ...config.defaultItem }]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function moveItem(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">
              {config.itemLabel} #{index + 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                className="rounded px-1.5 py-0.5 text-xs text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 disabled:opacity-30"
                title="Move up"
              >
                ▲
              </button>
              <button
                onClick={() => moveItem(index, 1)}
                disabled={index === items.length - 1}
                className="rounded px-1.5 py-0.5 text-xs text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 disabled:opacity-30"
                title="Move down"
              >
                ▼
              </button>
              <button
                onClick={() => removeItem(index)}
                className="rounded px-1.5 py-0.5 text-xs text-red-500 hover:bg-red-900/30"
                title={`Remove ${config.itemLabel}`}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {config.fields.map((field) => (
              <div key={field.key}>
                <label className="mb-0.5 block text-xs text-zinc-500 capitalize">
                  {field.label}
                </label>
                <FieldInput
                  field={field}
                  value={String(item[field.key] ?? "")}
                  onChange={(value) => handleItemChange(index, field.key, value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-700 px-4 py-3 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-300"
      >
        + {config.addLabel}
      </button>
    </div>
  );
}
