import Link from "next/link";
import {
  ArrowLeft,
  BadgeDollarSign,
  Pencil,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  FuelPriceActionButton,
} from "@/features/fuel/components";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function FuelPriceDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1000px] px-4 py-10">
        <section className="flex justify-between gap-5">
          <div className="flex gap-4">
            <Link
              href="/fuel/prices"
              className="flex size-10 items-center justify-center rounded-xl border border-border"
            >
              <ArrowLeft className="size-4" />
            </Link>

            <div>
              <p className="text-xs font-bold uppercase text-primary">
                Fuel price details
              </p>
              <h1 className="mt-2 text-3xl font-bold">
                Petrol
              </h1>
              <p className="mt-2 text-sm text-muted">
                Price ID: {id}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/fuel/prices/${id}/edit`}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4"
            >
              <Pencil className="size-4" />
              Edit price
            </Link>

            <FuelPriceActionButton
              priceId={Number(id)}
              fuelType="Petrol"
              redirectAfterAction
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-white p-6">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary-light text-primary">
            <BadgeDollarSign className="size-5" />
          </span>

          <p className="mt-6 text-sm text-muted">
            Current price per litre
          </p>

          <p className="mt-2 text-4xl font-bold text-primary">
            PKR 272.50
          </p>

          <dl className="mt-8 divide-y divide-border">
            <Row
              label="Fuel type"
              value="Petrol"
            />
            <Row
              label="Effective from"
              value="25 Aug 2026"
            />
            <Row
              label="Location"
              value="Phoenix Store"
            />
            <Row
              label="Status"
              value="Active"
            />
          </dl>
        </section>
      </div>
    </AppShell>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[180px_1fr]">
      <dt className="text-sm text-muted">
        {label}
      </dt>
      <dd className="text-sm font-semibold">
        {value}
      </dd>
    </div>
  );
}