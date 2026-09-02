"use client";

import Link from "next/link";
import { Eye, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { demoSendToPosHistory } from "../demo-data";
import type { SendToPosBatchStatus } from "../types";
import { SendToPosStatusPill } from "./send-to-pos-status-pill";

type HistoryFilter = SendToPosBatchStatus | "all";

export function SendToPosHistoryList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<HistoryFilter>("all");

  const filteredHistory = useMemo(() => {
    const query = search.trim().toLowerCase();

    return demoSendToPosHistory.filter((batch) => {
      const matchesSearch = query === "" || batch.id.toLowerCase().includes(query);
      const matchesStatus = status === "all" || batch.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
      <div className="border-b border-border p-5">
        <h2 className="font-bold">Send history</h2>
        <p className="mt-1 text-xs text-muted">
          Review batches created through the Send to POS workflow.
        </p>
      </div>

      <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by batch ID..."
            className="h-11 w-full rounded-xl border border-border bg-white pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as HistoryFilter)}
          aria-label="Filter by batch status"
          className="h-11 rounded-xl border border-border bg-white px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 lg:min-w-44"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="sent">Sent</option>
          <option value="failed">Failed</option>
        </select>

        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-light px-4 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
        >
          <RotateCcw className="size-4" />
          Reset
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-surface-secondary text-[11px] font-bold uppercase tracking-wider text-muted">
            <tr>
              <th className="px-5 py-4">Batch ID</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4">Created</th>
              <th className="px-5 py-4">Sent</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {filteredHistory.map((batch) => (
              <tr
                key={batch.id}
                className="transition hover:bg-surface-secondary/60"
              >
                <td className="px-5 py-4 font-mono text-xs font-semibold">
                  {shortId(batch.id)}
                </td>
                <td className="px-5 py-4 font-semibold">{batch.itemCount}</td>
                <td className="px-5 py-4 text-muted">
                  {formatDateTime(batch.createdAt)}
                </td>
                <td className="px-5 py-4 text-muted">
                  {batch.sentAt ? formatDateTime(batch.sentAt) : "—"}
                </td>
                <td className="px-5 py-4">
                  <SendToPosStatusPill value={batch.status} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <Link
                      href={`/send-to-pos/history/${batch.id}`}
                      aria-label={`View batch ${batch.id}`}
                      title="View batch"
                      className="flex size-9 items-center justify-center rounded-xl border border-border text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary"
                    >
                      <Eye className="size-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredHistory.length === 0 && (
        <div className="px-5 py-14 text-center">
          <p className="font-semibold">No batches found</p>
          <p className="mt-1 text-xs text-muted">
            Change the search or status filter.
          </p>
        </div>
      )}

      <div className="border-t border-border px-5 py-4 text-xs text-muted">
        Showing {filteredHistory.length} of {demoSendToPosHistory.length} batches
      </div>
    </section>
  );
}

function shortId(value: string) {
  return value.slice(0, 8);
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}
