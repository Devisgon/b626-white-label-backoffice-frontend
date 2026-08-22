"use client";

import Link from "next/link";
import {
  Ban,
  Building2,
  CreditCard,
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";

import type {
  BankAccount,
  BankAccountStatus,
  BankAccountType,
} from "@/features/banking/types";

const initialAccounts: BankAccount[] = [
  {
    id: "1f83751c-54b1-4d50-85cd-100000000001",
    accountName: "Main Operating Account",
    institution: "HBL",
    accountType: "checking",
    lastFour: "2343",
    openingBalance: 1500000,
    currentBalance: 1850000,
    openingDate: "2026-01-01",
    status: "active",
  },
  {
    id: "1f83751c-54b1-4d50-85cd-100000000002",
    accountName: "Business Savings",
    institution: "Meezan Bank",
    accountType: "savings",
    lastFour: "7812",
    openingBalance: 2000000,
    currentBalance: 2250000,
    openingDate: "2026-02-15",
    status: "active",
  },
  {
    id: "1f83751c-54b1-4d50-85cd-100000000003",
    accountName: "Petty Cash Account",
    institution: "Cash",
    accountType: "cash",
    lastFour: "0001",
    openingBalance: 100000,
    currentBalance: 85600,
    openingDate: "2026-03-01",
    status: "active",
  },
  {
    id: "1f83751c-54b1-4d50-85cd-100000000004",
    accountName: "Previous Credit Account",
    institution: "UBL",
    accountType: "credit",
    lastFour: "4590",
    openingBalance: 50000,
    currentBalance: 100000,
    openingDate: "2025-10-20",
    status: "inactive",
  },
];

export function BankAccountsList() {
  const [accounts, setAccounts] =
    useState(initialAccounts);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<"all" | BankAccountStatus>(
      "all",
    );

  const [typeFilter, setTypeFilter] =
    useState<"all" | BankAccountType>(
      "all",
    );

  const filteredAccounts = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return accounts.filter((account) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        account.accountName
          .toLowerCase()
          .includes(normalizedSearch) ||
        account.institution
          .toLowerCase()
          .includes(normalizedSearch) ||
        account.lastFour.includes(
          normalizedSearch,
        );

      const matchesStatus =
        statusFilter === "all" ||
        account.status === statusFilter;

      const matchesType =
        typeFilter === "all" ||
        account.accountType === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    accounts,
    search,
    statusFilter,
    typeFilter,
  ]);

  const totalBalance = accounts
    .filter(
      (account) =>
        account.status !== "closed",
    )
    .reduce(
      (total, account) =>
        total +
        Number(account.currentBalance),
      0,
    );

  const activeAccounts = accounts.filter(
    (account) =>
      account.status === "active",
  ).length;

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setTypeFilter("all");
  }

  function closeAccount(
    account: BankAccount,
  ) {
    const shouldClose = window.confirm(
      `Close "${account.accountName}"? This account will no longer be available for normal transactions.`,
    );

    if (!shouldClose) {
      return;
    }

    console.log({
      action: "close-bank-account",
      accountId: account.id,
    });

    setAccounts((currentAccounts) =>
      currentAccounts.map(
        (currentAccount) =>
          currentAccount.id === account.id
            ? {
                ...currentAccount,
                status: "closed",
              }
            : currentAccount,
      ),
    );
  }

  return (
    <div>
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total balance"
          value={formatCurrency(totalBalance)}
          helper="Across available accounts"
          icon={
            <WalletCards className="size-5" />
          }
        />

        <StatCard
          title="Active accounts"
          value={String(activeAccounts)}
          helper="Available for transactions"
          icon={
            <Building2 className="size-5" />
          }
        />

        <StatCard
          title="Total accounts"
          value={String(accounts.length)}
          helper="Including inactive accounts"
          icon={
            <CreditCard className="size-5" />
          }
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="flex flex-col justify-between gap-4 border-b border-border p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-bold">
              Bank accounts
            </h2>

            <p className="mt-1 text-xs text-muted">
              Manage company accounts, balances and
              account status.
            </p>
          </div>

          <Link
            href="/bank/accounts/new"
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-4 text-sm font-semibold
              text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add bank account
          </Link>
        </div>

        <div className="grid gap-3 border-b border-border p-5 xl:grid-cols-[minmax(0,1fr)_190px_190px_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search account, institution or last four..."
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
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | "all"
                  | BankAccountStatus,
              )
            }
            aria-label="Filter accounts by status"
            className="
              h-11 rounded-xl border border-border
              bg-white px-3 text-sm outline-none
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          >
            <option value="all">
              All statuses
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

            <option value="closed">
              Closed
            </option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value as
                  | "all"
                  | BankAccountType,
              )
            }
            aria-label="Filter accounts by type"
            className="
              h-11 rounded-xl border border-border
              bg-white px-3 text-sm outline-none
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          >
            <option value="all">
              All account types
            </option>

            <option value="checking">
              Checking
            </option>

            <option value="savings">
              Savings
            </option>

            <option value="cash">
              Cash
            </option>

            <option value="credit">
              Credit
            </option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary-light px-4 text-sm
              font-semibold text-primary transition
              hover:bg-primary hover:text-white
            "
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        {filteredAccounts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-surface-secondary">
                <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  <th className="px-5 py-4">
                    Account
                  </th>

                  <th className="px-5 py-4">
                    Institution
                  </th>

                  <th className="px-5 py-4">
                    Type
                  </th>

                  <th className="px-5 py-4">
                    Current balance
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredAccounts.map(
                  (account) => (
                    <tr
                      key={account.id}
                      className="text-sm transition hover:bg-surface-secondary/50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                            <CreditCard className="size-4" />
                          </span>

                          <div>
                            <p className="font-semibold">
                              {
                                account.accountName
                              }
                            </p>

                            <p className="mt-1 text-[11px] text-muted">
                              ••••{" "}
                              {account.lastFour}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-muted">
                        {account.institution}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-surface-secondary px-2.5 py-1 text-[10px] font-semibold capitalize text-muted">
                          {account.accountType}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-bold">
                        {formatCurrency(
                          Number(
                            account.currentBalance,
                          ),
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={account.status}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/bank/accounts/${account.id}`}
                            aria-label={`View ${account.accountName}`}
                            className="flex size-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary"
                          >
                            <Eye className="size-4" />
                          </Link>

                          <Link
                            href={`/bank/accounts/${account.id}/edit`}
                            aria-label={`Edit ${account.accountName}`}
                            className="flex size-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary"
                          >
                            <Pencil className="size-4" />
                          </Link>

                          {account.status !==
                            "closed" && (
                            <button
                              type="button"
                              onClick={() =>
                                closeAccount(
                                  account,
                                )
                              }
                              aria-label={`Close ${account.accountName}`}
                              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                              <Ban className="size-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Building2 className="mx-auto size-9 text-muted" />

            <h3 className="mt-3 font-semibold">
              No bank accounts found
            </h3>

            <p className="mt-1 text-xs text-muted">
              Try changing your search or filters.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border px-5 py-4 text-xs text-muted">
          <span>
            Showing {filteredAccounts.length} of{" "}
            {accounts.length} accounts
          </span>

          <span>Dummy data</span>
        </div>
      </section>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatusBadge({
  status,
}: {
  status: BankAccountStatus;
}) {
  const classes = {
    active:
      "bg-emerald-50 text-emerald-700",
    inactive:
      "bg-orange-50 text-orange-700",
    closed:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`
        inline-flex rounded-full px-2.5
        py-1 text-[10px] font-semibold
        capitalize ${classes[status]}
      `}
    >
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  helper,
  icon,
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 truncate text-xl font-bold">
          {value}
        </p>

        <p className="mt-1 text-[10px] text-muted">
          {helper}
        </p>
      </div>
    </article>
  );
}