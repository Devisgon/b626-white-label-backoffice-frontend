"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Plus, Power, RotateCcw, Search } from "lucide-react";

import type {
  ChartAccount,
  ChartAccountCategory,
  ChartAccountStatus,
} from "@/features/banking/types";

const initialAccounts: ChartAccount[] = [
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000001",
    accountCode: "1000",
    accountName: "Assets",
    accountCategory: "asset",
    normalBalance: "debit",
    parentAccountId: null,
    isSystem: true,
    status: "active",
    createdAt: "2026-01-01T09:00:00.000Z",
    updatedAt: "2026-08-20T10:30:00.000Z",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000002",
    accountCode: "2000",
    accountName: "Liabilities",
    accountCategory: "liability",
    normalBalance: "credit",
    parentAccountId: null,
    isSystem: true,
    status: "active",
    createdAt: "2026-01-01T09:10:00.000Z",
    updatedAt: "2026-08-20T10:35:00.000Z",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000003",
    accountCode: "3000",
    accountName: "Owner Equity",
    accountCategory: "equity",
    normalBalance: "credit",
    parentAccountId: null,
    isSystem: true,
    status: "active",
    createdAt: "2026-01-01T09:20:00.000Z",
    updatedAt: "2026-08-20T10:40:00.000Z",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000004",
    accountCode: "4000",
    accountName: "Sales Revenue",
    accountCategory: "revenue",
    normalBalance: "credit",
    parentAccountId: null,
    isSystem: false,
    status: "active",
    createdAt: "2026-02-10T08:00:00.000Z",
    updatedAt: "2026-08-20T11:00:00.000Z",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000005",
    accountCode: "5010",
    accountName: "Utilities Expense",
    accountCategory: "expense",
    normalBalance: "debit",
    parentAccountId: null,
    isSystem: false,
    status: "active",
    createdAt: "2026-03-17T08:30:00.000Z",
    updatedAt: "2026-08-20T11:15:00.000Z",
  },
  {
    id: "2d17c4ef-86b1-4ef8-9000-100000000006",
    accountCode: "5020",
    accountName: "Previous Marketing Expense",
    accountCategory: "expense",
    normalBalance: "debit",
    parentAccountId: null,
    isSystem: false,
    status: "inactive",
    createdAt: "2026-03-18T09:00:00.000Z",
    updatedAt: "2026-08-19T15:00:00.000Z",
  },
];

