import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CreditCard,
  Pencil,
  ReceiptText,
  WalletCards,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import type {
  BankAccountStatus,
  BankAccountType,
} from "@/features/banking/types";

interface BankAccountDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface StatementTransaction {
  id: string;
  description: string;
  date: string;
  direction: "inflow" | "outflow";
  amount: number;
  status: "posted" | "pending";
}

interface BankAccountDetails {
  accountName: string;
  institution: string;
  accountType: BankAccountType;
  lastFour: string;
  openingBalance: number;
  currentBalance: number;
  openingDate: string;
  status: BankAccountStatus;
  createdAt: string;
  updatedAt: string;
  transactions: StatementTransaction[];
}

const bankAccounts: Record<string, BankAccountDetails> = {
  "1f83751c-54b1-4d50-85cd-100000000001": {
    accountName: "Main Operating Account",
    institution: "HBL",
    accountType: "checking",
    lastFour: "2343",
    openingBalance: 1500000,
    currentBalance: 1850000,
    openingDate: "01 Jan 2026",
    status: "active",
    createdAt: "01 Jan 2026",
    updatedAt: "21 Aug 2026",
    transactions: [
      {
        id: "TXN-1001",
        description: "Daily sales deposit",
        date: "21 Aug 2026, 10:30",
        direction: "inflow",
        amount: 284650,
        status: "posted",
      },
      {
        id: "TXN-1002",
        description: "Supplier payment",
        date: "20 Aug 2026, 15:15",
        direction: "outflow",
        amount: 125000,
        status: "posted",
      },
      {
        id: "TXN-1003",
        description: "Utility payment",
        date: "19 Aug 2026, 13:00",
        direction: "outflow",
        amount: 28600,
        status: "pending",
      },
    ],
  },

  "1f83751c-54b1-4d50-85cd-100000000002": {
    accountName: "Business Savings",
    institution: "Meezan Bank",
    accountType: "savings",
    lastFour: "7812",
    openingBalance: 2000000,
    currentBalance: 2250000,
    openingDate: "15 Feb 2026",
    status: "active",
    createdAt: "15 Feb 2026",
    updatedAt: "20 Aug 2026",
    transactions: [
      {
        id: "TXN-2001",
        description: "Monthly savings transfer",
        date: "20 Aug 2026, 12:00",
        direction: "inflow",
        amount: 250000,
        status: "posted",
      },
    ],
  },

  "1f83751c-54b1-4d50-85cd-100000000003": {
    accountName: "Petty Cash Account",
    institution: "Cash",
    accountType: "cash",
    lastFour: "0001",
    openingBalance: 100000,
    currentBalance: 85600,
    openingDate: "01 Mar 2026",
    status: "active",
    createdAt: "01 Mar 2026",
    updatedAt: "20 Aug 2026",
    transactions: [],
  },

  "1f83751c-54b1-4d50-85cd-100000000004": {
    accountName: "Previous Credit Account",
    institution: "UBL",
    accountType: "credit",
    lastFour: "4590",
    openingBalance: 50000,
    currentBalance: 100000,
    openingDate: "20 Oct 2025",
    status: "inactive",
    createdAt: "20 Oct 2025",
    updatedAt: "18 Aug 2026",
    transactions: [],
  },
};

