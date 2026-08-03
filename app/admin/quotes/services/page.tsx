"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { QuotesData } from "@/types/quotes";

export default function AdminServicesPage() {
  const [data, setData] = useState<QuotesData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/quotes/config");
      if (res.ok) setData(await res.json());
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <div className="p-6 text-zinc-500">Loading...</div>;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Services</h1>
        <Link
          href="/admin/quotes"
          className="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="space-y-6">
        {data?.categories.map((cat) => {
          const catServices = data.services.filter((s) => s.categoryId === cat.id);
          return (
            <div key={cat.id}>
              <h2 className="mb-3 text-lg font-medium text-amber-400">{cat.name}</h2>
              {catServices.length === 0 ? (
                <p className="text-sm text-zinc-500">No services in this category.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {catServices.map((svc) => (
                    <Link
                      key={svc.id}
                      href={`/admin/quotes/services/${svc.id}`}
                      className="block rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-700"
                    >
                      <h3 className="font-medium text-white">{svc.name}</h3>
                      <p className="mt-1 text-xs text-zinc-500 line-clamp-2">{svc.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-400">€{svc.basePrice}</span>
                        <span className="text-xs text-zinc-600">
                          {svc.questions.length} domande
                          {" · "}
                          {svc.pricingRules.length} regole
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
