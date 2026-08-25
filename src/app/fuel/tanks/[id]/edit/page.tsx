import Link from "next/link";
import {
  ArrowLeft,
  Database,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  FuelTankForm,
} from "@/features/fuel/components";

interface EditFuelTankPageProps {
  params: Promise<{
    id: string;
  }>;
}

const tanks = {
  "1": {
    name: "Tank 1 - Premium",
    fuel_type: "Premium Petrol",
    capacity: "20000",
    current_stock: "15000",
    location_id:
      "11111111-1111-4111-8111-111111111111",
    status: "Active" as const,
  },
  "2": {
    name: "Tank 2 - Diesel",
    fuel_type: "Diesel",
    capacity: "25000",
    current_stock: "18500",
    location_id:
      "11111111-1111-4111-8111-111111111111",
    status: "Active" as const,
  },
};

export default async function EditFuelTankPage({
  params,
}: EditFuelTankPageProps) {
  const { id } = await params;

  const tank =
    tanks[id as keyof typeof tanks] ??
    tanks["1"];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/fuel/tanks/${id}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary"
          >
            <ArrowLeft className="size-4" />
          </Link>

          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <Database className="size-4" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Fuel management
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Edit fuel tank
            </h1>
            <p className="mt-2 text-sm text-muted">
              Update tank details and current stock.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <FuelTankForm
            mode="edit"
            tankId={Number(id)}
            initialValues={tank}
          />
        </div>
      </div>
    </AppShell>
  );
}