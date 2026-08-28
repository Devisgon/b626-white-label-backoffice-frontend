import Link from "next/link";
import { ArrowLeft, Workflow } from "lucide-react";
import { AppShell } from "@/components/layout";
import { operationsModules } from "@/config/operations-modules";
import { ModuleCard } from "@/features/dashboard/components";
export default function OperationsPage() {
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
          <span className="hidden size-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 sm:flex">
            <Workflow className="size-4" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Store management
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Operations</h1>
            <p className="mt-2 text-sm text-muted">
              Manage daily tasks, expenses, maintenance and staff shifts.
            </p>
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-lg font-bold">Operations workspace</h2>
          <p className="mt-1 text-xs text-muted">
            Backend-aligned operational sections.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {operationsModules.map((module) => (
              <ModuleCard key={module.href} {...module} actionCount={5} />
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
