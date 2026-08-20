import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  type LucideIcon,
} from "lucide-react";

import { AppShell } from "@/components/layout";

interface CatalogueSectionPlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function CatalogueSectionPlaceholder({
  title,
  description,
  icon: Icon,
}: CatalogueSectionPlaceholderProps) {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href="/catalog"
            aria-label="Return to catalogue"
            className="
              flex size-10 shrink-0 items-center justify-center
              rounded-xl border border-border bg-white
              text-muted transition hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <ArrowLeft className="size-4" />
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>

            <p className="mt-2 text-sm text-muted">
              {description}
            </p>
          </div>
        </section>

        <section
          className="
            mt-8 flex min-h-80 flex-col items-center
            justify-center rounded-2xl border
            border-dashed border-border bg-white
            px-5 py-12 text-center
            shadow-[var(--shadow-sm)]
          "
        >
          <span
            className="
              flex size-14 items-center justify-center
              rounded-2xl bg-primary-light text-primary
            "
          >
            <Icon className="size-6" />
          </span>

          <h2 className="mt-5 text-lg font-bold">
            {title} module
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            This section is ready in the project structure.
            Its listing, forms and backend integration will
            be added in the next development steps.
          </p>

          <span
            className="
              mt-5 inline-flex items-center gap-2
              rounded-full bg-surface-secondary
              px-3 py-1.5 text-xs font-semibold text-muted
            "
          >
            <Clock3 className="size-3.5" />
            Development pending
          </span>
        </section>
      </div>
    </AppShell>
  );
}