import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  ChartAccountForm,
} from "@/features/banking/components";
import type {
  ChartAccountFormValues,
} from "@/features/banking/schemas";

interface EditChartAccountPageProps {
  params: Promise<{
    id: string;
  }>;
}

const chartAccounts: Record<
  string,
  ChartAccountFormValues
> = {
  "2d17c4ef-86b1-4ef8-9000-100000000001": {
    accountCode: "1000",
    accountName: "Assets",
    accountCategory: "asset",
    normalBalance: "debit",
    parentAccountId: "",
    description:
      "Main account used to group all business assets.",
    status: "active",
  },

  "2d17c4ef-86b1-4ef8-9000-100000000002": {
    accountCode: "2000",
    accountName: "Liabilities",
    accountCategory: "liability",
    normalBalance: "credit",
    parentAccountId: "",
    description:
      "Main account used to group business liabilities.",
    status: "active",
  },

  "2d17c4ef-86b1-4ef8-9000-100000000003": {
    accountCode: "3000",
    accountName: "Owner Equity",
    accountCategory: "equity",
    normalBalance: "credit",
    parentAccountId: "",
    description:
      "Tracks owner investments and retained equity.",
    status: "active",
  },

  "2d17c4ef-86b1-4ef8-9000-100000000004": {
    accountCode: "4000",
    accountName: "Sales Revenue",
    accountCategory: "revenue",
    normalBalance: "credit",
    parentAccountId: "",
    description:
      "Tracks income generated from store sales.",
    status: "active",
  },

  "2d17c4ef-86b1-4ef8-9000-100000000005": {
    accountCode: "5010",
    accountName: "Utilities Expense",
    accountCategory: "expense",
    normalBalance: "debit",
    parentAccountId: "",
    description:
      "Electricity, gas, water and other utility expenses.",
    status: "active",
  },

  "2d17c4ef-86b1-4ef8-9000-100000000006": {
    accountCode: "5020",
    accountName: "Previous Marketing Expense",
    accountCategory: "expense",
    normalBalance: "debit",
    parentAccountId: "",
    description:
      "Previous account used for marketing expenses.",
    status: "inactive",
  },
};

export default async function EditChartAccountPage({
  params,
}: EditChartAccountPageProps) {
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
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/bank/chart-of-accounts/${id}`}
            aria-label="Return to account details"
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
              Banking management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Edit chart account
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update the account classification and
              current status.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <ChartAccountForm
            mode="edit"
            chartAccountId={id}
            initialValues={account}
          />
        </div>
      </div>
    </AppShell>
  );
}