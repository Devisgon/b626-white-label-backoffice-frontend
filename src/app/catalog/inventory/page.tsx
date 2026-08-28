import Link from "next/link";
import { ArrowLeft, Warehouse } from "lucide-react";

import { AppShell } from "@/components/layout";
import { InventoryList } from "@/features/catalogue/components";

export default function InventoryPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1250px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href="/catalog"
            aria-label="Return to catalogue"
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
              Inventory
            </h1>

            <p className="mt-2 text-sm text-muted">
              Manage product stock, reserved quantities and warehouse levels.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <InventoryList />
        </div>
      </div>
    </AppShell>
  );
}
