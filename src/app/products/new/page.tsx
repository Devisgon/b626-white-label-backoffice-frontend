import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { ProductForm } from "@/features/products/components";

export default function AddProductPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href="/products"
            aria-label="Return to products"
            className="
              flex size-10 shrink-0 items-center
              justify-center rounded-xl border
              border-border bg-white text-muted transition
              hover:border-primary hover:bg-primary-light
              hover:text-primary
            "
          >
            <ArrowLeft className="size-4" />
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Add new product
            </h1>

            <p className="mt-2 text-sm text-muted">
              Create a product and configure its pricing,
              catalogue and inventory settings.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <ProductForm />
        </div>
      </div>
    </AppShell>
  );
}