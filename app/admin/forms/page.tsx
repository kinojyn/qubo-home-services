"use client";

import { useEffect, useState } from "react";

import type { StoredFormSubmission } from "@/lib/admin/formSubmissionStorage";

export default function AdminFormsPage() {
  const [submissions, setSubmissions] = useState<StoredFormSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/forms/submit")
      .then(async (response) => {
        if (response.ok) setSubmissions(await response.json());
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Form Requests</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Contact and quick-estimate forms are saved here even if email delivery fails.
        </p>
      </div>

      {loading ? (
        <p className="text-zinc-500">Loading...</p>
      ) : submissions.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-zinc-400">No form requests yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="px-4 py-3 font-medium text-zinc-300">Date</th>
                <th className="px-4 py-3 font-medium text-zinc-300">Type</th>
                <th className="px-4 py-3 font-medium text-zinc-300">Customer</th>
                <th className="px-4 py-3 font-medium text-zinc-300">Request</th>
                <th className="px-4 py-3 font-medium text-zinc-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => {
                const isContact = submission.form === "contact";
                const phone = isContact ? "" : submission.data.phone;
                const request = isContact ? submission.data.subject : submission.data.service;
                const details = isContact ? submission.data.message : submission.data.details;

                return (
                  <tr key={submission.id} className="border-b border-zinc-800 last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-300">
                      {new Date(submission.createdAt).toLocaleString("it-IT", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3 text-zinc-300">{submission.form}</td>
                    <td className="px-4 py-3 text-zinc-300">
                      <div>{submission.data.fullName}</div>
                      <a
                        className="text-xs text-amber-400"
                        href={`mailto:${submission.data.email}`}
                      >
                        {submission.data.email || "No email"}
                      </a>
                      {phone && <div className="text-xs text-zinc-500">{phone}</div>}
                    </td>
                    <td className="max-w-md px-4 py-3 text-zinc-300">
                      <div>{request}</div>
                      <div className="mt-1 line-clamp-3 text-xs text-zinc-500">{details}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        title={submission.delivery.error}
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          submission.delivery.status === "delivered"
                            ? "bg-green-900/50 text-green-300"
                            : submission.delivery.status === "failed"
                              ? "bg-red-900/50 text-red-300"
                              : "bg-amber-900/50 text-amber-300"
                        }`}
                      >
                        {submission.delivery.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
