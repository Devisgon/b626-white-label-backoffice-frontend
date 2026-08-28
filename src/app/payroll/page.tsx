import Link from "next/link";
import { ArrowLeft, BadgeDollarSign } from "lucide-react";
import { AppShell } from "@/components/layout";
import { payrollModules } from "@/config/payroll-modules";
import { ModuleCard } from "@/features/dashboard/components";

export default function PayrollPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1250px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href="/"
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <span className="hidden size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 sm:flex">
            <BadgeDollarSign className="size-4" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Staff management
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Payroll</h1>
            <p className="mt-2 text-sm text-muted">
              Manage employee pay profiles, deductions, leave requests and
              timesheets.
            </p>
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-lg font-bold">Payroll workspace</h2>
          <p className="mt-1 text-xs text-muted">
            The first four sections aligned with the latest backend.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {payrollModules.map((module) => (
              <ModuleCard
                key={module.href}
                {...module}
                actionCount={module.title === "Timesheets" ? 5 : 4}
              />
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
