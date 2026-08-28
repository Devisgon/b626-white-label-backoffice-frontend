import Link from "next/link";
import { ArrowLeft, CalendarDays, Pencil, Ruler } from "lucide-react";

import { AppShell } from "@/components/layout";

interface UnitDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const unitRecords = {
  "1": {
    name: "Piece",
    shortName: "pc",
    status: "Active" as const,
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },

  "2": {
    name: "Kilogram",
    shortName: "kg",
    status: "Active" as const,
    createdAt: "16 Aug 2026",
    updatedAt: "19 Aug 2026",
  },

  "3": {
    name: "Liter",
    shortName: "L",
    status: "Active" as const,
    createdAt: "15 Aug 2026",
    updatedAt: "18 Aug 2026",
  },

  "4": {
    name: "Carton",
    shortName: "ctn",
    status: "Inactive" as const,
    createdAt: "14 Aug 2026",
    updatedAt: "17 Aug 2026",
  },
};

export default async function UnitDetailsPage({
  params,
}: UnitDetailsPageProps) {
  const { id } = await params;

  const unit = unitRecords[id as keyof typeof unitRecords] ?? unitRecords["1"];

  const statusStyles =
    unit.status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-slate-100 text-slate-600";

  return (
    <AppShell>
      <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section
          className="
            flex flex-col justify-between gap-5
            sm:flex-row sm:items-start
          "
        >
          <div className="flex items-start gap-4">
            <Link
              href="/catalog/units"
              aria-label="Return to units"
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
                Unit details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {unit.name}
                </h1>

                <span
                  className={`
                    inline-flex rounded-full px-2.5 py-1
                    text-[10px] font-semibold
                    ${statusStyles}
                  `}
                >
                  {unit.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">Unit ID: {id}</p>
            </div>
          </div>

          <Link
            href={`/catalog/units/${id}/edit`}
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl border border-border
              bg-white px-4 text-sm font-semibold
              text-muted transition hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit unit
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Unit"
            value={unit.name}
            helper={`Record ID: ${id}`}
            icon={Ruler}
          />

          <InfoCard
            title="Short name"
            value={unit.shortName}
            helper="Quantity abbreviation"
            icon={Ruler}
          />

          <InfoCard
            title="Last updated"
            value={unit.updatedAt}
            helper={`Created ${unit.createdAt}`}
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
              <Ruler className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">Unit information</h2>

              <p className="text-xs text-muted">
                Measurement and packaging unit details.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow label="Unit name" value={unit.name} />

            <DetailsRow label="Short name" value={unit.shortName} />

            <DetailsRow label="Status" value={unit.status} />

            <DetailsRow label="Created" value={unit.createdAt} />

            <DetailsRow label="Last updated" value={unit.updatedAt} />
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
          flex size-11 shrink-0 items-center justify-center
          rounded-xl bg-primary-light text-primary
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
