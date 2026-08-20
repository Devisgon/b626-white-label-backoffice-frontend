import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Package,
  Pencil,
  Tags,
} from "lucide-react";

import { AppShell } from "@/components/layout";

interface CategoryDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const categoryDetails = {
  name: "Beverages",
  description:
    "Soft drinks, juices, bottled water and other beverage products.",
  status: "Active",
  productCount: 48,
  createdAt: "17 Aug 2026",
  updatedAt: "19 Aug 2026",
};

export default async function CategoryDetailsPage({
  params,
}: CategoryDetailsPageProps) {
  const { id } = await params;

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
              href="/catalog/categories"
              aria-label="Return to categories"
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
                Category details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {categoryDetails.name}
                </h1>

                <span
                  className="
                    inline-flex rounded-full bg-emerald-50
                    px-2.5 py-1 text-[10px]
                    font-semibold text-emerald-700
                  "
                >
                  {categoryDetails.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">
                Category ID: {id}
              </p>
            </div>
          </div>

          <Link
            href={`/catalog/categories/${id}/edit`}
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl border border-border
              bg-white px-4 text-sm font-semibold
              text-muted transition
              hover:border-primary hover:bg-primary-light
              hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit category
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Category"
            value={categoryDetails.name}
            helper={`Record ID: ${id}`}
            icon={Tags}
          />

          <InfoCard
            title="Products"
            value={`${categoryDetails.productCount} products`}
            helper="Products assigned to this category"
            icon={Package}
          />

          <InfoCard
            title="Last updated"
            value={categoryDetails.updatedAt}
            helper={`Created ${categoryDetails.createdAt}`}
            icon={CalendarDays}
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
                flex size-10 items-center justify-center
                rounded-xl bg-primary-light text-primary
              "
            >
              <Tags className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">
                Category information
              </h2>

              <p className="text-xs text-muted">
                General information for this category.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow
              label="Category name"
              value={categoryDetails.name}
            />

            <DetailsRow
              label="Description"
              value={categoryDetails.description}
            />

            <DetailsRow
              label="Status"
              value={categoryDetails.status}
            />

            <DetailsRow
              label="Created"
              value={categoryDetails.createdAt}
            />

            <DetailsRow
              label="Last updated"
              value={categoryDetails.updatedAt}
            />
          </dl>
        </section>
      </div>
    </AppShell>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  helper: string;
  icon: React.ElementType;
}

function InfoCard({
  title,
  value,
  helper,
  icon: Icon,
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
        <Icon className="size-5" />
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

interface DetailsRowProps {
  label: string;
  value: string;
}

function DetailsRow({
  label,
  value,
}: DetailsRowProps) {
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