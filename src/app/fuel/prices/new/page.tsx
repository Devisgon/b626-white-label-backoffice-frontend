import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { FuelPriceForm } from "@/features/fuel/components";

export default function NewFuelPricePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Link
          href="/fuel/prices"
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div className="mt-5">
          <h1 className="text-3xl font-bold">Add fuel price</h1>
          <p className="mt-2 text-sm text-muted">
            Create a fuel price with its effective date.
          </p>
        </div>

        <div className="mt-8">
          <FuelPriceForm mode="create" />
        </div>
      </div>
    </AppShell>
  );
}