export default async function BankAccountDetailsPage({
  params,
}: BankAccountDetailsPageProps) {
  const { id } = await params;

  const account = bankAccounts[id];

  if (!account) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-[var(--shadow-sm)]">
            <h1 className="text-xl font-bold">Bank account not found</h1>

            <p className="mt-2 text-sm text-muted">
              The requested bank account does not exist.
            </p>

            <Link
              href="/bank/accounts"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-4 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to bank accounts
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const totalInflow = account.transactions
    .filter(
      (transaction) =>
        transaction.direction === "inflow" && transaction.status === "posted",
    )
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalOutflow = account.transactions
    .filter(
      (transaction) =>
        transaction.direction === "outflow" && transaction.status === "posted",
    )
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1150px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="flex items-start gap-4">
            <Link
              href="/bank/accounts"
              aria-label="Return to bank accounts"
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

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Bank account details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {account.accountName}
                </h1>

                <StatusBadge status={account.status} />
              </div>

              <p className="mt-2 text-sm text-muted">
                {account.institution} · •••• {account.lastFour}
              </p>
            </div>
          </div>

          <Link
            href={`/bank/accounts/${id}/edit`}
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl border
              border-border bg-white px-4 text-sm
              font-semibold text-muted transition
              hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit account
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Current balance"
            value={formatCurrency(account.currentBalance)}
            helper="Available account balance"
            icon={<WalletCards className="size-5" />}
          />

          <InfoCard
            title="Statement inflow"
            value={formatCurrency(totalInflow)}
            helper="Posted recent inflows"
            icon={<ArrowDownLeft className="size-5" />}
            color="green"
          />

          <InfoCard
            title="Statement outflow"
            value={formatCurrency(totalOutflow)}
            helper="Posted recent outflows"
            icon={<ArrowUpRight className="size-5" />}
            color="orange"
          />
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Building2 className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">Account information</h2>

              <p className="text-xs text-muted">
                General bank account and balance details.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow label="Account name" value={account.accountName} />

            <DetailsRow label="Institution" value={account.institution} />

            <DetailsRow
              label="Account type"
              value={capitalize(account.accountType)}
            />

            <DetailsRow
              label="Account number"
              value={`•••• ${account.lastFour}`}
            />

            <DetailsRow
              label="Opening balance"
              value={formatCurrency(account.openingBalance)}
            />

            <DetailsRow
              label="Current balance"
              value={formatCurrency(account.currentBalance)}
            />

            <DetailsRow label="Opening date" value={account.openingDate} />

            <DetailsRow label="Status" value={capitalize(account.status)} />

            <DetailsRow label="Last updated" value={account.updatedAt} />
          </dl>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-3 border-b border-border p-5 sm:p-6">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
              <ReceiptText className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">Recent statement</h2>

              <p className="text-xs text-muted">
                Recent transactions associated with this account.
              </p>
            </div>
          </div>

          {account.transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-surface-secondary">
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    <th className="px-5 py-4">Transaction</th>

                    <th className="px-5 py-4">Date</th>

                    <th className="px-5 py-4">Status</th>

                    <th className="px-5 py-4 text-right">Amount</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {account.transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="text-sm transition hover:bg-surface-secondary/50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold">
                          {transaction.description}
                        </p>

                        <p className="mt-1 text-[10px] text-muted">
                          {transaction.id}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-muted">
                        <span className="flex items-center gap-2">
                          <CalendarDays className="size-3.5" />
                          {transaction.date}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`
                              rounded-full px-2.5
                              py-1 text-[10px]
                              font-semibold capitalize
                              ${
                                transaction.status === "posted"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-orange-50 text-orange-700"
                              }
                            `}
                        >
                          {transaction.status}
                        </span>
                      </td>

                      <td
                        className={`
                            px-5 py-4 text-right
                            font-bold
                            ${
                              transaction.direction === "inflow"
                                ? "text-emerald-700"
                                : "text-red-600"
                            }
                          `}
                      >
                        {transaction.direction === "inflow" ? "+" : "−"}{" "}
                        {formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center">
              <CreditCard className="mx-auto size-8 text-muted" />

              <p className="mt-3 font-semibold">No recent transactions</p>

              <p className="mt-1 text-xs text-muted">
                Account transactions will appear here.
              </p>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function StatusBadge({ status }: { status: BankAccountStatus }) {
  const classes = {
    active: "bg-emerald-50 text-emerald-700",
    inactive: "bg-orange-50 text-orange-700",
    closed: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`
        rounded-full px-2.5 py-1
        text-[10px] font-semibold
        capitalize ${classes[status]}
      `}
    >
      {status}
    </span>
  );
}

function InfoCard({
  title,
  value,
  helper,
  icon,
  color = "blue",
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "orange";
}) {
  const classes = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <span
        className={`
          flex size-11 shrink-0 items-center
          justify-center rounded-xl
          ${classes[color]}
        `}
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">{title}</p>

        <p className="mt-1 truncate font-bold">{value}</p>

        <p className="mt-1 text-[10px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

function DetailsRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 py-4 text-sm sm:grid-cols-[180px_minmax(0,1fr)]">
      <dt className="font-medium text-muted">{label}</dt>

      <dd className="font-medium">{value}</dd>
    </div>
  );
}
