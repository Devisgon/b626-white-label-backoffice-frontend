"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Ban, Eye, Plus, RotateCcw, Send } from "lucide-react";

import type {
  BankTransaction,
  TransactionDirection,
  TransactionStatus,
} from "@/features/banking/types";

interface TransactionListItem extends BankTransaction {
  bankAccountName: string;
  payeeName: string;
  referenceNumber?: string | null;
  memo?: string | null;
}

const initialTransactions: TransactionListItem[] = [
  {
    id: "4f39e6ab-a8d3-4ab9-9000-100000000001",
    transactionType: "deposit",
    direction: "inflow",
    transactionDate: "2026-08-21",
    bankAccountId: "1f83751c-54b1-4d50-85cd-100000000001",
    bankAccountName: "HBL Main Operating",
    payeeId: null,
    payeeName: "Store sales",
    referenceNumber: "DEP-2026-0081",
    memo: "Daily store sales deposit",
    amount: 284650,
    status: "posted",
    postedAt: "2026-08-21T11:30:00.000Z",
    createdAt: "2026-08-21T10:45:00.000Z",
  },
  {
    id: "4f39e6ab-a8d3-4ab9-9000-100000000002",
    transactionType: "payment",
    direction: "outflow",
    transactionDate: "2026-08-20",
    bankAccountId: "1f83751c-54b1-4d50-85cd-100000000001",
    bankAccountName: "HBL Main Operating",
    payeeId: "3e28d5fa-97c2-4fa9-8000-100000000002",
    payeeName: "Nestle Pakistan",
    referenceNumber: "INV-1029",
    memo: "Supplier invoice payment",
    amount: 125000,
    status: "posted",
    postedAt: "2026-08-20T15:30:00.000Z",
    createdAt: "2026-08-20T14:00:00.000Z",
  },
  {
    id: "4f39e6ab-a8d3-4ab9-9000-100000000003",
    transactionType: "payment",
    direction: "outflow",
    transactionDate: "2026-08-20",
    bankAccountId: "1f83751c-54b1-4d50-85cd-100000000001",
    bankAccountName: "HBL Main Operating",
    payeeId: "3e28d5fa-97c2-4fa9-8000-100000000003",
    payeeName: "Lahore Electric Supply Company",
    referenceNumber: "LESCO-AUG-26",
    memo: "August electricity bill",
    amount: 48500,
    status: "draft",
    createdAt: "2026-08-20T13:00:00.000Z",
  },
  {
    id: "4f39e6ab-a8d3-4ab9-9000-100000000004",
    transactionType: "adjustment",
    direction: "inflow",
    transactionDate: "2026-08-19",
    bankAccountId: "1f83751c-54b1-4d50-85cd-100000000003",
    bankAccountName: "Petty Cash",
    payeeId: null,
    payeeName: "Internal adjustment",
    referenceNumber: "ADJ-0042",
    memo: "Petty cash balance correction",
    amount: 7500,
    status: "voided",
    voidedAt: "2026-08-19T16:30:00.000Z",
    createdAt: "2026-08-19T14:45:00.000Z",
  },
];

