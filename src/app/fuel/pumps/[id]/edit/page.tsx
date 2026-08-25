import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  FuelPumpForm,
} from "@/features/fuel/components";

interface EditFuelPumpPageProps {
  params: Promise<{ id: string }>;
}

const pumps = {
  "1": {
    name: "Pump 1",
    tank_id: "1",
    location_id:
      "11111111-1111-4111-8111-111111111111",
    status: "Active" as const,
  },
  "2": {
    name: "Pump 2",
    tank_id: "2",
    location_id:
      "11111111-1111-4111-8111-111111111111",
    status: "Active" as const,
  },
  "3": {
    name: "Pump 3",
    tank_id: "3",
    location_id:
      "22222222-2222-4222-8222-222222222222",
    status: "Inactive" as const,
  },
};

export default async function EditFuelPumpPage({
  params,
}: EditFuelPumpPageProps) {
  const { id } = await params;

  const pump =
    pumps[id as keyof typeof pumps] ??
    pumps["1"];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/fuel/pumps/${id}`}
            className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted hover:bg-primary-light hover:text-primary"
          >
            <ArrowLeft className="size-4" />
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Fuel management
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Edit fuel pump
            </h1>
            <p className="mt-2 text-sm text-muted">
              Update pump and connected tank
              information.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <FuelPumpForm
            mode="edit"
            pumpId={Number(id)}
            initialValues={pump}
          />
        </div>
      </div>
    </AppShell>
  );
}