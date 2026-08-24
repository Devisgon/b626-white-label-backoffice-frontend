import Link from "next/link";
import {
  ArrowLeft,
  CalendarRange,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  ReconciliationForm,
} from "@/features/banking/components";

export default function NewReconciliationPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href="/bank/reconciliations"
            aria-label="Return to reconciliations"
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
            <CalendarRange className="size-4" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Banking management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Start reconciliation
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted">
              Compare a bank statement with system
              transactions for the selected period.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <ReconciliationForm />
        </div>
      </div>
    </AppShell>
  );
}