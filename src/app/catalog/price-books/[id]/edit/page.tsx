import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { PriceBookForm } from "@/features/catalogue/components";

interface EditPriceBookPageProps {
  params: Promise<{
    id: string;
  }>;
}

const priceBooks = {
  "1": {
    name: "Standard Retail Prices",
    description:
      "Standard selling prices used for regular retail customers.",
    status: "Active" as const,
  },

  "2": {
    name: "Wholesale Prices",
    description:
      "Special wholesale prices for customers purchasing products in bulk.",
    status: "Active" as const,
  },

  "3": {
    name: "Ramadan Promotion",
    description:
      "Special promotional prices available during Ramadan.",
    status: "Active" as const,
  },

  "4": {
    name: "Previous Promotion",
    description:
      "Prices from the previous promotional campaign.",
    status: "Inactive" as const,
  },
};

export default async function EditPriceBookPage({
  params,
}: EditPriceBookPageProps) {
  const { id } = await params;

  const priceBook =
    priceBooks[id as keyof typeof priceBooks];

  if (!priceBook) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div
            className="
              rounded-2xl border border-border
              bg-white p-8 text-center
              shadow-[var(--shadow-sm)]
            "
          >
            <h1 className="text-xl font-bold">
              Price book not found
            </h1>

            <p className="mt-2 text-sm text-muted">
              The requested price book does not
              exist.
            </p>

            <Link
              href="/catalog/price-books"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-4 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to price books
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/catalog/price-books/${id}`}
            aria-label="Return to price book details"
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

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Edit price book
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update the information and availability
              of {priceBook.name}.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <PriceBookForm
            mode="edit"
            priceBookId={Number(id)}
            initialValues={priceBook}
          />
        </div>
      </div>
    </AppShell>
  );
}