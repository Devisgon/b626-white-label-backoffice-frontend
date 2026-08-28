"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  Eye,
  Plus,
  RotateCcw,
  Search,
  XCircle,
} from "lucide-react";

import type {
  BankReconciliation,
  ReconciliationStatus,
} from "@/features/banking/types";

interface ReconciliationListItem extends BankReconciliation {
  bankAccountName: string;
  bankAccountNumber: string;
}

const reconciliations: ReconciliationListItem[] = [
  {
    id: "b1111111-1111-4111-8111-111111111111",
    tenantId: "tenant-1",
    locationId: "location-1",
    bankAccountId: "11111111-1111-4111-8111-111111111111",
    bankAccountName: "HBL Main Operating Account",
    bankAccountNumber: "**** 2343",
    statementStartDate: "2026-08-01",
    statementEndDate: "2026-08-31",
    statementEndingBalance: 1850000,
    systemBalanceAtCompletion: null,
    status: "in_progress",
    completedAt: null,
    createdAt: "2026-08-23T10:30:00.000Z",
    updatedAt: "2026-08-23T10:30:00.000Z",
    createdBy: "user-1",
    updatedBy: null,
  },
  {
    id: "b2222222-2222-4222-8222-222222222222",
    tenantId: "tenant-1",
    locationId: "location-1",
    bankAccountId: "22222222-2222-4222-8222-222222222222",
    bankAccountName: "Meezan Business Account",
    bankAccountNumber: "**** 7812",
    statementStartDate: "2026-07-01",
    statementEndDate: "2026-07-31",
    statementEndingBalance: 1275000,
    systemBalanceAtCompletion: 1275000,
    status: "completed",
    completedAt: "2026-08-02T15:20:00.000Z",
    createdAt: "2026-08-01T09:15:00.000Z",
    updatedAt: "2026-08-02T15:20:00.000Z",
    createdBy: "user-1",
    updatedBy: "user-1",
  },
  {
    id: "b3333333-3333-4333-8333-333333333333",
    tenantId: "tenant-1",
    locationId: "location-1",
    bankAccountId: "33333333-3333-4333-8333-333333333333",
    bankAccountName: "UBL Petty Cash Account",
    bankAccountNumber: "**** 4590",
    statementStartDate: "2026-07-01",
    statementEndDate: "2026-07-31",
    statementEndingBalance: 95000,
    systemBalanceAtCompletion: 95000,
    status: "completed",
    completedAt: "2026-08-01T12:45:00.000Z",
    createdAt: "2026-07-31T11:40:00.000Z",
    updatedAt: "2026-08-01T12:45:00.000Z",
    createdBy: "user-1",
    updatedBy: "user-1",
  },
  {
    id: "b4444444-4444-4444-8444-444444444444",
    tenantId: "tenant-1",
    locationId: "location-1",
    bankAccountId: "11111111-1111-4111-8111-111111111111",
    bankAccountName: "HBL Main Operating Account",
    bankAccountNumber: "**** 2343",
    statementStartDate: "2026-06-01",
    statementEndDate: "2026-06-30",
    statementEndingBalance: 1690000,
    systemBalanceAtCompletion: null,
    status: "cancelled",
    completedAt: null,
    createdAt: "2026-07-01T08:30:00.000Z",
    updatedAt: "2026-07-01T09:00:00.000Z",
    createdBy: "user-1",
    updatedBy: "user-1",
  },
];

const accountOptions = Array.from(
  new Map(
    reconciliations.map((reconciliation) => [
      reconciliation.bankAccountId,
      {
        id: reconciliation.bankAccountId,
        name: reconciliation.bankAccountName,
      },
    ]),
  ).values(),
);

