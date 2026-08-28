import Link from "next/link";
import { ArrowLeft, Warehouse } from "lucide-react";

import { AppShell } from "@/components/layout";
import { InventoryLocationForm } from "@/features/catalogue/components";

export default function NewInventoryLocationPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href="/catalog/inventory-locations"
            aria-label="Return to inventory locations"
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
              hidden size-10 shrink-0 items-center
              justify-center rounded-xl
              bg-primary-light text-primary sm:flex
            "
          >
            <Warehouse className="size-4" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Add inventory location
            </h1>

            <p className="mt-2 text-sm text-muted">
              Create a warehouse, stock room or another inventory storage
              location.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <InventoryLocationForm />
        </div>
      </div>
    </AppShell>
  );
}
