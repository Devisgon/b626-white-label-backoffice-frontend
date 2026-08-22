import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { BankAccountForm } from "@/features/banking/components";
import type { BankAccountFormValues } from "@/features/banking/schemas";

interface EditBankAccountPageProps {
  params: Promise<{
    id: string;
  }>;
}

const bankAccounts: Record<
  string,
  BankAccountFormValues
> = {
  "1f83751c-54b1-4d50-85cd-100000000001": {
    accountName: "Main Operating Account",
    institution: "HBL",
    accountType: "checking",
    lastFour: "2343",
    openingBalance: 1500000,
    openingDate: "2026-01-01",
    status: "active",
  },

  "1f83751c-54b1-4d50-85cd-100000000002": {
    accountName: "Business Savings",
    institution: "Meezan Bank",
    accountType: "savings",
    lastFour: "7812",
    openingBalance: 2000000,
    openingDate: "2026-02-15",
    status: "active",
  },

  "1f83751c-54b1-4d50-85cd-100000000003": {
    accountName: "Petty Cash Account",
    institution: "Cash",
    accountType: "cash",
    lastFour: "0001",
    openingBalance: 100000,
    openingDate: "2026-03-01",
    status: "active",
  },

  "1f83751c-54b1-4d50-85cd-100000000004": {
    accountName: "Previous Credit Account",
    institution: "UBL",
    accountType: "credit",
    lastFour: "4590",
    openingBalance: 50000,
    openingDate: "2025-10-20",
    status: "inactive",
  },
};

export default async function EditBankAccountPage({
  params,
}: EditBankAccountPageProps) {
  const { id } = await params;
  const account = bankAccounts[id];

  if (!account) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-[var(--shadow-sm)]">
            <h1 className="text-xl font-bold">
              Bank account not found
            </h1>

            <p className="mt-2 text-sm text-muted">
              The requested bank account does not exist.
            </p>

            <Link
              href="/bank/accounts"
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
            href={`/bank/accounts/${id}`}
            aria-label="Return to bank account details"
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
              Edit bank account
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update account information and current status.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <BankAccountForm
            mode="edit"
            bankAccountId={id}
            initialValues={account}
          />
        </div>
      </div>
    </AppShell>
  );
}