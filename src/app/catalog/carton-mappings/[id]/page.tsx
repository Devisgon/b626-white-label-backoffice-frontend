import Link from "next/link";
import { ArrowLeft, Box, CalendarDays, Package, Pencil } from "lucide-react";

import { AppShell } from "@/components/layout";

interface CartonMappingDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface MappingDetails {
  cartonProductId: number;
  cartonName: string;
  cartonSku: string;
  childProductId: number;
  childName: string;
  childSku: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

const cartonMappings: Record<string, MappingDetails> = {
  "1": {
    cartonProductId: 1,
    cartonName: "Mineral Water Carton",
    cartonSku: "CTN-1001",
    childProductId: 2,
    childName: "Premium Mineral Water",
    childSku: "PRD-1001",
    quantity: 12,
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },

  "2": {
    cartonProductId: 3,
    cartonName: "Potato Chips Case",
    cartonSku: "CTN-1002",
    childProductId: 4,
    childName: "Classic Potato Chips",
    childSku: "PRD-1002",
    quantity: 24,
    createdAt: "18 Aug 2026",
    updatedAt: "20 Aug 2026",
  },

  "3": {
    cartonProductId: 5,
    cartonName: "Coffee Case",
    cartonSku: "CTN-1003",
    childProductId: 6,
    childName: "Instant Coffee",
    childSku: "PRD-1006",
    quantity: 6,
    createdAt: "18 Aug 2026",
    updatedAt: "19 Aug 2026",
  },

  "4": {
    cartonProductId: 7,
    cartonName: "Orange Juice Carton",
    cartonSku: "CTN-1004",
    childProductId: 8,
    childName: "Orange Juice",
    childSku: "PRD-1005",
    quantity: 12,
    createdAt: "19 Aug 2026",
    updatedAt: "20 Aug 2026",
  },
};

export default async function CartonMappingDetailsPage({
  params,
}: CartonMappingDetailsPageProps) {
  const { id } = await params;

  const mapping = cartonMappings[id];

  if (!mapping) {
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
            <h1 className="text-xl font-bold">Carton mapping not found</h1>

            <p className="mt-2 text-sm text-muted">
              The requested carton mapping does not exist.
            </p>

            <Link
              href="/catalog/carton-mappings"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-4 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to carton mappings
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

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
              href="/catalog/carton-mappings"
              aria-label="Return to carton mappings"
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
                Carton mapping details
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {mapping.cartonName}
              </h1>

              <p className="mt-2 text-sm text-muted">
                Mapping ID: {id} · {mapping.quantity} units per carton
              </p>
            </div>
          </div>

          <Link
            href={`/catalog/carton-mappings/${id}/edit`}
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
            Edit mapping
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Carton product"
            value={mapping.cartonName}
            helper={mapping.cartonSku}
            icon={<Box className="size-5" />}
          />

          <InfoCard
            title="Child product"
            value={mapping.childName}
            helper={mapping.childSku}
            icon={<Package className="size-5" />}
          />

          <InfoCard
            title="Units per carton"
            value={`${mapping.quantity} units`}
            helper="Child units inside one carton"
            icon={<Box className="size-5" />}
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
              <Box className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">Mapping information</h2>

              <p className="text-xs text-muted">
                Carton and child product relationship details.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow label="Carton product" value={mapping.cartonName} />

            <DetailsRow label="Carton SKU" value={mapping.cartonSku} />

            <DetailsRow label="Child product" value={mapping.childName} />

            <DetailsRow label="Child SKU" value={mapping.childSku} />

            <DetailsRow
              label="Units per carton"
              value={String(mapping.quantity)}
            />

            <DetailsRow label="Created" value={mapping.createdAt} />

            <DetailsRow label="Last updated" value={mapping.updatedAt} />
          </dl>
        </section>

        <section
          className="
            mt-6 flex items-start gap-3
            rounded-2xl border border-blue-200
            bg-blue-50 p-4 text-blue-800
          "
        >
          <CalendarDays className="mt-0.5 size-4 shrink-0" />

          <p className="text-xs leading-5">
            One {mapping.cartonName} represents{" "}
            <strong>{mapping.quantity} units</strong> of {mapping.childName}.
          </p>
        </section>
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

function InfoCard({ title, value, helper, icon }: InfoCardProps) {
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

      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
