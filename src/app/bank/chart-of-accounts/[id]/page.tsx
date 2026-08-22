import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  FolderTree,
  Pencil,
  Scale,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import type {
  ChartAccountCategory,
  ChartAccountStatus,
  NormalBalance,
} from "@/features/banking/types";

interface ChartAccountDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface ChartAccountDetails {
  accountCode: string;
  accountName: string;
  accountCategory: ChartAccountCategory;
  normalBalance: NormalBalance;
  parentAccount: string;
  description: string;
  isSystem: boolean;
  status: ChartAccountStatus;
  createdAt: string;
  updatedAt: string;
}

const chartAccounts: Record<
  string,
  ChartAccountDetails
> = {
  "2d17c4ef-86b1-4ef8-9000-100000000001": {
    accountCode: "1000",
    accountName: "Assets",
    accountCategory: "asset",
    normalBalance: "debit",
    parentAccount: "No parent account",
    description:
      "Main account used to group all business assets.",
    isSystem: true,
    status: "active",
    createdAt: "1 Jan 2026",
    updatedAt: "20 Aug 2026",
  },

  "2d17c4ef-86b1-4ef8-9000-100000000002": {
    accountCode: "2000",
    accountName: "Liabilities",
    accountCategory: "liability",
    normalBalance: "credit",
    parentAccount: "No parent account",
    description:
      "Main account used to group business liabilities.",
    isSystem: true,
    status: "active",
    createdAt: "1 Jan 2026",
    updatedAt: "20 Aug 2026",
  },

  "2d17c4ef-86b1-4ef8-9000-100000000003": {
    accountCode: "3000",
    accountName: "Owner Equity",
    accountCategory: "equity",
    normalBalance: "credit",
    parentAccount: "No parent account",
    description:
      "Tracks owner investments and retained equity.",
    isSystem: true,
    status: "active",
    createdAt: "1 Jan 2026",
    updatedAt: "20 Aug 2026",
  },

  "2d17c4ef-86b1-4ef8-9000-100000000004": {
    accountCode: "4000",
    accountName: "Sales Revenue",
    accountCategory: "revenue",
    normalBalance: "credit",
    parentAccount: "No parent account",
    description:
      "Tracks income generated from store sales.",
    isSystem: false,
    status: "active",
    createdAt: "10 Feb 2026",
    updatedAt: "20 Aug 2026",
  },

  "2d17c4ef-86b1-4ef8-9000-100000000005": {
    accountCode: "5010",
    accountName: "Utilities Expense",
    accountCategory: "expense",
    normalBalance: "debit",
    parentAccount: "Expenses",
    description:
      "Electricity, gas, water and other utility expenses.",
    isSystem: false,
    status: "active",
    createdAt: "17 Mar 2026",
    updatedAt: "20 Aug 2026",
  },

  "2d17c4ef-86b1-4ef8-9000-100000000006": {
    accountCode: "5020",
    accountName: "Previous Marketing Expense",
    accountCategory: "expense",
    normalBalance: "debit",
    parentAccount: "Expenses",
    description:
      "Previous account used for marketing expenses.",
    isSystem: false,
    status: "inactive",
    createdAt: "18 Mar 2026",
    updatedAt: "19 Aug 2026",
  },
};

function capitalize(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

export default async function ChartAccountDetailsPage({
  params,
}: ChartAccountDetailsPageProps) {
  const { id } = await params;
  const account = chartAccounts[id];

  if (!account) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-[var(--shadow-sm)]">
            <h1 className="text-xl font-bold">
              Account not found
            </h1>

            <p className="mt-2 text-sm text-muted">
              The requested chart account does not
              exist.
            </p>

            <Link
              href="/bank/chart-of-accounts"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-5 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to accounts
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section
          className="
            flex flex-col justify-between gap-5
            sm:flex-row sm:items-start
          "
        >
          <div className="flex items-start gap-4">
            <Link
              href="/bank/chart-of-accounts"
              aria-label="Return to chart of accounts"
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
                Chart account details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {account.accountCode} —{" "}
                  {account.accountName}
                </h1>

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
                  {capitalize(account.status)}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">
                Account ID: {id}
              </p>
            </div>
          </div>

          <Link
            href={`/bank/chart-of-accounts/${id}/edit`}
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              border border-border bg-white px-4
              text-sm font-semibold text-muted
              transition hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit account
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Category"
            value={capitalize(
              account.accountCategory,
            )}
            helper={`Normal balance: ${capitalize(
              account.normalBalance,
            )}`}
            icon={Scale}
          />

          <InfoCard
            title="Account type"
            value={
              account.isSystem
                ? "System account"
                : "Custom account"
            }
            helper={
              account.isSystem
                ? "Managed by the system"
                : "Created by an authorized user"
            }
            icon={FolderTree}
          />

          <InfoCard
            title="Last updated"
            value={account.updatedAt}
            helper={`Created ${account.createdAt}`}
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
          <div className="flex items-center gap-3">
            <span
              className="
                flex size-10 items-center justify-center
                rounded-xl bg-primary-light text-primary
              "
            >
              <Scale className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">
                Account information
              </h2>

              <p className="text-xs text-muted">
                Financial classification and account
                settings.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow
              label="Account code"
              value={account.accountCode}
            />

            <DetailsRow
              label="Account name"
              value={account.accountName}
            />

            <DetailsRow
              label="Category"
              value={capitalize(
                account.accountCategory,
              )}
            />

            <DetailsRow
              label="Normal balance"
              value={capitalize(
                account.normalBalance,
              )}
            />

            <DetailsRow
              label="Parent account"
              value={account.parentAccount}
            />

            <DetailsRow
              label="Description"
              value={account.description}
            />

            <DetailsRow
              label="Account type"
              value={
                account.isSystem
                  ? "System account"
                  : "Custom account"
              }
            />

            <DetailsRow
              label="Status"
              value={capitalize(account.status)}
            />
          </dl>
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
    <article
      className="
        flex items-center gap-4 rounded-2xl
        border border-border bg-white p-5
        shadow-[var(--shadow-sm)]
        transition hover:-translate-y-0.5
        hover:shadow-[var(--shadow-md)]
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
    <div
      className="
        grid gap-2 py-4 text-sm
        sm:grid-cols-[180px_minmax(0,1fr)]
      "
    >
      <dt className="font-medium text-muted">
        {label}
      </dt>

      <dd className="font-medium text-foreground">
        {value}
      </dd>
    </div>
  );
}