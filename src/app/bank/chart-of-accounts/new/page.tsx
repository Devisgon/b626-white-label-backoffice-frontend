import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  ChartAccountForm,
} from "@/features/banking/components";

export default function NewChartAccountPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
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
              Banking management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Add new account
            </h1>

            <p className="mt-2 text-sm text-muted">
              Create a new financial account for
              transaction classification and reporting.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <ChartAccountForm mode="create" />
        </div>
      </div>
    </AppShell>
  );
}