import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowRightLeft,
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  FileText,
  Landmark,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import { VoidTransferButton } from "@/features/banking/components";
import type { TransferStatus } from "@/features/banking/types";

interface TransferDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface TransferDetails {
  id: string;
  sourceAccountName: string;
  sourceAccountNumber: string;
  destinationAccountName: string;
  destinationAccountNumber: string;
  clearingAccountName: string;
  clearingAccountCode: string;
  amount: number;
  transferDate: string;
  memo: string;
  sourceTransactionId: string;
  destinationTransactionId: string;
  status: TransferStatus;
  voidedAt: string | null;
  voidReason: string | null;
  createdAt: string;
  createdBy: string;
}

const transferRecords: TransferDetails[] = [
  {
    id: "a1111111-1111-4111-8111-111111111111",
    sourceAccountName: "HBL Main Operating Account",
    sourceAccountNumber: "**** 2343",
    destinationAccountName: "Meezan Business Account",
    destinationAccountNumber: "**** 7812",
    clearingAccountName: "Bank Transfer Clearing",
    clearingAccountCode: "1050",
    amount: 250000,
    transferDate: "2026-08-23",
    memo: "Monthly operating fund allocation",
    sourceTransactionId: "61111111-1111-4111-8111-111111111111",
    destinationTransactionId: "71111111-1111-4111-8111-111111111111",
    status: "posted",
    voidedAt: null,
    voidReason: null,
    createdAt: "2026-08-23T10:30:00.000Z",
    createdBy: "Amna",
  },
  {
    id: "a2222222-2222-4222-8222-222222222222",
    sourceAccountName: "Meezan Business Account",
    sourceAccountNumber: "**** 7812",
    destinationAccountName: "UBL Petty Cash Account",
    destinationAccountNumber: "**** 4590",
    clearingAccountName: "Bank Transfer Clearing",
    clearingAccountCode: "1050",
    amount: 75000,
    transferDate: "2026-08-22",
    memo: "Weekly petty cash allocation",
    sourceTransactionId: "62222222-2222-4222-8222-222222222222",
    destinationTransactionId: "72222222-2222-4222-8222-222222222222",
    status: "posted",
    voidedAt: null,
    voidReason: null,
    createdAt: "2026-08-22T09:15:00.000Z",
    createdBy: "Amna",
  },
  {
    id: "a3333333-3333-4333-8333-333333333333",
    sourceAccountName: "HBL Main Operating Account",
    sourceAccountNumber: "**** 2343",
    destinationAccountName: "UBL Petty Cash Account",
    destinationAccountNumber: "**** 4590",
    clearingAccountName: "General Clearing Account",
    clearingAccountCode: "1060",
    amount: 50000,
    transferDate: "2026-08-20",
    memo: "Transfer entered with incorrect amount",
    sourceTransactionId: "63333333-3333-4333-8333-333333333333",
    destinationTransactionId: "73333333-3333-4333-8333-333333333333",
    status: "voided",
    voidedAt: "2026-08-20T13:45:00.000Z",
    voidReason: "Incorrect amount entered during transfer.",
    createdAt: "2026-08-20T12:40:00.000Z",
    createdBy: "Amna",
  },
  {
    id: "a4444444-4444-4444-8444-444444444444",
    sourceAccountName: "Meezan Business Account",
    sourceAccountNumber: "**** 7812",
    destinationAccountName: "HBL Main Operating Account",
    destinationAccountNumber: "**** 2343",
    clearingAccountName: "Bank Transfer Clearing",
    clearingAccountCode: "1050",
    amount: 125000,
    transferDate: "2026-08-18",
    memo: "Balance consolidation",
    sourceTransactionId: "64444444-4444-4444-8444-444444444444",
    destinationTransactionId: "74444444-4444-4444-8444-444444444444",
    status: "posted",
    voidedAt: null,
    voidReason: null,
    createdAt: "2026-08-18T15:20:00.000Z",
    createdBy: "Amna",
  },
];

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

