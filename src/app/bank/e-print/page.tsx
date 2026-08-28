import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { AppShell } from "@/components/layout";
import { EPrintWorkspace } from "@/features/banking/components";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8 flex items-start gap-4">
          <Link
            href="/bank"
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <span className="hidden size-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 sm:flex">
            <Printer className="size-4" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Financial management
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Bank e-Print
            </h1>
            <p className="mt-2 text-sm text-muted">
              Print eligible checks and review print history.
            </p>
          </div>
        </section>
        <EPrintWorkspace />
      </main>
    </AppShell>
  );
}
