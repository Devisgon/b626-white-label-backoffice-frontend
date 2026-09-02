import { AlertTriangle, CalendarDays, PackageCheck, Send } from "lucide-react";

import type { SendToPosBatch } from "../types";
import { SendToPosStatusPill } from "./send-to-pos-status-pill";

export function SendToPosBatchDetails({ batch }: { batch: SendToPosBatch }) {
  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <InfoCard
          label="Items"
          value={String(batch.itemCount)}
          helper="Records included in this batch"
          icon={<PackageCheck className="size-5" />}
        />
        <InfoCard
          label="Created"
          value={formatDate(batch.createdAt)}
          helper={formatTime(batch.createdAt)}
          icon={<CalendarDays className="size-5" />}
        />
        <InfoCard
          label="Sent"
          value={batch.sentAt ? formatDate(batch.sentAt) : "Not sent"}
          helper={batch.sentAt ? formatTime(batch.sentAt) : "Waiting for send"}
          icon={<Send className="size-5" />}
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="flex flex-col justify-between gap-3 border-b border-border p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold">Batch information</h2>
            <p className="mt-1 text-xs text-muted">
              Complete record of this Send to POS batch.
            </p>
          </div>
          <SendToPosStatusPill value={batch.status} />
        </div>

        <dl className="divide-y divide-border px-5">
          <DetailsRow label="Batch ID" value={batch.id} mono />
          <DetailsRow label="Item count" value={String(batch.itemCount)} />
          <DetailsRow label="Created at" value={formatDateTime(batch.createdAt)} />
          <DetailsRow
            label="Sent at"
            value={batch.sentAt ? formatDateTime(batch.sentAt) : "Not sent"}
          />
          <DetailsRow label="Status" value={batch.status.toUpperCase()} />
        </dl>
      </section>

      {batch.errorMessage && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Send failed</p>
            <p className="mt-1 text-xs">{batch.errorMessage}</p>
          </div>
        </div>
      )}

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="border-b border-border p-5">
          <h2 className="font-bold">Batch items</h2>
          <p className="mt-1 text-xs text-muted">
            Mapped records included in the outgoing payload.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-surface-secondary text-[11px] font-bold uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Internal ID</th>
                <th className="px-5 py-4">External key</th>
                <th className="px-5 py-4">Display name</th>
                <th className="px-5 py-4">Mapping ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(batch.items ?? []).map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4 font-semibold">
                    {item.payload.internalEntityType ?? "—"}
                  </td>
                  <td className="px-5 py-4">
                    {item.payload.internalEntityId ?? "—"}
                  </td>
                  <td className="px-5 py-4">
                    {item.payload.externalEntityKey ?? "—"}
                  </td>
                  <td className="px-5 py-4">
                    {item.payload.externalDisplayName ?? "—"}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-muted">
                    {item.mappingId.slice(0, 8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!batch.items?.length && (
          <div className="px-5 py-12 text-center text-sm text-muted">
            No item details are available for this batch.
          </div>
        )}
      </section>
    </div>
  );
}

function InfoCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-1 truncate font-bold">{value}</p>
        <p className="mt-1 truncate text-[10px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

function DetailsRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="grid gap-2 py-4 text-sm sm:grid-cols-[180px_minmax(0,1fr)]">
      <dt className="font-medium text-muted">{label}</dt>
      <dd className={`break-all font-medium ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return `${formatDate(value)}, ${formatTime(value)}`;
}
