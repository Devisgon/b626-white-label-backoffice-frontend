import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Package,
  Pencil,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  PriceBookItemsManager,
  type PriceBookManagerItem,
} from "@/features/catalogue/components";

interface PriceBookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface PriceBookDetails {
  name: string;
  description: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
  items: PriceBookManagerItem[];
}

const priceBooks: Record<
  string,
  PriceBookDetails
> = {
  "1": {
    name: "Standard Retail Prices",
    description:
      "Standard selling prices used for regular retail customers.",
    status: "Active",
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
    items: [
      {
        id: 1,
        productId: 1,
        productName: "Premium Mineral Water",
        sku: "PRD-1001",
        sellingPrice: 120,
      },
      {
        id: 2,
        productId: 2,
        productName: "Classic Potato Chips",
        sku: "PRD-1002",
        sellingPrice: 180,
      },
      {
        id: 3,
        productId: 6,
        productName: "Instant Coffee",
        sku: "PRD-1006",
        sellingPrice: 850,
      },
    ],
  },

  "2": {
    name: "Wholesale Prices",
    description:
      "Special wholesale prices for customers purchasing products in bulk.",
    status: "Active",
    createdAt: "18 Aug 2026",
    updatedAt: "20 Aug 2026",
    items: [
      {
        id: 4,
        productId: 1,
        productName: "Premium Mineral Water",
        sku: "PRD-1001",
        sellingPrice: 95,
      },
      {
        id: 5,
        productId: 2,
        productName: "Classic Potato Chips",
        sku: "PRD-1002",
        sellingPrice: 145,
      },
    ],
  },

  "3": {
    name: "Ramadan Promotion",
    description:
      "Special promotional prices available during Ramadan.",
    status: "Active",
    createdAt: "19 Aug 2026",
    updatedAt: "20 Aug 2026",
    items: [
      {
        id: 6,
        productId: 6,
        productName: "Instant Coffee",
        sku: "PRD-1006",
        sellingPrice: 750,
      },
      {
        id: 7,
        productId: 5,
        productName: "Orange Juice",
        sku: "PRD-1005",
        sellingPrice: 520,
      },
    ],
  },

  "4": {
    name: "Previous Promotion",
    description:
      "Prices from the previous promotional campaign.",
    status: "Inactive",
    createdAt: "10 Aug 2026",
    updatedAt: "16 Aug 2026",
    items: [
      {
        id: 8,
        productId: 1,
        productName: "Premium Mineral Water",
        sku: "PRD-1001",
        sellingPrice: 100,
      },
    ],
  },
};

export default async function PriceBookDetailsPage({
  params,
}: PriceBookDetailsPageProps) {
  const { id } = await params;

  const priceBook = priceBooks[id];

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

  const isActive =
    priceBook.status === "Active";

  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section
          className="
            flex flex-col justify-between gap-5
            sm:flex-row sm:items-start
          "
        >
          <div className="flex items-start gap-4">
            <Link
              href="/catalog/price-books"
              aria-label="Return to price books"
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
                Price book details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {priceBook.name}
                </h1>

                <span
                  className={`
                    inline-flex rounded-full px-2.5
                    py-1 text-[10px] font-semibold
                    ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }
                  `}
                >
                  {priceBook.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">
                Price Book ID: {id}
              </p>
            </div>
          </div>

          <Link
            href={`/catalog/price-books/${id}/edit`}
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl border
              border-border bg-white px-4 text-sm
              font-semibold text-muted transition
              hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit price book
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Price book"
            value={priceBook.name}
            helper={`Record ID: ${id}`}
            icon={
              <BookOpen className="size-5" />
            }
          />

          <InfoCard
            title="Products"
            value={`${priceBook.items.length} products`}
            helper="Products with assigned prices"
            icon={
              <Package className="size-5" />
            }
          />

          <InfoCard
            title="Last updated"
            value={priceBook.updatedAt}
            helper={`Created ${priceBook.createdAt}`}
            icon={
              <CalendarDays className="size-5" />
            }
          />
        </section>

        <section
          className="
            mt-6 rounded-2xl border border-border
            bg-white p-5 shadow-[var(--shadow-sm)]
            sm:p-6
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                flex size-10 items-center
                justify-center rounded-xl
                bg-primary-light text-primary
              "
            >
              <BookOpen className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">
                Price book information
              </h2>

              <p className="text-xs text-muted">
                General information for this price
                book.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow
              label="Name"
              value={priceBook.name}
            />

            <DetailsRow
              label="Description"
              value={priceBook.description}
            />

            <DetailsRow
              label="Status"
              value={priceBook.status}
            />

            <DetailsRow
              label="Created"
              value={priceBook.createdAt}
            />

            <DetailsRow
              label="Last updated"
              value={priceBook.updatedAt}
            />
          </dl>
        </section>

        <div className="mt-6">
          <PriceBookItemsManager
            priceBookId={Number(id)}
            initialItems={priceBook.items}
          />
        </div>
      </div>
    </AppShell>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
}

function InfoCard({
  title,
  value,
  helper,
  icon,
}: InfoCardProps) {
  return (
    <article
      className="
        flex items-center gap-4 rounded-2xl
        border border-border bg-white p-5
        shadow-[var(--shadow-sm)]
        transition hover:-translate-y-1
        hover:shadow-[var(--shadow-md)]
      "
    >
      <span
        className="
          flex size-11 shrink-0 items-center
          justify-center rounded-xl
          bg-primary-light text-primary
        "
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 truncate font-bold">
          {value}
        </p>

        <p className="mt-1 truncate text-[11px] text-muted">
          {helper}
        </p>
      </div>
    </article>
  );
}

function DetailsRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        grid gap-2 py-4 text-sm
        sm:grid-cols-[180px_minmax(0,1fr)]
      "
    >
      <dt className="font-medium text-muted">
        {label}
      </dt>

      <dd className="font-medium text-foreground">
        {value}
      </dd>
    </div>
  );
}