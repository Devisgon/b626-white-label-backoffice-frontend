import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  ReceiptText,
  UserRound,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  TransactionActions,
} from "@/features/banking/components";
import type {
  TransactionDirection,
  TransactionLineType,
  TransactionStatus,
  TransactionType,
} from "@/features/banking/types";

interface TransactionDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface TransactionLedgerLine {
  id: string;
  accountCode: string;
  accountName: string;
  lineType: TransactionLineType;
  amount: number;
  description: string;
}

interface TransactionDetails {
  transactionType: TransactionType;
  direction: TransactionDirection;
  transactionDate: string;
  bankAccountName: string;
  bankAccountLastFour: string;
  payeeName: string;
  referenceNumber: string;
  memo: string;
  amount: number;
  status: TransactionStatus;
  postedAt?: string;
  voidedAt?: string;
  createdAt: string;
  lines: TransactionLedgerLine[];
}

const transactions: Record<
  string,
  TransactionDetails
> = {
  "4f39e6ab-a8d3-4ab9-9000-100000000001": {
    transactionType: "deposit",
    direction: "inflow",
    transactionDate: "21 Aug 2026",
    bankAccountName: "HBL Main Operating",
    bankAccountLastFour: "2343",
    payeeName: "Store sales",
    referenceNumber: "DEP-2026-0081",
    memo: "Daily store sales deposit",
    amount: 284650,
    status: "posted",
    postedAt: "21 Aug 2026, 11:30",
    createdAt: "21 Aug 2026, 10:45",
    lines: [
      {
        id: "line-001",
        accountCode: "1000",
        accountName: "Assets",
        lineType: "debit",
        amount: 284650,
        description:
          "Deposit into operating bank account",
      },
      {
        id: "line-002",
        accountCode: "4000",
        accountName: "Sales Revenue",
        lineType: "credit",
        amount: 284650,
        description:
          "Revenue from daily store sales",
      },
    ],
  },

  "4f39e6ab-a8d3-4ab9-9000-100000000002": {
    transactionType: "payment",
    direction: "outflow",
    transactionDate: "20 Aug 2026",
    bankAccountName: "HBL Main Operating",
    bankAccountLastFour: "2343",
    payeeName: "Nestle Pakistan",
    referenceNumber: "INV-1029",
    memo: "Supplier invoice payment",
    amount: 125000,
    status: "posted",
    postedAt: "20 Aug 2026, 15:30",
    createdAt: "20 Aug 2026, 14:00",
    lines: [
      {
        id: "line-003",
        accountCode: "5010",
        accountName: "Inventory Expense",
        lineType: "debit",
        amount: 125000,
        description:
          "Nestle supplier invoice",
      },
      {
        id: "line-004",
        accountCode: "1000",
        accountName: "Assets",
        lineType: "credit",
        amount: 125000,
        description:
          "Payment from operating account",
      },
    ],
  },

  "4f39e6ab-a8d3-4ab9-9000-100000000003": {
    transactionType: "payment",
    direction: "outflow",
    transactionDate: "20 Aug 2026",
    bankAccountName: "HBL Main Operating",
    bankAccountLastFour: "2343",
    payeeName:
      "Lahore Electric Supply Company",
    referenceNumber: "LESCO-AUG-26",
    memo: "August electricity bill",
    amount: 48500,
    status: "draft",
    createdAt: "20 Aug 2026, 13:00",
    lines: [
      {
        id: "line-005",
        accountCode: "5010",
        accountName: "Utilities Expense",
        lineType: "debit",
        amount: 48500,
        description:
          "August electricity expense",
      },
      {
        id: "line-006",
        accountCode: "1000",
        accountName: "Assets",
        lineType: "credit",
        amount: 48500,
        description:
          "Payment from operating account",
      },
    ],
  },

  "4f39e6ab-a8d3-4ab9-9000-100000000004": {
    transactionType: "adjustment",
    direction: "inflow",
    transactionDate: "19 Aug 2026",
    bankAccountName: "Petty Cash",
    bankAccountLastFour: "0001",
    payeeName: "Internal adjustment",
    referenceNumber: "ADJ-0042",
    memo: "Petty cash balance correction",
    amount: 7500,
    status: "voided",
    voidedAt: "19 Aug 2026, 16:30",
    createdAt: "19 Aug 2026, 14:45",
    lines: [
      {
        id: "line-007",
        accountCode: "1000",
        accountName: "Assets",
        lineType: "debit",
        amount: 7500,
        description:
          "Petty cash adjustment",
      },
      {
        id: "line-008",
        accountCode: "3000",
        accountName: "Owner Equity",
        lineType: "credit",
        amount: 7500,
        description:
          "Balance correction",
      },
    ],
  },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatLabel(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

export default async function TransactionDetailsPage({
  params,
}: TransactionDetailsPageProps) {
  const { id } = await params;
  const transaction = transactions[id];

  if (!transaction) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-[var(--shadow-sm)]">
            <h1 className="text-xl font-bold">
              Transaction not found
            </h1>

            <p className="mt-2 text-sm text-muted">
              The requested transaction does not
              exist.
            </p>

            <Link
              href="/bank/transactions"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-5 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to transactions
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const totalDebits = transaction.lines
    .filter(
      (line) =>
        line.lineType === "debit",
    )
    .reduce(
      (total, line) =>
        total + line.amount,
      0,
    );

  const totalCredits = transaction.lines
    .filter(
      (line) =>
        line.lineType === "credit",
    )
    .reduce(
      (total, line) =>
        total + line.amount,
      0,
    );

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section
          className="
            flex flex-col justify-between gap-5
            lg:flex-row lg:items-start
          "
        >
          <div className="flex items-start gap-4">
            <Link
              href="/bank/transactions"
              aria-label="Return to transactions"
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
              <ReceiptText className="size-4" />
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Transaction details
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {transaction.referenceNumber}
              </h1>

              <p className="mt-2 text-sm text-muted">
                Transaction ID: {id}
              </p>
            </div>
          </div>

          <TransactionActions
            transactionId={id}
            initialStatus={transaction.status}
          />
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard
            title="Transaction"
            value={formatLabel(
              transaction.transactionType,
            )}
            helper={formatLabel(
              transaction.direction,
            )}
            icon={ReceiptText}
          />

          <InfoCard
            title="Amount"
            value={formatCurrency(
              transaction.amount,
            )}
            helper="Transaction total"
            icon={CreditCard}
          />

          <InfoCard
            title="Payee"
            value={transaction.payeeName}
            helper={
              transaction.bankAccountName
            }
            icon={UserRound}
          />

          <InfoCard
            title="Transaction date"
            value={transaction.transactionDate}
            helper={`Created ${transaction.createdAt}`}
            icon={CalendarDays}
          />
        </section>

        <section
          className="
            mt-6 rounded-2xl border border-border
            bg-white p-5 shadow-[var(--shadow-sm)]
            sm:p-6
          "
        >
          <h2 className="font-bold">
            Transaction information
          </h2>

          <dl className="mt-5 divide-y divide-border">
            <DetailsRow
              label="Transaction type"
              value={formatLabel(
                transaction.transactionType,
              )}
            />

            <DetailsRow
              label="Direction"
              value={formatLabel(
                transaction.direction,
              )}
            />

            <DetailsRow
              label="Bank account"
              value={`${transaction.bankAccountName} •••• ${transaction.bankAccountLastFour}`}
            />

            <DetailsRow
              label="Payee"
              value={transaction.payeeName}
            />

            <DetailsRow
              label="Reference number"
              value={transaction.referenceNumber}
            />

            <DetailsRow
              label="Memo"
              value={
                transaction.memo ||
                "Not provided"
              }
            />

            <DetailsRow
              label="Posted at"
              value={
                transaction.postedAt ||
                "Not posted"
              }
            />

            <DetailsRow
              label="Voided at"
              value={
                transaction.voidedAt ||
                "Not voided"
              }
            />
          </dl>
        </section>

        <section
          className="
            mt-6 overflow-hidden rounded-2xl
            border border-border bg-white
            shadow-[var(--shadow-sm)]
          "
        >
          <div className="border-b border-border p-5">
            <h2 className="font-bold">
              Ledger entries
            </h2>

            <p className="mt-1 text-xs text-muted">
              Debit and credit entries for this
              transaction.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-surface-secondary">
                <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  <th className="px-5 py-4">
                    Account
                  </th>

                  <th className="px-5 py-4">
                    Description
                  </th>

                  <th className="px-5 py-4">
                    Type
                  </th>

                  <th className="px-5 py-4 text-right">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {transaction.lines.map((line) => (
                  <tr
                    key={line.id}
                    className="text-sm"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold">
                        {line.accountName}
                      </p>

                      <p className="mt-1 text-xs text-muted">
                        {line.accountCode}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-muted">
                      {line.description}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`
                          inline-flex rounded-full
                          px-2.5 py-1 text-[10px]
                          font-semibold
                          ${
                            line.lineType === "debit"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-purple-50 text-purple-700"
                          }
                        `}
                      >
                        {formatLabel(
                          line.lineType,
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right font-bold">
                      {formatCurrency(line.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot className="border-t border-border bg-surface-secondary">
                <tr className="text-sm font-bold">
                  <td
                    colSpan={2}
                    className="px-5 py-4"
                  >
                    Ledger totals
                  </td>

                  <td className="px-5 py-4">
                    Debit:{" "}
                    {formatCurrency(totalDebits)}
                  </td>

                  <td className="px-5 py-4 text-right">
                    Credit:{" "}
                    {formatCurrency(totalCredits)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  helper: string;
  icon: React.ElementType;
}

function InfoCard({
  title,
  value,
  helper,
  icon: Icon,
}: InfoCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 truncate font-bold">
          {value}
        </p>

        <p className="mt-1 truncate text-[11px] text-muted">
          {helper}
        </p>
      </div>
    </article>
  );
}

function DetailsRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-2 py-4 text-sm sm:grid-cols-[180px_minmax(0,1fr)]">
      <dt className="font-medium text-muted">
        {label}
      </dt>

      <dd className="font-medium text-foreground">
        {value}
      </dd>
    </div>
  );
}