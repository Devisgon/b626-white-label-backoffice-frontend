import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Pencil,
  Warehouse,
} from "lucide-react";

import { AppShell } from "@/components/layout";

interface InventoryLocationDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface InventoryLocationDetails {
  name: string;
  code: string;
  address: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}

const inventoryLocations: Record<
  string,
  InventoryLocationDetails
> = {
  "1": {
    name: "Main Warehouse",
    code: "WH-001",
    address: "Main Branch, Lahore",
    status: "Active",
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },

  "2": {
    name: "Store Stock Room",
    code: "STR-001",
    address: "Phoenix Store, Punjab",
    status: "Active",
    createdAt: "18 Aug 2026",
    updatedAt: "20 Aug 2026",
  },

  "3": {
    name: "Cold Storage",
    code: "CS-001",
    address: "Warehouse Block B, Lahore",
    status: "Active",
    createdAt: "18 Aug 2026",
    updatedAt: "19 Aug 2026",
  },

  "4": {
    name: "Previous Storage Area",
    code: "OLD-001",
    address: "Old Store Branch, Punjab",
    status: "Inactive",
    createdAt: "10 Aug 2026",
    updatedAt: "16 Aug 2026",
  },
};

export default async function InventoryLocationDetailsPage({
  params,
}: InventoryLocationDetailsPageProps) {
  const { id } = await params;

  const location =
    inventoryLocations[id];

  if (!location) {
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
              Inventory location not found
            </h1>

            <p className="mt-2 text-sm text-muted">
              The requested inventory location does
              not exist.
            </p>

            <Link
              href="/catalog/inventory-locations"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-4 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to inventory locations
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const isActive =
    location.status === "Active";

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

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Inventory location details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {location.name}
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
                  {location.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">
                Location ID: {id} ·{" "}
                {location.code}
              </p>
            </div>
          </div>

          <Link
            href={`/catalog/inventory-locations/${id}/edit`}
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
            Edit location
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Location"
            value={location.name}
            helper={`Record ID: ${id}`}
            icon={
              <Warehouse className="size-5" />
            }
          />

          <InfoCard
            title="Location code"
            value={location.code}
            helper="Unique inventory code"
            icon={
              <Warehouse className="size-5" />
            }
          />

          <InfoCard
            title="Last updated"
            value={location.updatedAt}
            helper={`Created ${location.createdAt}`}
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
              <MapPin className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">
                Location information
              </h2>

              <p className="text-xs text-muted">
                General information for this
                inventory location.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow
              label="Location name"
              value={location.name}
            />

            <DetailsRow
              label="Location code"
              value={location.code}
            />

            <DetailsRow
              label="Address"
              value={location.address}
            />

            <DetailsRow
              label="Status"
              value={location.status}
            />

            <DetailsRow
              label="Created"
              value={location.createdAt}
            />

            <DetailsRow
              label="Last updated"
              value={location.updatedAt}
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