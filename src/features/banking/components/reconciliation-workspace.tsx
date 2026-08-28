"use client";

import { useMemo, useState } from "react";
import { Check, CheckCircle2, Link2, RotateCcw, Unlink } from "lucide-react";

import type { ReconciliationStatus } from "@/features/banking/types";

interface ReconciliationTransaction {
  id: string;
  transactionType: string;
  referenceNumber: string;
  transactionDate: string;
  payee: string;
  direction: "inflow" | "outflow";
  amount: number;
  statementReference: string;
}

interface ReconciliationWorkspaceProps {
  reconciliationId: string;
  status: ReconciliationStatus;
  openingSystemBalance: number;
  statementEndingBalance: number;
}

const initialMatchedTransactions: ReconciliationTransaction[] = [
  {
    id: "c1111111-1111-4111-8111-111111111111",
    transactionType: "Deposit",
    referenceNumber: "DEP-2026-0081",
    transactionDate: "2026-08-05",
    payee: "Store sales",
    direction: "inflow",
    amount: 300000,
    statementReference: "STMT-4521",
  },
  {
    id: "c2222222-2222-4222-8222-222222222222",
    transactionType: "Payment",
    referenceNumber: "PAY-2026-0042",
    transactionDate: "2026-08-12",
    payee: "Nestle Pakistan",
    direction: "outflow",
    amount: 35000,
    statementReference: "STMT-4536",
  },
  {
    id: "c3333333-3333-4333-8333-333333333333",
    transactionType: "Payment",
    referenceNumber: "PAY-2026-0048",
    transactionDate: "2026-08-18",
    payee: "Electricity utility",
    direction: "outflow",
    amount: 15000,
    statementReference: "STMT-4550",
  },
];

