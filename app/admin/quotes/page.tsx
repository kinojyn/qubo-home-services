"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { QuoteSubmission } from "@/types/quotes";

export default function AdminQuotesPage() {
  const [submissions, setSubmissions] = useState<QuoteSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/quotes/submissions");
      if (res.ok) setSubmissions(await res.json());
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/quotes/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Quote Requests</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/quotes/categories"
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
          >
            Categories
          </Link>
          <Link
            href="/admin/quotes/services"
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500"
          >
            Services
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-500">Loading...</p>
      ) : submissions.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-zinc-400">No quote requests yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="px-4 py-3 font-medium text-zinc-300">Date</th>
                <th className="px-4 py-3 font-medium text-zinc-300">Customer</th>
                <th className="px-4 py-3 font-medium text-zinc-300">Service</th>
                <th className="px-4 py-3 font-medium text-zinc-300">Price</th>
                <th className="px-4 py-3 font-medium text-zinc-300">Status</th>
                <th className="px-4 py-3 font-medium text-zinc-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-b border-zinc-800 last:border-0">
                  <td className="px-4 py-3 text-zinc-300">
                    {new Date(s.createdAt).toLocaleDateString("it-IT", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    <div>{s.customerInfo.name}</div>
                    <div className="text-xs text-zinc-500">{s.customerInfo.phone}</div>
                    {s.customerInfo.city && (
                      <div className="text-xs text-zinc-500">{s.customerInfo.city}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    {s.customRequest ? "Richiesta personalizzata" : s.serviceId}
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-300">
                    {s.customRequest ? "—" : `€${s.calculatedPrice}`}
                    {s.travelFee > 0 && (
                      <div className="text-xs font-normal text-zinc-500">
                        Viaggio +€{s.travelFee}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        s.status === "new"
                          ? "bg-blue-900/50 text-blue-300"
                          : s.status === "contacted"
                            ? "bg-amber-900/50 text-amber-300"
                            : s.status === "accepted"
                              ? "bg-green-900/50 text-green-300"
                              : "bg-red-900/50 text-red-300"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {s.status === "new" && (
                        <button
                          onClick={() => updateStatus(s.id, "contacted")}
                          className="rounded bg-amber-600/20 px-2 py-1 text-xs text-amber-400 hover:bg-amber-600/30"
                        >
                          Mark contacted
                        </button>
                      )}
                      {s.status === "contacted" && (
                        <>
                          <button
                            onClick={() => updateStatus(s.id, "accepted")}
                            className="rounded bg-green-600/20 px-2 py-1 text-xs text-green-400 hover:bg-green-600/30"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateStatus(s.id, "rejected")}
                            className="rounded bg-red-600/20 px-2 py-1 text-xs text-red-400 hover:bg-red-600/30"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