const bankAccounts = [
  {
    id: "1f83751c-54b1-4d50-85cd-100000000001",
    name: "HBL Main Operating",
  },
  {
    id: "1f83751c-54b1-4d50-85cd-100000000002",
    name: "Meezan Business Savings",
  },
  {
    id: "1f83751c-54b1-4d50-85cd-100000000003",
    name: "Petty Cash",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function TransactionsList() {
  const [transactions, setTransactions] = useState(initialTransactions);

  const [status, setStatus] = useState<TransactionStatus | "all">("all");

  const [direction, setDirection] = useState<TransactionDirection | "all">(
    "all",
  );

  const [bankAccountId, setBankAccountId] = useState("all");

  const [dateFrom, setDateFrom] = useState("");

  const [dateTo, setDateTo] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesStatus = status === "all" || transaction.status === status;

      const matchesDirection =
        direction === "all" || transaction.direction === direction;

      const matchesBankAccount =
        bankAccountId === "all" || transaction.bankAccountId === bankAccountId;

      const matchesDateFrom =
        !dateFrom || transaction.transactionDate >= dateFrom;

      const matchesDateTo = !dateTo || transaction.transactionDate <= dateTo;

      return (
        matchesStatus &&
        matchesDirection &&
        matchesBankAccount &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [transactions, status, direction, bankAccountId, dateFrom, dateTo]);

  const postedTotal = transactions
    .filter((transaction) => transaction.status === "posted")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const draftCount = transactions.filter(
    (transaction) => transaction.status === "draft",
  ).length;

  function resetFilters() {
    setStatus("all");
    setDirection("all");
    setBankAccountId("all");
    setDateFrom("");
    setDateTo("");
  }

  function postTransaction(transactionId: string) {
    const confirmed = window.confirm(
      "Post this draft transaction? Posted transactions become immutable.",
    );

    if (!confirmed) {
      return;
    }

    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              status: "posted",
              postedAt: new Date().toISOString(),
            }
          : transaction,
      ),
    );
  }

  function voidTransaction(transactionId: string) {
    const reason = window.prompt(
      "Enter the reason for voiding this transaction:",
    );

    if (!reason?.trim()) {
      return;
    }

    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              status: "voided",
              voidedAt: new Date().toISOString(),
            }
          : transaction,
      ),
    );
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total transactions"
          value={transactions.length.toString()}
          helper="All transaction records"
        />

        <SummaryCard
          label="Posted value"
          value={formatCurrency(postedTotal)}
          helper="Across posted transactions"
        />

        <SummaryCard
          label="Draft transactions"
          value={draftCount.toString()}
          helper="Waiting to be posted"
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
            <h2 className="font-bold">Transactions</h2>

            <p className="mt-1 text-xs text-muted">
              Manage deposits, payments and adjustments.
            </p>
          </div>

          <Link
            href="/bank/transactions/new"
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-4 text-sm font-semibold
              text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add transaction
          </Link>
        </div>

        <div
          className="
            grid gap-3 border-b border-border
            p-4 md:grid-cols-2
            xl:grid-cols-[1fr_1fr_1.2fr_1fr_1fr_auto]
          "
        >
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as TransactionStatus | "all")
            }
            aria-label="Filter by status"
            className={filterClass}
          >
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="posted">Posted</option>
            <option value="voided">Voided</option>
          </select>

          <select
            value={direction}
            onChange={(event) =>
              setDirection(event.target.value as TransactionDirection | "all")
            }
            aria-label="Filter by direction"
            className={filterClass}
          >
            <option value="all">All directions</option>
            <option value="inflow">Inflow</option>
            <option value="outflow">Outflow</option>
          </select>

          <select
            value={bankAccountId}
            onChange={(event) => setBankAccountId(event.target.value)}
            aria-label="Filter by bank account"
            className={filterClass}
          >
            <option value="all">All bank accounts</option>

            {bankAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>

          <div>
            <label
              htmlFor="dateFrom"
              className="
      mb-1.5 block text-[10px] font-bold
      uppercase tracking-wider text-muted
    "
            >
              From date
            </label>

            <input
              id="dateFrom"
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              className={filterClass}
            />
          </div>

          <div>
            <label
              htmlFor="dateTo"
              className="
      mb-1.5 block text-[10px] font-bold
      uppercase tracking-wider text-muted
    "
            >
              To date
            </label>

            <input
              id="dateTo"
              type="date"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(event) => setDateTo(event.target.value)}
              className={filterClass}
            />
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary-light px-4 text-sm
              font-semibold text-primary
              transition hover:bg-primary
              hover:text-white
            "
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-surface-secondary">
              <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="px-5 py-4">Transaction</th>

                <th className="px-5 py-4">Date</th>

                <th className="px-5 py-4">Account</th>

                <th className="px-5 py-4">Payee</th>

                <th className="px-5 py-4">Direction</th>

                <th className="px-5 py-4">Amount</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="
                      text-sm transition
                      hover:bg-surface-secondary/60
                    "
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {formatLabel(transaction.transactionType)}
                    </p>

                    <p className="mt-1 text-[11px] text-muted">
                      {transaction.referenceNumber || "No reference"}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {transaction.transactionDate}
                  </td>

                  <td className="px-5 py-4">{transaction.bankAccountName}</td>

                  <td className="px-5 py-4 text-muted">
                    {transaction.payeeName}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`
                          inline-flex rounded-full
                          px-2.5 py-1 text-[10px]
                          font-semibold
                          ${
                            transaction.direction === "inflow"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-orange-50 text-orange-700"
                          }
                        `}
                    >
                      {formatLabel(transaction.direction)}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-bold">
                    {formatCurrency(transaction.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={transaction.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/bank/transactions/${transaction.id}`}
                        aria-label="View transaction"
                        title="View transaction"
                        className={actionClass}
                      >
                        <Eye className="size-4" />
                      </Link>

                      {transaction.status === "draft" && (
                        <button
                          type="button"
                          onClick={() => postTransaction(transaction.id)}
                          aria-label="Post transaction"
                          title="Post transaction"
                          className={actionClass}
                        >
                          <Send className="size-4" />
                        </button>
                      )}

                      {transaction.status !== "voided" && (
                        <button
                          type="button"
                          onClick={() => voidTransaction(transaction.id)}
                          aria-label="Void transaction"
                          title="Void transaction"
                          className={`
                              ${actionClass}
                              hover:border-red-200
                              hover:bg-red-50
                              hover:text-red-600
                            `}
                        >
                          <Ban className="size-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="px-5 py-14 text-center">
            <p className="font-semibold">No transactions found</p>

            <p className="mt-1 text-xs text-muted">
              Try changing or resetting the filters.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border px-5 py-4 text-xs text-muted">
          <span>
            Showing {filteredTransactions.length} of {transactions.length}{" "}
            transactions
          </span>

          <span>Page 1 of 1</span>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <p className="text-xs text-muted">{label}</p>

      <p className="mt-2 text-2xl font-bold">{value}</p>

      <p className="mt-1 text-[11px] text-muted">{helper}</p>
    </article>
  );
}

function StatusBadge({ status }: { status: TransactionStatus }) {
  const statusClass = {
    draft: "bg-amber-50 text-amber-700",
    posted: "bg-emerald-50 text-emerald-700",
    voided: "bg-slate-100 text-slate-600",
  }[status];

  return (
    <span
      className={`
        inline-flex rounded-full px-2.5 py-1
        text-[10px] font-semibold
        ${statusClass}
      `}
    >
      {formatLabel(status)}
    </span>
  );
}

const filterClass = `
  h-11 rounded-xl border border-border
  bg-white px-4 text-sm text-black
  outline-none transition
  focus:border-primary
  focus:ring-4 focus:ring-primary/10
`;

const actionClass = `
  flex size-9 items-center justify-center
  rounded-lg border border-border
  text-muted transition
  hover:border-primary hover:bg-primary-light
  hover:text-primary
`;
