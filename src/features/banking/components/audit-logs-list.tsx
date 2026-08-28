"use client";

import { useMemo, useState } from "react";
import {
  Eye,
  FileClock,
  RotateCcw,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import type { BankingAuditLog } from "@/features/banking/types";

const auditLogs: BankingAuditLog[] = [
  {
    id: "d1111111-1111-4111-8111-111111111111",
    tenantId: "tenant-1",
    locationId: "location-1",
    entityType: "transaction",
    entityId: "c1111111-1111-4111-8111-111111111111",
    action: "posted",
    performedBy: "Amna",
    beforeData: {
      status: "draft",
    },
    afterData: {
      status: "posted",
      amount: 284650,
      referenceNumber: "DEP-2026-0081",
    },
    notes: "Transaction posted successfully.",
    createdAt: "2026-08-25T09:30:00.000Z",
  },
  {
    id: "d2222222-2222-4222-8222-222222222222",
    tenantId: "tenant-1",
    locationId: "location-1",
    entityType: "fund_transfer",
    entityId: "a1111111-1111-4111-8111-111111111111",
    action: "created",
    performedBy: "Amna",
    beforeData: null,
    afterData: {
      amount: 250000,
      status: "posted",
      sourceAccount: "HBL Main Operating Account",
      destinationAccount: "Meezan Business Account",
    },
    notes: "Fund transfer created.",
    createdAt: "2026-08-25T08:45:00.000Z",
  },
  {
    id: "d3333333-3333-4333-8333-333333333333",
    tenantId: "tenant-1",
    locationId: "location-1",
    entityType: "bank_reconciliation",
    entityId: "b2222222-2222-4222-8222-222222222222",
    action: "completed",
    performedBy: "Finance User",
    beforeData: {
      status: "in_progress",
    },
    afterData: {
      status: "completed",
      statementEndingBalance: 1275000,
      systemBalanceAtCompletion: 1275000,
    },
    notes: "Bank reconciliation completed successfully.",
    createdAt: "2026-08-24T15:20:00.000Z",
  },
  {
    id: "d4444444-4444-4444-8444-444444444444",
    tenantId: "tenant-1",
    locationId: "location-1",
    entityType: "bank_account",
    entityId: "11111111-1111-4111-8111-111111111111",
    action: "updated",
    performedBy: "Amna",
    beforeData: {
      accountName: "HBL Operating",
      status: "active",
    },
    afterData: {
      accountName: "HBL Main Operating Account",
      status: "active",
    },
    notes: "Bank account name updated.",
    createdAt: "2026-08-24T12:10:00.000Z",
  },
  {
    id: "d5555555-5555-4555-8555-555555555555",
    tenantId: "tenant-1",
    locationId: "location-1",
    entityType: "fund_transfer",
    entityId: "a3333333-3333-4333-8333-333333333333",
    action: "voided",
    performedBy: "Finance User",
    beforeData: {
      status: "posted",
      amount: 50000,
    },
    afterData: {
      status: "voided",
      amount: 50000,
      voidReason: "Incorrect amount entered during transfer.",
    },
    notes: "Incorrect amount entered during transfer.",
    createdAt: "2026-08-23T13:45:00.000Z",
  },
];

const entityOptions = Array.from(
  new Set(auditLogs.map((log) => log.entityType)),
);

const actionOptions = Array.from(new Set(auditLogs.map((log) => log.action)));

function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

export function AuditLogsList() {
  const [search, setSearch] = useState("");
  const [entityType, setEntityType] = useState("all");
  const [action, setAction] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [selectedLog, setSelectedLog] = useState<BankingAuditLog | null>(null);

  const filteredLogs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return auditLogs.filter((log) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        log.entityType.toLowerCase().includes(normalizedSearch) ||
        log.entityId.toLowerCase().includes(normalizedSearch) ||
        log.action.toLowerCase().includes(normalizedSearch) ||
        log.performedBy?.toLowerCase().includes(normalizedSearch) ||
        log.notes?.toLowerCase().includes(normalizedSearch);

      const matchesEntity =
        entityType === "all" || log.entityType === entityType;

      const matchesAction = action === "all" || log.action === action;

      const logDate = log.createdAt.slice(0, 10);

      const matchesDateFrom = !dateFrom || logDate >= dateFrom;

      const matchesDateTo = !dateTo || logDate <= dateTo;

      return (
        matchesSearch &&
        matchesEntity &&
        matchesAction &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [search, entityType, action, dateFrom, dateTo]);

  const uniqueUsers = new Set(
    auditLogs.map((log) => log.performedBy).filter(Boolean),
  ).size;

  const financialActions = auditLogs.filter(
    (log) =>
      log.action === "posted" ||
      log.action === "voided" ||
      log.action === "completed",
  ).length;

  function resetFilters() {
    setSearch("");
    setEntityType("all");
    setAction("all");
    setDateFrom("");
    setDateTo("");
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total audit entries"
          value={String(auditLogs.length)}
          helper="Recorded financial activities"
          icon={FileClock}
          iconClass="bg-primary-light text-primary"
        />

        <SummaryCard
          title="Financial actions"
          value={String(financialActions)}
          helper="Posted, voided and completed"
          icon={ShieldCheck}
          iconClass="bg-emerald-50 text-emerald-700"
        />

        <SummaryCard
          title="Active users"
          value={String(uniqueUsers)}
          helper="Users represented in this history"
          icon={UserRound}
          iconClass="bg-blue-50 text-blue-700"
        />
      </section>

      <section
        className="
          mt-6 overflow-hidden rounded-2xl
          border border-border bg-white
          shadow-[var(--shadow-sm)]
        "
      >
        <div className="border-b border-border p-5">
          <h2 className="font-bold">Financial audit history</h2>

          <p className="mt-1 text-xs text-muted">
            Review actions performed across the banking module.
          </p>
        </div>

        <div
          className="
            grid gap-3 border-b border-border
            p-4 lg:grid-cols-2 xl:grid-cols-6
          "
        >
          <div className="relative lg:col-span-2">
            <Search
              className="
                pointer-events-none absolute left-4
                top-1/2 size-4 -translate-y-1/2
                text-muted
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search audit history..."
              className="
                h-11 w-full rounded-xl border
                border-border bg-white pl-11 pr-4
                text-sm outline-none transition
                focus:border-primary
                focus:ring-4 focus:ring-primary/10
              "
            />
          </div>

          <select
            value={entityType}
            onChange={(event) => setEntityType(event.target.value)}
            aria-label="Filter by entity type"
            className="
              h-11 rounded-xl border border-border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          >
            <option value="all">All record types</option>

            {entityOptions.map((entity) => (
              <option key={entity} value={entity}>
                {formatLabel(entity)}
              </option>
            ))}
          </select>

          <select
            value={action}
            onChange={(event) => setAction(event.target.value)}
            aria-label="Filter by action"
            className="
              h-11 rounded-xl border border-border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          >
            <option value="all">All actions</option>

            {actionOptions.map((actionOption) => (
              <option key={actionOption} value={actionOption}>
                {formatLabel(actionOption)}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dateFrom}
            onChange={(event) => setDateFrom(event.target.value)}
            aria-label="Filter from date"
            className="
              h-11 rounded-xl border border-border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          />

          <input
            type="date"
            value={dateTo}
            onChange={(event) => setDateTo(event.target.value)}
            aria-label="Filter to date"
            className="
              h-11 rounded-xl border border-border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          />
        </div>

        <div className="border-b border-border p-4">
          <button
            type="button"
            onClick={resetFilters}
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              bg-primary-light px-4 text-sm
              font-semibold text-primary transition
              hover:bg-primary hover:text-white
            "
          >
            <RotateCcw className="size-4" />
            Reset filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">Record type</th>

                <th className="px-5 py-4">Action</th>

                <th className="px-5 py-4">Record ID</th>

                <th className="px-5 py-4">Performed by</th>

                <th className="px-5 py-4">Notes</th>

                <th className="px-5 py-4">Date and time</th>

                <th className="px-5 py-4 text-right">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="
                    text-sm transition
                    hover:bg-surface-secondary/60
                  "
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {formatLabel(log.entityType)}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <ActionBadge action={log.action} />
                  </td>

                  <td className="px-5 py-4">
                    <p className="max-w-40 truncate font-mono text-xs text-muted">
                      {log.entityId}
                    </p>
                  </td>

                  <td className="px-5 py-4">{log.performedBy || "System"}</td>

                  <td className="px-5 py-4">
                    <p className="max-w-56 truncate text-muted">
                      {log.notes || "No notes provided"}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {formatDateTime(log.createdAt)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        aria-label="View audit details"
                        className="
                          flex size-10 items-center
                          justify-center rounded-xl
                          border border-border bg-white
                          text-muted transition
                          hover:border-primary
                          hover:bg-primary-light
                          hover:text-primary
                        "
                      >
                        <Eye className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="px-5 py-16 text-center">
            <p className="font-semibold">No audit records found</p>

            <p className="mt-1 text-sm text-muted">
              Try changing or resetting the filters.
            </p>
          </div>
        )}

        <div
          className="
            border-t border-border px-5 py-4
            text-xs text-muted
          "
        >
          Showing {filteredLogs.length} of {auditLogs.length} audit records
        </div>
      </section>

      {selectedLog && (
        <AuditDetailsDialog
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  helper: string;
  icon: React.ElementType;
  iconClass: string;
}

function SummaryCard({
  title,
  value,
  helper,
  icon: Icon,
  iconClass,
}: SummaryCardProps) {
  return (
    <article
      className="
        flex items-center gap-4 rounded-2xl
        border border-border bg-white p-5
        shadow-[var(--shadow-sm)]
      "
    >
      <span
        className={`
          flex size-11 shrink-0 items-center
          justify-center rounded-xl
          ${iconClass}
        `}
      >
        <Icon className="size-5" />
      </span>

      <div>
        <p className="text-xs text-muted">{title}</p>

        <p className="mt-1 text-xl font-bold">{value}</p>

        <p className="mt-1 text-[11px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

function ActionBadge({ action }: { action: string }) {
  const styles: Record<string, string> = {
    created: "bg-blue-50 text-blue-700",
    updated: "bg-orange-50 text-orange-700",
    posted: "bg-emerald-50 text-emerald-700",
    completed: "bg-emerald-50 text-emerald-700",
    voided: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`
        inline-flex rounded-full px-2.5 py-1
        text-[10px] font-semibold
        ${styles[action] ?? "bg-slate-100 text-slate-700"}
      `}
    >
      {formatLabel(action)}
    </span>
  );
}

function AuditDetailsDialog({
  log,
  onClose,
}: {
  log: BankingAuditLog;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-details-title"
      className="
        fixed inset-0 z-50 flex items-center
        justify-center bg-black/40 p-4
        backdrop-blur-[2px]
      "
    >
      <div
        className="
          max-h-[90vh] w-full max-w-3xl
          overflow-y-auto rounded-2xl border
          border-border bg-white
          shadow-[var(--shadow-lg)]
        "
      >
        <div
          className="
            sticky top-0 flex items-start
            justify-between gap-4 border-b
            border-border bg-white p-5
          "
        >
          <div>
            <h2 id="audit-details-title" className="font-bold">
              Audit record details
            </h2>

            <p className="mt-1 text-xs text-muted">
              {formatLabel(log.entityType)} · {formatLabel(log.action)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close audit details"
            className="
              flex size-9 shrink-0 items-center
              justify-center rounded-xl
              text-muted transition
              hover:bg-surface-secondary
              hover:text-foreground
            "
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-6 p-5">
          <dl className="divide-y divide-border">
            <DetailsRow label="Audit log ID" value={log.id} />

            <DetailsRow
              label="Record type"
              value={formatLabel(log.entityType)}
            />

            <DetailsRow label="Record ID" value={log.entityId} />

            <DetailsRow label="Action" value={formatLabel(log.action)} />

            <DetailsRow
              label="Performed by"
              value={log.performedBy || "System"}
            />

            <DetailsRow
              label="Date and time"
              value={formatDateTime(log.createdAt)}
            />

            <DetailsRow
              label="Notes"
              value={log.notes || "No notes provided"}
            />
          </dl>

          <JsonSection title="Before changes" data={log.beforeData} />

          <JsonSection title="After changes" data={log.afterData} />
        </div>
      </div>
    </div>
  );
}

function DetailsRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        grid gap-2 py-4 text-sm
        sm:grid-cols-[160px_minmax(0,1fr)]
      "
    >
      <dt className="font-medium text-muted">{label}</dt>

      <dd className="break-all font-medium">{value}</dd>
    </div>
  );
}

function JsonSection({
  title,
  data,
}: {
  title: string;
  data: BankingAuditLog["beforeData"];
}) {
  return (
    <section>
      <h3 className="text-sm font-bold">{title}</h3>

      <pre
        className="
          mt-3 overflow-x-auto rounded-xl
          bg-slate-950 p-4 text-xs
          leading-6 text-slate-100
        "
      >
        {data === null ? "No data available" : JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}
