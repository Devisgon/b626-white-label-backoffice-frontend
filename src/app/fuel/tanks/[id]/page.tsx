import Link from "next/link";
import { ArrowLeft, Database, Gauge, MapPin, Pencil } from "lucide-react";

import { AppShell } from "@/components/layout";
import { FuelTankActionButton } from "@/features/fuel/components";

interface FuelTankDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const tanks = {
  "1": {
    name: "Tank 1 - Premium",
    fuelType: "Premium Petrol",
    capacity: 20000,
    currentStock: 15000,
    location: "Phoenix Store",
    status: "Active",
    updatedAt: "24 Aug 2026, 11:30",
  },
  "2": {
    name: "Tank 2 - Diesel",
    fuelType: "Diesel",
    capacity: 25000,
    currentStock: 18500,
    location: "Phoenix Store",
    status: "Active",
    updatedAt: "23 Aug 2026, 09:45",
  },
  "3": {
    name: "Tank 3 - Regular",
    fuelType: "Petrol",
    capacity: 15000,
    currentStock: 9350,
    location: "Central Fuel Station",
    status: "Inactive",
    updatedAt: "22 Aug 2026, 14:20",
  },
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function FuelTankDetailsPage({
  params,
}: FuelTankDetailsPageProps) {
  const { id } = await params;

  const tank = tanks[id as keyof typeof tanks] ?? tanks["1"];

  const percentage =
    tank.capacity > 0 ? (tank.currentStock / tank.capacity) * 100 : 0;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="flex items-start gap-4">
            <Link
              href="/fuel/tanks"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary"
            >
              <ArrowLeft className="size-4" />
            </Link>

            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Database className="size-4" />
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Fuel tank details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold sm:text-3xl">{tank.name}</h1>

                <span
                  className={`
                    rounded-full px-2.5 py-1
                    text-[10px] font-semibold
                    ${
                      tank.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }
                  `}
                >
                  {tank.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">Tank ID: {id}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/fuel/tanks/${id}/edit`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-semibold text-muted transition hover:border-primary hover:bg-primary hover:text-white"
            >
              <Pencil className="size-4" />
              Edit tank
            </Link>

            <FuelTankActionButton
              tankId={Number(id)}
              tankName={tank.name}
              redirectAfterAction
            />
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Fuel type"
            value={tank.fuelType}
            helper="Stored fuel product"
            icon={Database}
          />

          <InfoCard
            title="Capacity"
            value={`${formatNumber(tank.capacity)} L`}
            helper="Maximum tank capacity"
            icon={Gauge}
          />

          <InfoCard
            title="Location"
            value={tank.location}
            helper="Assigned store location"
            icon={MapPin}
          />
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]">
          <h2 className="font-bold">Current stock level</h2>

          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-bold text-primary">
                {formatNumber(tank.currentStock)} L
              </p>
              <p className="mt-1 text-xs text-muted">
                of {formatNumber(tank.capacity)} litres
              </p>
            </div>

            <p className="text-lg font-bold">{percentage.toFixed(1)}%</p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-secondary">
            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: `${Math.min(percentage, 100)}%`,
              }}
            />
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow label="Tank name" value={tank.name} />
            <DetailsRow label="Fuel type" value={tank.fuelType} />
            <DetailsRow label="Status" value={tank.status} />
            <DetailsRow label="Last updated" value={tank.updatedAt} />
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
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <span className="flex size-11 items-center justify-center rounded-xl bg-primary-light text-primary">
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">{title}</p>
        <p className="mt-1 truncate font-bold">{value}</p>
        <p className="mt-1 text-[11px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

function DetailsRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 py-4 text-sm sm:grid-cols-[180px_minmax(0,1fr)]">
      <dt className="font-medium text-muted">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