export default async function TransferDetailsPage({
  params,
}: TransferDetailsPageProps) {
  const { id } = await params;

  const transfer =
    transferRecords.find((record) => record.id === id) ?? transferRecords[0];

  const isVoided = transfer.status === "voided";

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section
          className="
            flex flex-col justify-between gap-5
            sm:flex-row sm:items-start
          "
        >
          <div className="flex items-start gap-4">
            <Link
              href="/bank/transfers"
              aria-label="Return to transfers"
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
              <ArrowRightLeft className="size-4" />
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Transfer details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {formatCurrency(transfer.amount)}
                </h1>

                <TransferStatusBadge status={transfer.status} />
              </div>

              <p className="mt-2 text-sm text-muted">
                Transfer ID: {transfer.id}
              </p>
            </div>
          </div>

          <VoidTransferButton transferId={transfer.id} disabled={isVoided} />
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Transfer amount"
            value={formatCurrency(transfer.amount)}
            helper="Total funds transferred"
            icon={CircleDollarSign}
          />

          <InfoCard
            title="Transfer date"
            value={formatDate(transfer.transferDate)}
            helper="Effective transfer date"
            icon={CalendarDays}
          />

          <InfoCard
            title="Current status"
            value={transfer.status === "posted" ? "Posted" : "Voided"}
            helper={
              isVoided
                ? "Transfer has been reversed"
                : "Transfer completed successfully"
            }
            icon={ArrowRightLeft}
          />
        </section>

        <section
          className="
            mt-6 rounded-2xl border border-border
            bg-white p-5 shadow-[var(--shadow-sm)]
            sm:p-6
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                flex size-10 items-center justify-center
                rounded-xl bg-primary-light text-primary
              "
            >
              <Landmark className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">Account movement</h2>

              <p className="mt-1 text-xs text-muted">
                Source and destination bank account information.
              </p>
            </div>
          </div>

          <div
            className="
              mt-6 grid gap-4
              md:grid-cols-[1fr_auto_1fr]
              md:items-center
            "
          >
            <AccountCard
              label="Money transferred from"
              accountName={transfer.sourceAccountName}
              accountNumber={transfer.sourceAccountNumber}
              icon={ArrowUpRight}
              colorClass="
                bg-orange-50 text-orange-700
              "
            />

            <span
              className="
                mx-auto flex size-10 items-center
                justify-center rounded-full
                border border-border bg-white
                text-muted
              "
            >
              <ArrowRightLeft className="size-4" />
            </span>

            <AccountCard
              label="Money transferred to"
              accountName={transfer.destinationAccountName}
              accountNumber={transfer.destinationAccountNumber}
              icon={ArrowDownLeft}
              colorClass="
                bg-emerald-50 text-emerald-700
              "
            />
          </div>
        </section>

        <div
          className="
            mt-6 grid items-start gap-6
            lg:grid-cols-[minmax(0,1fr)_360px]
          "
        >
          <section
            className="
              rounded-2xl border border-border
              bg-white p-5
              shadow-[var(--shadow-sm)] sm:p-6
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  flex size-10 items-center
                  justify-center rounded-xl
                  bg-primary-light text-primary
                "
              >
                <FileText className="size-4" />
              </span>

              <div>
                <h2 className="font-bold">Transfer information</h2>

                <p className="mt-1 text-xs text-muted">
                  General information for this transfer.
                </p>
              </div>
            </div>

            <dl className="mt-6 divide-y divide-border">
              <DetailsRow
                label="Amount"
                value={formatCurrency(transfer.amount)}
              />

              <DetailsRow
                label="Transfer date"
                value={formatDate(transfer.transferDate)}
              />

              <DetailsRow
                label="Memo"
                value={transfer.memo || "No memo provided"}
              />

              <DetailsRow
                label="Clearing account"
                value={`${transfer.clearingAccountCode} — ${transfer.clearingAccountName}`}
              />

              <DetailsRow label="Created by" value={transfer.createdBy} />

              <DetailsRow
                label="Created at"
                value={formatDateTime(transfer.createdAt)}
              />
            </dl>
          </section>

          <aside
            className="
              rounded-2xl border border-border
              bg-white p-5
              shadow-[var(--shadow-sm)]
            "
          >
            <h2 className="font-bold">Transaction references</h2>

            <p className="mt-1 text-xs text-muted">
              Ledger transactions created for both sides.
            </p>

            <div className="mt-5 space-y-4">
              <ReferenceCard
                label="Source transaction"
                value={transfer.sourceTransactionId}
              />

              <ReferenceCard
                label="Destination transaction"
                value={transfer.destinationTransactionId}
              />
            </div>
          </aside>
        </div>

        {isVoided && (
          <section
            className="
              mt-6 rounded-2xl border border-red-200
              bg-red-50 p-5
            "
          >
            <h2 className="font-bold text-red-700">Void information</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-red-600">
                  Void reason
                </p>

                <p className="mt-1 text-sm text-red-800">
                  {transfer.voidReason}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-red-600">Voided at</p>

                <p className="mt-1 text-sm text-red-800">
                  {transfer.voidedAt
                    ? formatDateTime(transfer.voidedAt)
                    : "Not available"}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}

function TransferStatusBadge({ status }: { status: TransferStatus }) {
  const className =
    status === "posted"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-red-50 text-red-700";

  return (
    <span
      className={`
        inline-flex rounded-full px-2.5 py-1
        text-[10px] font-semibold capitalize
        ${className}
      `}
    >
      {status}
    </span>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  helper: string;
  icon: React.ElementType;
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

interface AccountCardProps {
  label: string;
  accountName: string;
  accountNumber: string;
  icon: React.ElementType;
  colorClass: string;
}

function AccountCard({
  label,
  accountName,
  accountNumber,
  icon: Icon,
  colorClass,
}: AccountCardProps) {
  return (
    <article
      className="
        flex items-center gap-4 rounded-2xl
        border border-border p-5
      "
    >
      <span
        className={`
          flex size-11 shrink-0 items-center
          justify-center rounded-xl
          ${colorClass}
        `}
      >
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>

        <p className="mt-1 truncate font-bold">{accountName}</p>

        <p className="mt-1 text-xs text-muted">{accountNumber}</p>
      </div>
    </article>
  );
}

function DetailsRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        grid gap-2 py-4 text-sm
        sm:grid-cols-[180px_minmax(0,1fr)]
      "
    >
      <dt className="font-medium text-muted">{label}</dt>

      <dd className="break-words font-medium">{value}</dd>
    </div>
  );
}

function ReferenceCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        rounded-xl border border-border
        bg-surface-secondary p-4
      "
    >
      <p className="text-xs font-semibold text-muted">{label}</p>

      <p className="mt-2 break-all text-xs font-medium">{value}</p>
    </div>
  );
}
