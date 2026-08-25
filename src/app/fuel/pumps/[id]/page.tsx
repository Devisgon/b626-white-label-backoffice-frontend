import Link from "next/link";
import {
  ArrowLeft,
  Database,
  Fuel,
  MapPin,
  Pencil,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  FuelPumpActionButton,
} from "@/features/fuel/components";

interface FuelPumpDetailsPageProps {
  params: Promise<{ id: string }>;
}

const pumps = {
  "1": {
    name: "Pump 1",
    tankName: "Tank 1 - Premium",
    fuelType: "Premium Petrol",
    location: "Phoenix Store",
    status: "Active",
  },
  "2": {
    name: "Pump 2",
    tankName: "Tank 2 - Diesel",
    fuelType: "Diesel",
    location: "Phoenix Store",
    status: "Active",
  },
  "3": {
    name: "Pump 3",
    tankName: "Tank 3 - Regular",
    fuelType: "Petrol",
    location: "Central Fuel Station",
    status: "Inactive",
  },
};

export default async function FuelPumpDetailsPage({
  params,
}: FuelPumpDetailsPageProps) {
  const { id } = await params;

  const pump =
    pumps[id as keyof typeof pumps] ??
    pumps["1"];

  return (
    <AppShell>
      <div className="mx-auto max-w-[1050px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-5 sm:flex-row">
          <div className="flex items-start gap-4">
            <Link
              href="/fuel/pumps"
              className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted hover:bg-primary-light hover:text-primary"
            >
              <ArrowLeft className="size-4" />
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Fuel pump details
              </p>

              <div className="mt-2 flex items-center gap-3">
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {pump.name}
                </h1>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                  {pump.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">
                Pump ID: {id}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/fuel/pumps/${id}/edit`}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-semibold text-muted hover:bg-primary hover:text-white"
            >
              <Pencil className="size-4" />
              Edit pump
            </Link>

            <FuelPumpActionButton
              pumpId={Number(id)}
              pumpName={pump.name}
              redirectAfterAction
            />
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Connected tank"
            value={pump.tankName}
            icon={Database}
          />

          <InfoCard
            title="Fuel type"
            value={pump.fuelType}
            icon={Fuel}
          />

          <InfoCard
            title="Location"
            value={pump.location}
            icon={MapPin}
          />
        </section>
      </div>
    </AppShell>
  );
}

function InfoCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <span className="flex size-11 items-center justify-center rounded-xl bg-primary-light text-primary">
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">
          {title}
        </p>
        <p className="mt-1 truncate font-bold">
          {value}
        </p>
      </div>
    </article>
  );
}