function formatCurrency(value: number | string | null) {
  if (value === null) {
    return "Not available";
  }

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function ReconciliationsList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ReconciliationStatus | "all">("all");

  const [bankAccountId, setBankAccountId] = useState("all");

  const filteredReconciliations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return reconciliations.filter((reconciliation) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        reconciliation.bankAccountName
          .toLowerCase()
          .includes(normalizedSearch) ||
        reconciliation.bankAccountNumber
          .toLowerCase()
          .includes(normalizedSearch) ||
        reconciliation.id.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        status === "all" || reconciliation.status === status;

      const matchesAccount =
        bankAccountId === "all" ||
        reconciliation.bankAccountId === bankAccountId;

      return matchesSearch && matchesStatus && matchesAccount;
    });
  }, [search, status, bankAccountId]);

  const inProgressCount = reconciliations.filter(
    (reconciliation) => reconciliation.status === "in_progress",
  ).length;

  const completedCount = reconciliations.filter(
    (reconciliation) => reconciliation.status === "completed",
  ).length;

  function resetFilters() {
    setSearch("");
    setStatus("all");
    setBankAccountId("all");
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total reconciliations"
          value={String(reconciliations.length)}
          helper="Across all bank accounts"
          icon={CheckCircle2}
          iconClass="bg-primary-light text-primary"
        />

        <SummaryCard
          title="In progress"
          value={String(inProgressCount)}
          helper="Waiting to be completed"
          icon={Clock3}
          iconClass="bg-orange-50 text-orange-700"
        />

        <SummaryCard
          title="Completed"
          value={String(completedCount)}
          helper="Successfully balanced"
          icon={CheckCircle2}
          iconClass="bg-emerald-50 text-emerald-700"
        />
      </section>

      <section
        className="
          mt-6 overflow-hidden rounded-2xl
          border border-border bg-white
          shadow-[var(--shadow-sm)]
        "
      >
        <div
          className="
            flex flex-col justify-between gap-4
            border-b border-border p-5
            sm:flex-row sm:items-center
          "
        >
          <div>
            <h2 className="font-bold">Bank reconciliations</h2>

            <p className="mt-1 text-xs text-muted">
              Match system transactions with bank statements.
            </p>
          </div>

          <Link
            href="/bank/reconciliations/new"
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-5 text-sm font-semibold
              text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Start reconciliation
          </Link>
        </div>

        <div
          className="
            flex flex-col gap-3 border-b
            border-border p-4 xl:flex-row
          "
        >
          <div className="relative min-w-0 flex-1">
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
              placeholder="Search by bank account..."
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
            value={bankAccountId}
            onChange={(event) => setBankAccountId(event.target.value)}
            aria-label="Filter by bank account"
            className="
              h-11 rounded-xl border border-border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
              xl:min-w-56
            "
          >
            <option value="all">All bank accounts</option>

            {accountOptions.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ReconciliationStatus | "all")
            }
            aria-label="Filter by status"
            className="
              h-11 rounded-xl border border-border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
              xl:min-w-44
            "
          >
            <option value="all">All statuses</option>

            <option value="in_progress">In progress</option>

            <option value="completed">Completed</option>

            <option value="cancelled">Cancelled</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary-light px-5 text-sm
              font-semibold text-primary transition
              hover:bg-primary hover:text-white
            "
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">Bank account</th>

                <th className="px-5 py-4">Statement period</th>

                <th className="px-5 py-4">Statement balance</th>

                <th className="px-5 py-4">System balance</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Created</th>

                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredReconciliations.map((reconciliation) => (
                <tr
                  key={reconciliation.id}
                  className="
                      text-sm transition
                      hover:bg-surface-secondary/60
                    "
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {reconciliation.bankAccountName}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      {reconciliation.bankAccountNumber}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium">
                      {formatDate(reconciliation.statementStartDate)}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      to {formatDate(reconciliation.statementEndDate)}
                    </p>
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {formatCurrency(reconciliation.statementEndingBalance)}
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {formatCurrency(reconciliation.systemBalanceAtCompletion)}
                  </td>

                  <td className="px-5 py-4">
                    <ReconciliationStatusBadge status={reconciliation.status} />
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {formatDate(reconciliation.createdAt)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <Link
                        href={`/bank/reconciliations/${reconciliation.id}`}
                        aria-label="View reconciliation"
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
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReconciliations.length === 0 && (
          <div className="px-5 py-16 text-center">
            <p className="font-semibold">No reconciliations found</p>

            <p className="mt-1 text-sm text-muted">
              Try changing or resetting the filters.
            </p>
          </div>
        )}

        <div
          className="
            flex flex-col justify-between gap-3
            border-t border-border px-5 py-4
            text-xs text-muted sm:flex-row
            sm:items-center
          "
        >
          <p>
            Showing {filteredReconciliations.length} of {reconciliations.length}{" "}
            reconciliations
          </p>

          <p>Data is currently used for frontend testing.</p>
        </div>
      </section>
    </div>
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

function ReconciliationStatusBadge({
  status,
}: {
  status: ReconciliationStatus;
}) {
  const configuration = {
    in_progress: {
      label: "In progress",
      className: "bg-orange-50 text-orange-700",
      icon: Clock3,
    },
    completed: {
      label: "Completed",
      className: "bg-emerald-50 text-emerald-700",
      icon: CheckCircle2,
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-50 text-red-700",
      icon: XCircle,
    },
  }[status];

  const Icon = configuration.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full px-2.5 py-1
        text-[10px] font-semibold
        ${configuration.className}
      `}
    >
      <Icon className="size-3" />
      {configuration.label}
    </span>
  );
}
