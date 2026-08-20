import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { BrandsList } from "@/features/catalogue/components";

export default function BrandsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
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
              Brands
            </h1>

            <p className="mt-2 text-sm text-muted">
              Manage product brands and their
              availability.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <BrandsList />
        </div>
      </div>
    </AppShell>
  );
}