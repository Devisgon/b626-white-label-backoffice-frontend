"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Fuel,
  Pencil,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";

import {
  FuelPumpActionButton,
} from "./fuel-pump-action-button";
import type {
  FuelPump,
  FuelPumpStatus,
} from "@/features/fuel/types";

interface FuelPumpListItem extends FuelPump {
  tankName: string;
  fuelType: string;
  locationName: string;
}

const fuelPumps: FuelPumpListItem[] = [
  {
    id: 1,
    name: "Pump 1",
    tank_id: 1,
    tankName: "Tank 1 - Premium",
    fuelType: "Premium Petrol",
    locationName: "Phoenix Store",
    location_id:
      "11111111-1111-4111-8111-111111111111",
    status: "Active",
    created_at: "2026-08-20T09:00:00.000Z",
    updated_at: "2026-08-24T11:30:00.000Z",
    deleted_at: null,
    tenant_id: "tenant-1",
  },
  {
    id: 2,
    name: "Pump 2",
    tank_id: 2,
    tankName: "Tank 2 - Diesel",
    fuelType: "Diesel",
    locationName: "Phoenix Store",
    location_id:
      "11111111-1111-4111-8111-111111111111",
    status: "Active",
    created_at: "2026-08-19T10:00:00.000Z",
    updated_at: "2026-08-23T12:20:00.000Z",
    deleted_at: null,
    tenant_id: "tenant-1",
  },
  {
    id: 3,
    name: "Pump 3",
    tank_id: 3,
    tankName: "Tank 3 - Regular",
    fuelType: "Petrol",
    locationName: "Central Fuel Station",
    location_id:
      "22222222-2222-4222-8222-222222222222",
    status: "Inactive",
    created_at: "2026-08-18T08:30:00.000Z",
    updated_at: "2026-08-22T14:20:00.000Z",
    deleted_at: null,
    tenant_id: "tenant-1",
  },
];

export function FuelPumpsList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    FuelPumpStatus | "all"
  >("all");

  const filteredPumps = useMemo(() => {
    const query = search.trim().toLowerCase();

    return fuelPumps.filter((pump) => {
      const matchesSearch =
        !query ||
        pump.name.toLowerCase().includes(query) ||
        pump.tankName
          .toLowerCase()
          .includes(query) ||
        pump.fuelType
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" ||
        pump.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const activeCount = fuelPumps.filter(
    (pump) => pump.status === "Active",
  ).length;

  const uniqueTanks = new Set(
    fuelPumps.map((pump) => pump.tank_id),
  ).size;

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total pumps"
          value={String(fuelPumps.length)}
          helper="Configured fuel pumps"
        />

        <SummaryCard
          title="Active pumps"
          value={String(activeCount)}
          helper="Available for fuel sales"
        />

        <SummaryCard
          title="Connected tanks"
          value={String(uniqueTanks)}
          helper="Tanks currently in use"
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="flex flex-col justify-between gap-4 border-b border-border p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold">
              Fuel pumps
            </h2>
            <p className="mt-1 text-xs text-muted">
              Manage pumps and connected tanks.
            </p>
          </div>

          <Link
            href="/fuel/pumps/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            <Plus className="size-4" />
            Add fuel pump
          </Link>
        </div>

        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search pump, tank or fuel type..."
              className="h-11 w-full rounded-xl border border-border bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | FuelPumpStatus
                  | "all",
              )
            }
            className="h-11 rounded-xl border border-border bg-white px-4 text-sm lg:min-w-44"
          >
            <option value="all">
              All statuses
            </option>
            <option value="Active">
              Active
            </option>
            <option value="Inactive">
              Inactive
            </option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-light px-5 text-sm font-semibold text-primary hover:bg-primary hover:text-white"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-surface-secondary">
              <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="px-5 py-4">
                  Pump
                </th>
                <th className="px-5 py-4">
                  Connected tank
                </th>
                <th className="px-5 py-4">
                  Fuel type
                </th>
                <th className="px-5 py-4">
                  Location
                </th>
                <th className="px-5 py-4">
                  Status
                </th>
                <th className="px-5 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredPumps.map((pump) => (
                <tr
                  key={pump.id}
                  className="text-sm transition hover:bg-surface-secondary/60"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary">
                        <Fuel className="size-4" />
                      </span>

                      <div>
                        <p className="font-semibold">
                          {pump.name}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          Pump ID: {pump.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {pump.tankName}
                  </td>

                  <td className="px-5 py-4">
                    {pump.fuelType}
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {pump.locationName}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`
                        rounded-full px-2.5 py-1
                        text-[10px] font-semibold
                        ${
                          pump.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-700"
                        }
                      `}
                    >
                      {pump.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/fuel/pumps/${pump.id}`}
                        className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted hover:border-primary hover:bg-primary-light hover:text-primary"
                      >
                        <Eye className="size-4" />
                      </Link>

                      <Link
                        href={`/fuel/pumps/${pump.id}/edit`}
                        className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted hover:border-primary hover:bg-primary-light hover:text-primary"
                      >
                        <Pencil className="size-4" />
                      </Link>

                      <FuelPumpActionButton
                        pumpId={pump.id}
                        pumpName={pump.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPumps.length === 0 && (
          <div className="px-5 py-16 text-center">
            <p className="font-semibold">
              No fuel pumps found
            </p>
          </div>
        )}

        <div className="border-t border-border px-5 py-4 text-xs text-muted">
          Showing {filteredPumps.length} of{" "}
          {fuelPumps.length} fuel pumps
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
      <p className="text-xs text-muted">
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-muted">
        {helper}
      </p>
    </article>
  );
}