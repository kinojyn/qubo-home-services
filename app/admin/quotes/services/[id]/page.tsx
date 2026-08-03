"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { QuoteService, QuoteQuestion } from "@/types/quotes";
import { Save, Plus, Trash2, ArrowLeft } from "lucide-react";

export default function AdminServiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [service, setService] = useState<QuoteService | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/quotes/config");
      if (res.ok) {
        const data = await res.json();
        const found = data.services.find((s: QuoteService) => s.id === id);
        if (found) setService(found);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (!service) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/quotes/config");
      const data = await res.json();
      const idx = data.services.findIndex((s: QuoteService) => s.id === id);
      if (idx !== -1) data.services[idx] = service;

      const saveRes = await fetch("/api/quotes/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (saveRes.ok) setMessage("Saved successfully");
      else setMessage("Failed to save");
    } catch {
      setMessage("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const addQuestion = () => {
    if (!service) return;
    setService({
      ...service,
      questions: [
        ...service.questions,
        {
          id: `q-${Date.now()}`,
          key: "",
          label: "",
          type: "text",
          options: [],
          required: false,
          order: service.questions.length,
        },
      ],
    });
  };

  const updateQuestion = (index: number, field: keyof QuoteQuestion, value: unknown) => {
    if (!service) return;
    const updated = { ...service };
    updated.questions = updated.questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q,
    );
    setService(updated);
  };

  const removeQuestion = (index: number) => {
    if (!service) return;
    setService({ ...service, questions: service.questions.filter((_, i) => i !== index) });
  };

  const addRule = () => {
    if (!service) return;
    setService({
      ...service,
      pricingRules: [
        ...service.pricingRules,
        {
          id: `pr-${Date.now()}`,
          conditions: [{ field: "", operator: "eq", value: "" }],
          adjustments: [{ type: "fixed", label: "", amount: 0 }],
        },
      ],
    });
  };

  const removeRule = (index: number) => {
    if (!service) return;
    setService({ ...service, pricingRules: service.pricingRules.filter((_, i) => i !== index) });
  };

  const updateCondition = (ruleIdx: number, condIdx: number, field: string, value: unknown) => {
    if (!service) return;
    const updated = { ...service };
    const rule = { ...updated.pricingRules[ruleIdx] };
    rule.conditions = rule.conditions.map((c, i) => (i === condIdx ? { ...c, [field]: value } : c));
    updated.pricingRules = updated.pricingRules.map((r, i) => (i === ruleIdx ? rule : r));
    setService(updated);
  };

  const addCondition = (ruleIdx: number) => {
    if (!service) return;
    const updated = { ...service };
    const rule = { ...updated.pricingRules[ruleIdx] };
    rule.conditions = [...rule.conditions, { field: "", operator: "eq" as const, value: "" }];
    updated.pricingRules = updated.pricingRules.map((r, i) => (i === ruleIdx ? rule : r));
    setService(updated);
  };

  const removeCondition = (ruleIdx: number, condIdx: number) => {
    if (!service) return;
    const updated = { ...service };
    const rule = { ...updated.pricingRules[ruleIdx] };
    rule.conditions = rule.conditions.filter((_, i) => i !== condIdx);
    updated.pricingRules = updated.pricingRules.map((r, i) => (i === ruleIdx ? rule : r));
    setService(updated);
  };

  const updateAdjustment = (ruleIdx: number, adjIdx: number, field: string, value: unknown) => {
    if (!service) return;
    const updated = { ...service };
    const rule = { ...updated.pricingRules[ruleIdx] };
    rule.adjustments = rule.adjustments.map((a, i) =>
      i === adjIdx ? { ...a, [field]: value } : a,
    );
    updated.pricingRules = updated.pricingRules.map((r, i) => (i === ruleIdx ? rule : r));
    setService(updated);
  };

  const addAdjustment = (ruleIdx: number) => {
    if (!service) return;
    const updated = { ...service };
    const rule = { ...updated.pricingRules[ruleIdx] };
    rule.adjustments = [...rule.adjustments, { type: "fixed" as const, label: "", amount: 0 }];
    updated.pricingRules = updated.pricingRules.map((r, i) => (i === ruleIdx ? rule : r));
    setService(updated);
  };

  const removeAdjustment = (ruleIdx: number, adjIdx: number) => {
    if (!service) return;
    const updated = { ...service };
    const rule = { ...updated.pricingRules[ruleIdx] };
    rule.adjustments = rule.adjustments.filter((_, i) => i !== adjIdx);
    updated.pricingRules = updated.pricingRules.map((r, i) => (i === ruleIdx ? rule : r));
    setService(updated);
  };

  if (loading) return <div className="p-6 text-zinc-500">Loading...</div>;
  if (!service) return <div className="p-6 text-red-400">Service not found.</div>;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/quotes/services")}
            className="text-zinc-400 hover:text-zinc-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">{service.name}</h1>
            <p className="text-sm text-zinc-500">{service.id}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
        >
          <Save size={16} /> {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-2 text-sm ${
            message.includes("successfully")
              ? "bg-green-900/50 text-green-300"
              : "bg-red-900/50 text-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="mb-8 grid gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-lg font-medium text-white">Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Name</label>
            <input
              value={service.name}
              onChange={(e) => setService({ ...service, name: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Base Price (€)</label>
            <input
              type="number"
              value={service.basePrice}
              onChange={(e) => setService({ ...service, basePrice: parseInt(e.target.value) || 0 })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-400">Description</label>
          <textarea
            value={service.description}
            onChange={(e) => setService({ ...service, description: e.target.value })}
            rows={2}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Questions ({service.questions.length})</h2>
          <button
            onClick={addQuestion}
            className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300"
          >
            <Plus size={16} /> Add Question
          </button>
        </div>
        <div className="space-y-3">
          {service.questions.map((q, qi) => (
            <div key={qi} className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
              <div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <input
                  value={q.key}
                  onChange={(e) => updateQuestion(qi, "key", e.target.value)}
                  placeholder="Key (e.g. tipoRubinetto)"
                  className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                />
                <input
                  value={q.label}
                  onChange={(e) => updateQuestion(qi, "label", e.target.value)}
                  placeholder="Label (e.g. Tipo di rubinetto)"
                  className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                />
                <select
                  value={q.type}
                  onChange={(e) => updateQuestion(qi, "type", e.target.value)}
                  className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="radio">Radio</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="toggle">Toggle</option>
                  <option value="image">Image</option>
                </select>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 text-sm text-zinc-400">
                    <input
                      type="checkbox"
                      checked={q.required}
                      onChange={(e) => updateQuestion(qi, "required", e.target.checked)}
                      className="accent-amber-500"
                    />
                    Required
                  </label>
                  <button
                    onClick={() => removeQuestion(qi)}
                    className="ml-auto text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {(q.type === "dropdown" || q.type === "radio" || q.type === "checkbox") && (
                <div>
                  <label className="mb-1 block text-xs text-zinc-500">Options (one per line)</label>
                  <textarea
                    value={q.options.join("\n")}
                    onChange={(e) =>
                      updateQuestion(qi, "options", e.target.value.split("\n").filter(Boolean))
                    }
                    rows={3}
                    className="w-full rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">
            Pricing Rules ({service.pricingRules.length})
          </h2>
          <button
            onClick={addRule}
            className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300"
          >
            <Plus size={16} /> Add Rule
          </button>
        </div>
        <div className="space-y-4">
          {service.pricingRules.map((rule, ri) => (
            <div key={ri} className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-300">Rule {ri + 1}</span>
                <button onClick={() => removeRule(ri)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="mb-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">Conditions</span>
                  <button
                    onClick={() => addCondition(ri)}
                    className="text-xs text-amber-400 hover:text-amber-300"
                  >
                    + Add condition
                  </button>
                </div>
                {rule.conditions.map((cond, ci) => (
                  <div key={ci} className="mb-2 flex items-center gap-2">
                    <input
                      value={cond.field}
                      onChange={(e) => updateCondition(ri, ci, "field", e.target.value)}
                      placeholder="Field"
                      className="flex-1 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                    />
                    <select
                      value={cond.operator}
                      onChange={(e) => updateCondition(ri, ci, "operator", e.target.value)}
                      className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="eq">=</option>
                      <option value="neq">≠</option>
                      <option value="gt">&gt;</option>
                      <option value="gte">≥</option>
                      <option value="lt">&lt;</option>
                      <option value="lte">≤</option>
                    </select>
                    <input
                      value={String(cond.value)}
                      onChange={(e) => updateCondition(ri, ci, "value", e.target.value)}
                      placeholder="Value"
                      className="flex-1 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      onClick={() => removeCondition(ri, ci)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">Adjustments</span>
                  <button
                    onClick={() => addAdjustment(ri)}
                    className="text-xs text-amber-400 hover:text-amber-300"
                  >
                    + Add adjustment
                  </button>
                </div>
                {rule.adjustments.map((adj, ai) => (
                  <div key={ai} className="mb-2 flex items-center gap-2">
                    <select
                      value={adj.type}
                      onChange={(e) => updateAdjustment(ri, ai, "type", e.target.value)}
                      className="w-28 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="fixed">Fixed (€)</option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="per_unit">Per unit</option>
                    </select>
                    <input
                      value={adj.label}
                      onChange={(e) => updateAdjustment(ri, ai, "label", e.target.value)}
                      placeholder="Label"
                      className="flex-1 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                    />
                    <input
                      type="number"
                      value={adj.amount}
                      onChange={(e) =>
                        updateAdjustment(ri, ai, "amount", parseFloat(e.target.value) || 0)
                      }
                      className="w-24 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                    {adj.type === "per_unit" && (
                      <input
                        value={adj.unitField ?? ""}
                        onChange={(e) => updateAdjustment(ri, ai, "unitField", e.target.value)}
                        placeholder="Unit field"
                        className="w-28 rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                      />
                    )}
                    <button
                      onClick={() => removeAdjustment(ri, ai)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
