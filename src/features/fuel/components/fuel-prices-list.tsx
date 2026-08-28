"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeDollarSign,
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";

import { FuelPriceActionButton } from "./fuel-price-action-button";
import type { FuelPrice, FuelPriceStatus } from "@/features/fuel/types";

const prices: FuelPrice[] = [
  {
    id: 1,
    fuel_type: "Petrol",
    price_per_liter: 272.5,
    effective_from: "2026-08-25T00:00:00.000Z",
    location_id: "11111111-1111-4111-8111-111111111111",
    status: "Active",
    created_at: "2026-08-24T09:00:00.000Z",
    updated_at: "2026-08-24T09:00:00.000Z",
    deleted_at: null,
    tenant_id: "tenant-1",
  },
  {
    id: 2,
    fuel_type: "Diesel",
    price_per_liter: 280.25,
    effective_from: "2026-08-25T00:00:00.000Z",
    location_id: "11111111-1111-4111-8111-111111111111",
    status: "Active",
    created_at: "2026-08-24T09:10:00.000Z",
    updated_at: "2026-08-24T09:10:00.000Z",
    deleted_at: null,
    tenant_id: "tenant-1",
  },
  {
    id: 3,
    fuel_type: "Premium Petrol",
    price_per_liter: 295,
    effective_from: "2026-08-20T00:00:00.000Z",
    location_id: "22222222-2222-4222-8222-222222222222",
    status: "Inactive",
    created_at: "2026-08-19T10:00:00.000Z",
    updated_at: "2026-08-22T11:20:00.000Z",
    deleted_at: null,
    tenant_id: "tenant-1",
  },
];

function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 2,
  }).format(Number(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

export function FuelPricesList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FuelPriceStatus | "all">("all");

  const filteredPrices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return prices.filter((price) => {
      const matchesSearch =
        !query || price.fuel_type.toLowerCase().includes(query);

      const matchesStatus = status === "all" || price.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const activePrices = prices.filter(
    (price) => price.status === "Active",
  ).length;

  const averagePrice =
    prices.reduce((total, price) => total + Number(price.price_per_liter), 0) /
    prices.length;

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total prices"
          value={String(prices.length)}
          helper="Price records available"
        />

        <SummaryCard
          title="Active prices"
          value={String(activePrices)}
          helper="Currently available prices"
        />

        <SummaryCard
          title="Average price"
          value={formatCurrency(averagePrice)}
          helper="Average per litre"
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="flex flex-col justify-between gap-4 border-b border-border p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold">Fuel prices</h2>
            <p className="mt-1 text-xs text-muted">
              Manage prices and effective dates.
            </p>
          </div>

          <Link
            href="/fuel/prices/new"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white"
          >
            <Plus className="size-4" />
            Add fuel price
          </Link>
        </div>

        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search fuel type..."
              className="h-11 w-full rounded-xl border border-border pl-11 pr-4 text-sm outline-none"
            />
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as FuelPriceStatus | "all")
            }
            className="h-11 rounded-xl border border-border bg-white px-4 text-sm lg:min-w-44"
          >
            <option value="all">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary-light px-5 text-sm font-semibold text-primary"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-surface-secondary">
              <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="px-5 py-4">Fuel type</th>
                <th className="px-5 py-4">Price per litre</th>
                <th className="px-5 py-4">Effective from</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredPrices.map((price) => (
                <tr key={price.id} className="text-sm">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary">
                        <BadgeDollarSign className="size-4" />
                      </span>
                      <div>
                        <p className="font-semibold">{price.fuel_type}</p>
                        <p className="text-xs text-muted">
                          Price ID: {price.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-bold">
                    {formatCurrency(price.price_per_liter)}
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {formatDate(price.effective_from)}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      {price.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/fuel/prices/${price.id}`}
                        className="flex size-10 items-center justify-center rounded-xl border border-border text-muted"
                      >
                        <Eye className="size-4" />
                      </Link>

                      <Link
                        href={`/fuel/prices/${price.id}/edit`}
                        className="flex size-10 items-center justify-center rounded-xl border border-border text-muted"
                      >
                        <Pencil className="size-4" />
                      </Link>

                      <FuelPriceActionButton
                        priceId={price.id}
                        fuelType={price.fuel_type}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-border px-5 py-4 text-xs text-muted">
          Showing {filteredPrices.length} of {prices.length} prices
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  helper,
}: {
  title: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <p className="text-xs text-muted">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-[11px] text-muted">{helper}</p>
    </article>
  );
}
