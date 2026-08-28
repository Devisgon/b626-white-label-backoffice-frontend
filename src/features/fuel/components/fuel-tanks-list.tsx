"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Database, Eye, Pencil, Plus, RotateCcw, Search } from "lucide-react";

import { FuelTankActionButton } from "./fuel-tank-action-button";
import type { FuelTank, FuelTankStatus } from "@/features/fuel/types";

const fuelTanks: FuelTank[] = [
  {
    id: 1,
    name: "Tank 1 - Premium",
    fuel_type: "Premium Petrol",
    capacity: 20000,
    current_stock: 15000,
    location_id: "11111111-1111-4111-8111-111111111111",
    status: "Active",
    created_at: "2026-08-20T09:00:00.000Z",
    updated_at: "2026-08-24T11:30:00.000Z",
    deleted_at: null,
    tenant_id: "tenant-1",
  },
  {
    id: 2,
    name: "Tank 2 - Diesel",
    fuel_type: "Diesel",
    capacity: 25000,
    current_stock: 18500,
    location_id: "11111111-1111-4111-8111-111111111111",
    status: "Active",
    created_at: "2026-08-18T10:00:00.000Z",
    updated_at: "2026-08-23T09:45:00.000Z",
    deleted_at: null,
    tenant_id: "tenant-1",
  },
  {
    id: 3,
    name: "Tank 3 - Regular",
    fuel_type: "Petrol",
    capacity: 15000,
    current_stock: 9350,
    location_id: "22222222-2222-4222-8222-222222222222",
    status: "Inactive",
    created_at: "2026-08-15T08:30:00.000Z",
    updated_at: "2026-08-22T14:20:00.000Z",
    deleted_at: null,
    tenant_id: "tenant-1",
  },
];

function formatNumber(value: number | string) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(Number(value));
}

export function FuelTanksList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FuelTankStatus | "all">("all");

  const filteredTanks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return fuelTanks.filter((tank) => {
      const matchesSearch =
        !query ||
        tank.name.toLowerCase().includes(query) ||
        tank.fuel_type.toLowerCase().includes(query);

      const matchesStatus = status === "all" || tank.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const activeTanks = fuelTanks.filter(
    (tank) => tank.status === "Active",
  ).length;

  const totalCapacity = fuelTanks.reduce(
    (total, tank) => total + Number(tank.capacity),
    0,
  );

  const totalStock = fuelTanks.reduce(
    (total, tank) => total + Number(tank.current_stock),
    0,
  );

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total capacity"
          value={`${formatNumber(totalCapacity)} L`}
          helper="Across available tanks"
        />

        <SummaryCard
          title="Current stock"
          value={`${formatNumber(totalStock)} L`}
          helper="Available fuel inventory"
        />

        <SummaryCard
          title="Active tanks"
          value={String(activeTanks)}
          helper={`${fuelTanks.length} total tanks`}
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="flex flex-col justify-between gap-4 border-b border-border p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold">Fuel tanks</h2>

            <p className="mt-1 text-xs text-muted">
              Manage capacity, stock and tank availability.
            </p>
          </div>

          <Link
            href="/fuel/tanks/new"
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-5 text-sm font-semibold
              text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add fuel tank
          </Link>
        </div>

        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by tank name or fuel type..."
              className="
                h-11 w-full rounded-xl border
                border-border bg-white pl-11 pr-4
                text-sm outline-none transition
                focus:border-primary
                focus:ring-4 focus:ring-primary/10
              "
            />
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as FuelTankStatus | "all")
            }
            className="h-11 rounded-xl border border-border bg-white px-4 text-sm outline-none lg:min-w-44"
          >
            <option value="all">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary-light px-5 text-sm
              font-semibold text-primary transition
              hover:bg-primary hover:text-white
            "
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-surface-secondary">
              <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="px-5 py-4">Tank</th>
                <th className="px-5 py-4">Fuel type</th>
                <th className="px-5 py-4">Capacity</th>
                <th className="px-5 py-4">Current stock</th>
                <th className="px-5 py-4">Stock level</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredTanks.map((tank) => {
                const percentage =
                  Number(tank.capacity) > 0
                    ? (Number(tank.current_stock) / Number(tank.capacity)) * 100
                    : 0;

                return (
                  <tr
                    key={tank.id}
                    className="text-sm transition hover:bg-surface-secondary/60"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary">
                          <Database className="size-4" />
                        </span>

                        <div>
                          <p className="font-semibold">{tank.name}</p>
                          <p className="mt-1 text-xs text-muted">
                            Tank ID: {tank.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">{tank.fuel_type}</td>

                    <td className="px-5 py-4 font-semibold">
                      {formatNumber(tank.capacity)} L
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {formatNumber(tank.current_stock)} L
                    </td>

                    <td className="px-5 py-4">
                      <div className="w-32">
                        <div className="flex justify-between text-[10px] text-muted">
                          <span>Level</span>
                          <span>{percentage.toFixed(0)}%</span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${Math.min(percentage, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`
                          inline-flex rounded-full
                          px-2.5 py-1 text-[10px]
                          font-semibold
                          ${
                            tank.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-700"
                          }
                        `}
                      >
                        {tank.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/fuel/tanks/${tank.id}`}
                          aria-label={`View ${tank.name}`}
                          className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary"
                        >
                          <Eye className="size-4" />
                        </Link>

                        <Link
                          href={`/fuel/tanks/${tank.id}/edit`}
                          aria-label={`Edit ${tank.name}`}
                          className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary"
                        >
                          <Pencil className="size-4" />
                        </Link>

                        <FuelTankActionButton
                          tankId={tank.id}
                          tankName={tank.name}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTanks.length === 0 && (
          <div className="px-5 py-16 text-center">
            <p className="font-semibold">No fuel tanks found</p>
            <p className="mt-1 text-sm text-muted">
              Try changing or resetting the filters.
            </p>
          </div>
        )}

        <div className="border-t border-border px-5 py-4 text-xs text-muted">
          Showing {filteredTanks.length} of {fuelTanks.length} fuel tanks
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
