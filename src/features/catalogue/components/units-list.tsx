"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Ruler,
  Search,
  Trash2,
} from "lucide-react";

import type { Unit, UnitStatus } from "@/features/catalogue/types";

const initialUnits: Unit[] = [
  {
    id: 1,
    name: "Piece",
    shortName: "pc",
    status: "Active",
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },
  {
    id: 2,
    name: "Kilogram",
    shortName: "kg",
    status: "Active",
    createdAt: "16 Aug 2026",
    updatedAt: "19 Aug 2026",
  },
  {
    id: 3,
    name: "Liter",
    shortName: "L",
    status: "Active",
    createdAt: "15 Aug 2026",
    updatedAt: "18 Aug 2026",
  },
  {
    id: 4,
    name: "Carton",
    shortName: "ctn",
    status: "Inactive",
    createdAt: "14 Aug 2026",
    updatedAt: "17 Aug 2026",
  },
];

export function UnitsList() {
  const [units, setUnits] = useState<Unit[]>(initialUnits);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<UnitStatus | "all">("all");

  const filteredUnits = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return units.filter((unit) => {
      const matchesSearch =
        unit.name.toLowerCase().includes(searchValue) ||
        unit.shortName.toLowerCase().includes(searchValue);

      const matchesStatus = status === "all" || unit.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [units, search, status]);

  const activeUnits = units.filter((unit) => unit.status === "Active").length;

  const inactiveUnits = units.length - activeUnits;

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  function removeUnit(id: number) {
    const shouldRemove = window.confirm(
      "Are you sure you want to delete this unit?",
    );

    if (!shouldRemove) {
      return;
    }

    setUnits((currentUnits) => currentUnits.filter((unit) => unit.id !== id));
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total units"
          value={units.length}
          helper="All measurement units"
        />

        <StatCard
          label="Active"
          value={activeUnits}
          helper="Available for products"
        />

        <StatCard
          label="Inactive"
          value={inactiveUnits}
          helper="Currently unavailable"
        />
      </section>

      <section
        className="
          mt-6 overflow-hidden rounded-2xl
          border border-border bg-white
          shadow-[var(--shadow-sm)]
        "
      >
        <div
          className="
            flex flex-col justify-between gap-4
            border-b border-border p-5
            lg:flex-row lg:items-center
          "
        >
          <div>
            <h2 className="font-bold">Unit records</h2>

            <p className="mt-1 text-xs text-muted">
              Manage product measurement and packaging units.
            </p>
          </div>

          <Link
            href="/catalog/units/new"
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl bg-primary px-4
              text-sm font-semibold text-white
              transition hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add unit
          </Link>
        </div>

        <div
          className="
            flex flex-col gap-3 border-b border-border
            p-5 md:flex-row
          "
        >
          <label className="relative flex-1">
            <span className="sr-only">Search units</span>

            <Search
              className="
                absolute left-4 top-1/2 size-4
                -translate-y-1/2 text-muted
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by unit name or short name..."
              className="
                h-11 w-full rounded-xl border
                border-border bg-white pl-11 pr-4
                text-sm outline-none transition
                placeholder:text-muted-light
                focus:border-primary
                focus:ring-4 focus:ring-primary/10
              "
            />
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as UnitStatus | "all")
            }
            aria-label="Filter units by status"
            className="
              h-11 rounded-xl border border-border
              bg-white px-4 text-sm outline-none
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
              md:min-w-44
            "
          >
            <option value="all">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="
              inline-flex h-11 items-center justify-center
              gap-2 rounded-xl bg-primary-light px-4
              text-sm font-semibold text-primary transition
              hover:bg-primary hover:text-white
            "
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">Unit</th>

                <th className="px-5 py-4">Short name</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Updated</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredUnits.map((unit) => (
                <tr
                  key={unit.id}
                  className="
                    text-sm transition
                    hover:bg-surface-secondary/60
                  "
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          flex size-9 shrink-0 items-center
                          justify-center rounded-lg
                          bg-primary-light text-primary
                        "
                      >
                        <Ruler className="size-4" />
                      </span>

                      <span className="font-semibold">{unit.name}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className="
                        rounded-lg bg-surface-secondary
                        px-2.5 py-1 text-xs font-semibold
                      "
                    >
                      {unit.shortName || "Not provided"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={unit.status} />
                  </td>

                  <td className="px-5 py-4 text-muted">{unit.updatedAt}</td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/catalog/units/${unit.id}`}
                        aria-label={`View ${unit.name}`}
                        className="
                          flex size-9 items-center justify-center
                          rounded-lg border border-border
                          text-muted transition
                          hover:border-primary
                          hover:bg-primary-light
                          hover:text-primary
                        "
                      >
                        <Eye className="size-4" />
                      </Link>

                      <Link
                        href={`/catalog/units/${unit.id}/edit`}
                        aria-label={`Edit ${unit.name}`}
                        className="
                          flex size-9 items-center justify-center
                          rounded-lg border border-border
                          text-muted transition
                          hover:border-primary
                          hover:bg-primary-light
                          hover:text-primary
                        "
                      >
                        <Pencil className="size-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeUnit(unit.id)}
                        aria-label={`Delete ${unit.name}`}
                        className="
                          flex size-9 items-center justify-center
                          rounded-lg border border-border
                          text-muted transition
                          hover:border-red-200
                          hover:bg-red-50
                          hover:text-danger
                        "
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUnits.length === 0 && (
            <div className="px-5 py-14 text-center">
              <Ruler className="mx-auto size-8 text-muted-light" />

              <p className="mt-3 text-sm font-semibold">No units found</p>

              <p className="mt-1 text-xs text-muted">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        <div
          className="
            flex items-center justify-between
            border-t border-border px-5 py-4
            text-xs text-muted
          "
        >
          <span>
            Showing {filteredUnits.length} of {units.length} units
          </span>

          <span>Dummy data for frontend testing</span>
        </div>
      </section>
    </>
  );
}

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <article
      className="
        rounded-2xl border border-border bg-white
        p-5 shadow-[var(--shadow-sm)]
        transition hover:-translate-y-1
        hover:shadow-[var(--shadow-md)]
      "
    >
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-[11px] text-muted">{helper}</p>
    </article>
  );
}

function StatusBadge({ status }: { status: UnitStatus }) {
  return (
    <span
      className={`
        inline-flex rounded-full px-2.5 py-1
        text-[10px] font-semibold
        ${
          status === "Active"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-600"
        }
      `}
    >
      {status}
    </span>
  );
}
