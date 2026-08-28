import Link from "next/link";
import { ArrowLeft, Building2, CalendarDays, Pencil } from "lucide-react";

import { AppShell } from "@/components/layout";

interface BrandDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const brandRecords = {
  "1": {
    name: "Nestle",
    description: "Food, beverage and consumer product brand.",
    status: "Active" as const,
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },

  "2": {
    name: "Coca-Cola",
    description: "Soft drinks and beverage products.",
    status: "Active" as const,
    createdAt: "17 Aug 2026",
    updatedAt: "19 Aug 2026",
  },

  "3": {
    name: "Unilever",
    description: "Personal care and household products.",
    status: "Active" as const,
    createdAt: "16 Aug 2026",
    updatedAt: "19 Aug 2026",
  },

  "4": {
    name: "Local Choice",
    description: "Locally sourced store products.",
    status: "Inactive" as const,
    createdAt: "15 Aug 2026",
    updatedAt: "18 Aug 2026",
  },
};

export default async function BrandDetailsPage({
  params,
}: BrandDetailsPageProps) {
  const { id } = await params;

  const brandDetails =
    brandRecords[id as keyof typeof brandRecords] ?? brandRecords["1"];

  const statusStyles =
    brandDetails.status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-slate-100 text-slate-600";

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
              href="/catalog/brands"
              aria-label="Return to brands"
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
                Brand details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {brandDetails.name}
                </h1>

                <span
                  className={`
                    inline-flex rounded-full px-2.5 py-1
                    text-[10px] font-semibold
                    ${statusStyles}
                  `}
                >
                  {brandDetails.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">Brand ID: {id}</p>
            </div>
          </div>

          <Link
            href={`/catalog/brands/${id}/edit`}
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl border border-border
              bg-white px-4 text-sm font-semibold
              text-muted transition hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit brand
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Brand"
            value={brandDetails.name}
            helper={`Record ID: ${id}`}
            icon={Building2}
          />

          <InfoCard
            title="Status"
            value={brandDetails.status}
            helper="Current brand availability"
            icon={Building2}
          />

          <InfoCard
            title="Last updated"
            value={brandDetails.updatedAt}
            helper={`Created ${brandDetails.createdAt}`}
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
              <Building2 className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">Brand information</h2>

              <p className="text-xs text-muted">
                General information for this brand.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow label="Brand name" value={brandDetails.name} />

            <DetailsRow label="Description" value={brandDetails.description} />

            <DetailsRow label="Status" value={brandDetails.status} />

            <DetailsRow label="Created" value={brandDetails.createdAt} />

            <DetailsRow label="Last updated" value={brandDetails.updatedAt} />
          </dl>
        </section>
      </div>
    </AppShell>
  );
}

function InfoCard({
  title,
  value,
  helper,
  icon: Icon,
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ElementType;
}) {
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
        <p className="text-xs text-muted">{title}</p>

        <p className="mt-1 truncate font-bold">{value}</p>

        <p className="mt-1 truncate text-[11px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

function DetailsRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        grid gap-2 py-4 text-sm
        sm:grid-cols-[180px_minmax(0,1fr)]
      "
    >
      <dt className="font-medium text-muted">{label}</dt>

      <dd className="font-medium text-foreground">{value || "Not provided"}</dd>
    </div>
  );
}
