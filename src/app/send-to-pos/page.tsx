import Link from "next/link";
import { ArrowLeft, Eye, History, Send, SendHorizontal } from "lucide-react";

import { AppShell } from "@/components/layout";

const sections = [
  {
    title: "Preview",
    description: "Review eligible rows, blockers and source-group readiness.",
    href: "/send-to-pos/preview",
    icon: Eye,
    count: "6 ready",
  },
  {
    title: "Send Now",
    description: "Select approved mappings and immediately send a batch.",
    href: "/send-to-pos/send",
    icon: SendHorizontal,
    count: "1 action",
  },
  {
    title: "History",
    description: "Review pending, sent and failed outgoing batches.",
    href: "/send-to-pos/history",
    icon: History,
    count: "3 batches",
  },
];

export default function SendToPosPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1250px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="flex items-start gap-4">
          <Link
            href="/"
            aria-label="Return to dashboard"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-muted transition hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="size-4" />
          </Link>

          <span className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 sm:flex">
            <Send className="size-4" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              POS publishing
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Send to POS
            </h1>
            <p className="mt-2 text-sm text-muted">
              Preview approved records, send them to POS and review batch
              history.
            </p>
          </div>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ icon: Icon, ...section }) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <Icon className="size-5" />
                </span>
                <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-semibold text-primary">
                  {section.count}
                </span>
              </div>

              <h2 className="mt-5 font-bold">{section.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {section.description}
              </p>
            </Link>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 text-cyan-900">
          <h2 className="font-semibold">Current integration phase</h2>
          <p className="mt-1 text-xs leading-5">
            The backend currently creates an outbound batch and marks it as
            sent. Live provider transport is not claimed in this phase.
          </p>
        </section>
      </main>
    </AppShell>
  );
}
