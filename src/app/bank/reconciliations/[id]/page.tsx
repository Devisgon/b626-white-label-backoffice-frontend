import Link from "next/link";
import {
  ArrowLeft,
  CalendarRange,
  CheckCircle2,
  Clock3,
  Landmark,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import { ReconciliationWorkspace } from "@/features/banking/components";
import type { ReconciliationStatus } from "@/features/banking/types";

interface ReconciliationDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface ReconciliationRecord {
  id: string;
  bankAccountName: string;
  bankAccountNumber: string;
  statementStartDate: string;
  statementEndDate: string;
  statementEndingBalance: number;
  openingSystemBalance: number;
  status: ReconciliationStatus;
  completedAt: string | null;
  createdAt: string;
  createdBy: string;
}

const reconciliationRecords: Record<string, ReconciliationRecord> = {
  "b1111111-1111-4111-8111-111111111111": {
    id: "b1111111-1111-4111-8111-111111111111",
    bankAccountName: "HBL Main Operating Account",
    bankAccountNumber: "**** 2343",
    statementStartDate: "2026-08-01",
    statementEndDate: "2026-08-31",
    statementEndingBalance: 1850000,
    openingSystemBalance: 1600000,
    status: "in_progress",
    completedAt: null,
    createdAt: "2026-08-23T10:30:00.000Z",
    createdBy: "Amna",
  },

  "b2222222-2222-4222-8222-222222222222": {
    id: "b2222222-2222-4222-8222-222222222222",
    bankAccountName: "Meezan Business Account",
    bankAccountNumber: "**** 7812",
    statementStartDate: "2026-07-01",
    statementEndDate: "2026-07-31",
    statementEndingBalance: 1275000,
    openingSystemBalance: 1025000,
    status: "completed",
    completedAt: "2026-08-02T15:20:00.000Z",
    createdAt: "2026-08-01T09:15:00.000Z",
    createdBy: "Amna",
  },

  "b3333333-3333-4333-8333-333333333333": {
    id: "b3333333-3333-4333-8333-333333333333",
    bankAccountName: "UBL Petty Cash Account",
    bankAccountNumber: "**** 4590",
    statementStartDate: "2026-07-01",
    statementEndDate: "2026-07-31",
    statementEndingBalance: 95000,
    openingSystemBalance: -155000,
    status: "completed",
    completedAt: "2026-08-01T12:45:00.000Z",
    createdAt: "2026-07-31T11:40:00.000Z",
    createdBy: "Amna",
  },

  "b4444444-4444-4444-8444-444444444444": {
    id: "b4444444-4444-4444-8444-444444444444",
    bankAccountName: "HBL Main Operating Account",
    bankAccountNumber: "**** 2343",
    statementStartDate: "2026-06-01",
    statementEndDate: "2026-06-30",
    statementEndingBalance: 1690000,
    openingSystemBalance: 1440000,
    status: "cancelled",
    completedAt: null,
    createdAt: "2026-07-01T08:30:00.000Z",
    createdBy: "Amna",
  },
};

const fallbackReconciliation =
  reconciliationRecords["b1111111-1111-4111-8111-111111111111"];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function ReconciliationDetailsPage({
  params,
}: ReconciliationDetailsPageProps) {
  const { id } = await params;

  const reconciliation = reconciliationRecords[id] ?? fallbackReconciliation;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href="/bank/reconciliations"
            aria-label="Return to reconciliations"
            className="
              flex size-10 shrink-0 items-center
              justify-center rounded-xl border
              border-border bg-white text-muted
              transition hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <ArrowLeft className="size-4" />
          </Link>

          <span
            className="
              flex size-10 shrink-0 items-center
              justify-center rounded-xl
              bg-primary-light text-primary
            "
          >
            <CalendarRange className="size-4" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Reconciliation details
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {reconciliation.bankAccountName}
              </h1>

              <ReconciliationStatusBadge status={reconciliation.status} />
            </div>

            <p className="mt-2 text-sm text-muted">
              {formatDate(reconciliation.statementStartDate)} to{" "}
              {formatDate(reconciliation.statementEndDate)}
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Bank account"
            value={reconciliation.bankAccountName}
            helper={reconciliation.bankAccountNumber}
            icon={Landmark}
          />

          <InfoCard
            title="Statement balance"
            value={formatCurrency(reconciliation.statementEndingBalance)}
            helper="Closing statement balance"
            icon={CalendarRange}
          />

          <InfoCard
            title="Created by"
            value={reconciliation.createdBy}
            helper={formatDateTime(reconciliation.createdAt)}
            icon={Clock3}
          />
        </section>

        {reconciliation.status === "completed" && (
          <section
            className="
              mt-6 rounded-2xl border
              border-emerald-200 bg-emerald-50
              p-5
            "
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 text-emerald-700" />

              <div>
                <h2 className="font-bold text-emerald-800">
                  Reconciliation completed
                </h2>

                <p className="mt-1 text-xs text-emerald-700">
                  Completed on{" "}
                  {reconciliation.completedAt
                    ? formatDateTime(reconciliation.completedAt)
                    : "Not available"}
                  . This record is now locked.
                </p>
              </div>
            </div>
          </section>
        )}

        {reconciliation.status === "cancelled" && (
          <section
            className="
              mt-6 rounded-2xl border
              border-red-200 bg-red-50 p-5
            "
          >
            <div className="flex items-start gap-3">
              <XCircle className="mt-0.5 size-5 text-red-700" />

              <div>
                <h2 className="font-bold text-red-800">
                  Reconciliation cancelled
                </h2>

                <p className="mt-1 text-xs text-red-700">
                  This record is locked and cannot be modified.
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="mt-6">
          <ReconciliationWorkspace
            reconciliationId={reconciliation.id}
            status={reconciliation.status}
            openingSystemBalance={reconciliation.openingSystemBalance}
            statementEndingBalance={reconciliation.statementEndingBalance}
          />
        </div>
      </div>
    </AppShell>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  helper: string;
  icon: LucideIcon;
}

function InfoCard({ title, value, helper, icon: Icon }: InfoCardProps) {
  return (
    <article
      className="
        flex items-center gap-4 rounded-2xl
        border border-border bg-white p-5
        shadow-[var(--shadow-sm)]
      "
    >
      <span
        className="
          flex size-11 shrink-0 items-center
          justify-center rounded-xl
          bg-primary-light text-primary
        "
      >
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">{title}</p>

        <p className="mt-1 truncate font-bold">{value}</p>

        <p className="mt-1 truncate text-[11px] text-muted">{helper}</p>
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