const initialUnmatchedTransactions: ReconciliationTransaction[] = [
  {
    id: "c4444444-4444-4444-8444-444444444444",
    transactionType: "Deposit",
    referenceNumber: "DEP-2026-0090",
    transactionDate: "2026-08-22",
    payee: "Store sales",
    direction: "inflow",
    amount: 125000,
    statementReference: "",
  },
  {
    id: "c5555555-5555-4555-8555-555555555555",
    transactionType: "Payment",
    referenceNumber: "PAY-2026-0051",
    transactionDate: "2026-08-23",
    payee: "Office supplies",
    direction: "outflow",
    amount: 125000,
    statementReference: "",
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

export function ReconciliationWorkspace({
  reconciliationId,
  status,
  openingSystemBalance,
  statementEndingBalance,
}: ReconciliationWorkspaceProps) {
  const [matchedTransactions, setMatchedTransactions] = useState(
    initialMatchedTransactions,
  );

  const [unmatchedTransactions, setUnmatchedTransactions] = useState(
    initialUnmatchedTransactions,
  );

  const [isCompleting, setIsCompleting] = useState(false);

  const [isCompleted, setIsCompleted] = useState(status === "completed");

  const isEditable = status === "in_progress" && !isCompleted;

  const calculatedSystemBalance = useMemo(
    () =>
      matchedTransactions.reduce((balance, transaction) => {
        if (transaction.direction === "inflow") {
          return balance + transaction.amount;
        }

        return balance - transaction.amount;
      }, openingSystemBalance),
    [matchedTransactions, openingSystemBalance],
  );

  const difference = statementEndingBalance - calculatedSystemBalance;

  const isBalanced = Math.abs(difference) < 0.01;

  function handleMatch(transaction: ReconciliationTransaction) {
    if (!isEditable) {
      return;
    }

    /*
     * Backend integration par:
     *
     * await matchReconciliationLine(
     *   reconciliationId,
     *   {
     *     transactionId: transaction.id,
     *     cleared: true,
     *     statementReference:
     *       transaction.statementReference ||
     *       undefined,
     *   },
     * );
     */

    setUnmatchedTransactions((current) =>
      current.filter((item) => item.id !== transaction.id),
    );

    setMatchedTransactions((current) => [...current, transaction]);

    console.log({
      reconciliationId,
      action: "match",
      transactionId: transaction.id,
    });
  }

  function handleUnmatch(transaction: ReconciliationTransaction) {
    if (!isEditable) {
      return;
    }

    /*
     * Backend integration par:
     *
     * await unmatchReconciliationLine(
     *   reconciliationId,
     *   transaction.id,
     * );
     */

    setMatchedTransactions((current) =>
      current.filter((item) => item.id !== transaction.id),
    );

    setUnmatchedTransactions((current) => [...current, transaction]);

    console.log({
      reconciliationId,
      action: "unmatch",
      transactionId: transaction.id,
    });
  }

  function updateStatementReference(transactionId: string, value: string) {
    setUnmatchedTransactions((current) =>
      current.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              statementReference: value,
            }
          : transaction,
      ),
    );
  }

  async function handleComplete() {
    if (!isEditable || !isBalanced) {
      return;
    }

    setIsCompleting(true);

    try {
      /*
       * Backend integration par:
       *
       * await completeReconciliation(
       *   reconciliationId,
       * );
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 700);
      });

      setIsCompleted(true);

      window.alert("Reconciliation completed successfully.");
    } finally {
      setIsCompleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <section
        className="
          grid gap-4 sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <BalanceCard
          title="Statement balance"
          value={formatCurrency(statementEndingBalance)}
          helper="Bank statement closing balance"
        />

        <BalanceCard
          title="System balance"
          value={formatCurrency(calculatedSystemBalance)}
          helper="Based on matched transactions"
        />

        <BalanceCard
          title="Difference"
          value={formatCurrency(difference)}
          helper={
            isBalanced ? "Balances are matched" : "Further matching is required"
          }
          valueClass={isBalanced ? "text-success" : "text-danger"}
        />

        <BalanceCard
          title="Matched transactions"
          value={String(matchedTransactions.length)}
          helper={`${unmatchedTransactions.length} transactions unmatched`}
        />
      </section>

      <section
        className={`
          rounded-2xl border p-5
          ${
            isBalanced
              ? "border-emerald-200 bg-emerald-50"
              : "border-orange-200 bg-orange-50"
          }
        `}
      >
        <div
          className="
            flex flex-col justify-between gap-4
            sm:flex-row sm:items-center
          "
        >
          <div className="flex items-start gap-3">
            <span
              className={`
                flex size-10 shrink-0 items-center
                justify-center rounded-xl
                ${
                  isBalanced
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-orange-100 text-orange-700"
                }
              `}
            >
              {isBalanced ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <RotateCcw className="size-5" />
              )}
            </span>

            <div>
              <h2 className="font-bold">
                {isCompleted
                  ? "Reconciliation completed"
                  : isBalanced
                    ? "Ready to complete"
                    : "Reconciliation in progress"}
              </h2>

              <p className="mt-1 text-xs leading-5 text-muted">
                {isCompleted
                  ? "This reconciliation is locked and can no longer be changed."
                  : isBalanced
                    ? "The system and statement balances match."
                    : "Match or unmatch transactions until the difference is zero."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleComplete}
            disabled={!isEditable || !isBalanced || isCompleting}
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-5 text-sm font-semibold
              text-white transition
              hover:bg-primary-hover
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Check className="size-4" />

            {isCompleted
              ? "Completed"
              : isCompleting
                ? "Completing..."
                : "Complete reconciliation"}
          </button>
        </div>
      </section>

      <TransactionSection
        title="Matched transactions"
        description="Transactions cleared against this bank statement."
        transactions={matchedTransactions}
        emptyMessage="No transactions have been matched."
        actionLabel="Unmatch"
        actionIcon={Unlink}
        actionDisabled={!isEditable}
        onAction={handleUnmatch}
      />

      <section
        className="
          overflow-hidden rounded-2xl
          border border-border bg-white
          shadow-[var(--shadow-sm)]
        "
      >
        <div className="border-b border-border p-5">
          <h2 className="font-bold">Unmatched transactions</h2>

          <p className="mt-1 text-xs text-muted">
            Posted transactions available for this bank statement.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">Transaction</th>

                <th className="px-5 py-4">Date</th>

                <th className="px-5 py-4">Payee</th>

                <th className="px-5 py-4">Amount</th>

                <th className="px-5 py-4">Statement reference</th>

                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {unmatchedTransactions.map((transaction) => (
                <tr key={transaction.id} className="text-sm">
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {transaction.transactionType}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      {transaction.referenceNumber}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {formatDate(transaction.transactionDate)}
                  </td>

                  <td className="px-5 py-4">{transaction.payee}</td>

                  <td
                    className={`
                        px-5 py-4 font-bold
                        ${
                          transaction.direction === "inflow"
                            ? "text-success"
                            : "text-foreground"
                        }
                      `}
                  >
                    {transaction.direction === "inflow" ? "+" : "−"}{" "}
                    {formatCurrency(transaction.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <input
                      type="text"
                      value={transaction.statementReference}
                      onChange={(event) =>
                        updateStatementReference(
                          transaction.id,
                          event.target.value,
                        )
                      }
                      disabled={!isEditable}
                      placeholder="Optional reference"
                      className="
                          h-9 w-full rounded-lg border
                          border-border bg-white px-3
                          text-xs outline-none transition
                          focus:border-primary
                          focus:ring-4
                          focus:ring-primary/10
                          disabled:bg-surface-secondary
                        "
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleMatch(transaction)}
                        disabled={!isEditable}
                        className="
                            inline-flex h-9 items-center
                            justify-center gap-2
                            rounded-lg border
                            border-border bg-white px-3
                            text-xs font-semibold
                            text-muted transition
                            hover:border-primary
                            hover:bg-primary
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                      >
                        <Link2 className="size-3.5" />
                        Match
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {unmatchedTransactions.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="font-semibold">All transactions are matched</p>

            <p className="mt-1 text-xs text-muted">
              There are no unmatched transactions remaining.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

interface BalanceCardProps {
  title: string;
  value: string;
  helper: string;
  valueClass?: string;
}

function BalanceCard({
  title,
  value,
  helper,
  valueClass = "",
}: BalanceCardProps) {
  return (
    <article
      className="
        rounded-2xl border border-border
        bg-white p-5 shadow-[var(--shadow-sm)]
      "
    >
      <p className="text-xs text-muted">{title}</p>

      <p className={`mt-2 text-xl font-bold ${valueClass}`}>{value}</p>

      <p className="mt-1 text-[11px] text-muted">{helper}</p>
    </article>
  );
}

interface TransactionSectionProps {
  title: string;
  description: string;
  transactions: ReconciliationTransaction[];
  emptyMessage: string;
  actionLabel: string;
  actionIcon: React.ElementType;
  actionDisabled: boolean;
  onAction: (transaction: ReconciliationTransaction) => void;
}

function TransactionSection({
  title,
  description,
  transactions,
  emptyMessage,
  actionLabel,
  actionIcon: ActionIcon,
  actionDisabled,
  onAction,
}: TransactionSectionProps) {
  return (
    <section
      className="
        overflow-hidden rounded-2xl
        border border-border bg-white
        shadow-[var(--shadow-sm)]
      "
    >
      <div className="border-b border-border p-5">
        <h2 className="font-bold">{title}</h2>

        <p className="mt-1 text-xs text-muted">{description}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead className="bg-surface-secondary">
            <tr
              className="
                text-[11px] font-bold uppercase
                tracking-wider text-muted
              "
            >
              <th className="px-5 py-4">Transaction</th>

              <th className="px-5 py-4">Date</th>

              <th className="px-5 py-4">Payee</th>

              <th className="px-5 py-4">Statement reference</th>

              <th className="px-5 py-4">Amount</th>

              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="text-sm">
                <td className="px-5 py-4">
                  <p className="font-semibold">{transaction.transactionType}</p>

                  <p className="mt-1 text-xs text-muted">
                    {transaction.referenceNumber}
                  </p>
                </td>

                <td className="px-5 py-4 text-muted">
                  {formatDate(transaction.transactionDate)}
                </td>

                <td className="px-5 py-4">{transaction.payee}</td>

                <td className="px-5 py-4 text-muted">
                  {transaction.statementReference || "Not provided"}
                </td>

                <td className="px-5 py-4 font-bold">
                  {transaction.direction === "inflow" ? "+" : "−"}{" "}
                  {formatCurrency(transaction.amount)}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => onAction(transaction)}
                      disabled={actionDisabled}
                      className="
                        inline-flex h-9 items-center
                        justify-center gap-2
                        rounded-lg border
                        border-border bg-white px-3
                        text-xs font-semibold
                        text-muted transition
                        hover:border-primary
                        hover:bg-primary
                        hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <ActionIcon className="size-3.5" />
                      {actionLabel}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div className="px-5 py-12 text-center">
          <p className="font-semibold">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}