function formatCategory(category: ChartAccountCategory) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function ChartAccountsList() {
  const [accounts, setAccounts] = useState(initialAccounts);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ChartAccountCategory | "all">("all");
  const [status, setStatus] = useState<ChartAccountStatus | "all">("all");

  const filteredAccounts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return accounts.filter((account) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        account.accountName.toLowerCase().includes(normalizedSearch) ||
        account.accountCode.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "all" || account.accountCategory === category;

      const matchesStatus = status === "all" || account.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [accounts, search, category, status]);

  const activeAccounts = accounts.filter(
    (account) => account.status === "active",
  ).length;

  const systemAccounts = accounts.filter((account) => account.isSystem).length;

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setStatus("all");
  }

  function deactivateAccount(accountId: string, accountName: string) {
    const confirmed = window.confirm(
      `Are you sure you want to deactivate ${accountName}?`,
    );

    if (!confirmed) {
      return;
    }

    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === accountId
          ? {
              ...account,
              status: "inactive",
            }
          : account,
      ),
    );
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Total accounts" value={accounts.length} />

        <SummaryCard label="Active accounts" value={activeAccounts} />

        <SummaryCard label="System accounts" value={systemAccounts} />
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
            <h2 className="font-bold">Chart accounts</h2>

            <p className="mt-1 text-xs text-muted">
              Manage account codes, categories and account status.
            </p>
          </div>

          <Link
            href="/bank/chart-of-accounts/new"
            className="
        inline-flex h-10 items-center
        justify-center gap-2 rounded-xl
        bg-primary px-4 text-sm font-semibold
        text-white transition
        hover:bg-primary-hover
      "
          >
            <Plus className="size-4" />
            Add account
          </Link>
        </div>

        <div
          className="
      flex flex-col gap-3 border-b
      border-border p-4 lg:flex-row
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
              placeholder="Search by account name or code..."
              className="
          h-11 w-full rounded-xl border
          border-border bg-white pl-11 pr-4
          text-sm text-black outline-none
          transition placeholder:text-gray-500
          focus:border-primary
          focus:ring-4 focus:ring-primary/10
        "
            />
          </div>

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as ChartAccountCategory | "all")
            }
            aria-label="Filter by account category"
            className="
        h-11 rounded-xl border border-border
        bg-white px-4 text-sm text-black
        outline-none transition
        focus:border-primary
        focus:ring-4 focus:ring-primary/10
        lg:min-w-44
      "
          >
            <option value="all">All categories</option>

            <option value="asset">Assets</option>

            <option value="liability">Liabilities</option>

            <option value="equity">Equity</option>

            <option value="revenue">Revenue</option>

            <option value="expense">Expenses</option>
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ChartAccountStatus | "all")
            }
            aria-label="Filter by account status"
            className="
        h-11 rounded-xl border border-border
        bg-white px-4 text-sm text-black
        outline-none transition
        focus:border-primary
        focus:ring-4 focus:ring-primary/10
        lg:min-w-40
      "
          >
            <option value="all">All statuses</option>

            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">Code</th>

                <th className="px-5 py-4">Account</th>

                <th className="px-5 py-4">Category</th>

                <th className="px-5 py-4">Normal balance</th>

                <th className="px-5 py-4">Type</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredAccounts.map((account) => (
                <tr
                  key={account.id}
                  className="
                    text-sm transition
                    hover:bg-surface-secondary/60
                  "
                >
                  <td className="px-5 py-4 font-bold">{account.accountCode}</td>

                  <td className="px-5 py-4">
                    <p className="font-semibold">{account.accountName}</p>

                    <p className="mt-1 text-[11px] text-muted">
                      ID: {account.id.slice(0, 8)}...
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className="
                        inline-flex rounded-full
                        bg-blue-50 px-2.5 py-1
                        text-[10px] font-semibold
                        text-blue-700
                      "
                    >
                      {formatCategory(account.accountCategory)}
                    </span>
                  </td>

                  <td className="px-5 py-4 capitalize text-muted">
                    {account.normalBalance}
                  </td>

                  <td className="px-5 py-4">
                    {account.isSystem ? (
                      <span className="text-xs font-semibold text-purple-700">
                        System
                      </span>
                    ) : (
                      <span className="text-xs text-muted">Custom</span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`
                        inline-flex rounded-full
                        px-2.5 py-1 text-[10px]
                        font-semibold
                        ${
                          account.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {account.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <ActionLink
                        href={`/bank/chart-of-accounts/${account.id}`}
                        label={`View ${account.accountName}`}
                      >
                        <Eye className="size-4" />
                      </ActionLink>

                      <ActionLink
                        href={`/bank/chart-of-accounts/${account.id}/edit`}
                        label={`Edit ${account.accountName}`}
                      >
                        <Pencil className="size-4" />
                      </ActionLink>

                      <button
                        type="button"
                        onClick={() =>
                          deactivateAccount(account.id, account.accountName)
                        }
                        disabled={
                          account.status === "inactive" || account.isSystem
                        }
                        aria-label={`Deactivate ${account.accountName}`}
                        title={
                          account.isSystem
                            ? "System accounts cannot be deactivated"
                            : "Deactivate account"
                        }
                        className="
                          flex size-9 items-center
                          justify-center rounded-lg
                          border border-border text-muted
                          transition hover:border-red-200
                          hover:bg-red-50 hover:text-red-600
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <Power className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAccounts.length === 0 && (
          <div className="px-5 py-14 text-center">
            <p className="font-semibold">No accounts found</p>

            <p className="mt-1 text-xs text-muted">
              Try changing or resetting the filters.
            </p>
          </div>
        )}

        <div
          className="
            flex items-center justify-between
            border-t border-border px-5 py-4
            text-xs text-muted
          "
        >
          <span>
            Showing {filteredAccounts.length} of {accounts.length} accounts
          </span>

          <span>Page 1 of 1</span>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <article
      className="
        rounded-2xl border border-border
        bg-white p-5 shadow-[var(--shadow-sm)]
        transition hover:-translate-y-0.5
        hover:shadow-[var(--shadow-md)]
      "
    >
      <p className="text-xs text-muted">{label}</p>

      <p className="mt-2 text-2xl font-bold">{value}</p>
    </article>
  );
}

function ActionLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="
        flex size-9 items-center justify-center
        rounded-lg border border-border
        text-muted transition
        hover:border-primary hover:bg-primary-light
        hover:text-primary
      "
    >
      {children}
    </Link>
  );
}
