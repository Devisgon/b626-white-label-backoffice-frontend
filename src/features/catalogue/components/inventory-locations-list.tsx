"use client";

import Link from "next/link";
import {
  Eye,
  MapPin,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Warehouse,
} from "lucide-react";
import { useMemo, useState } from "react";

import type {
  InventoryLocation,
  InventoryLocationStatus,
} from "@/features/catalogue/types";

const initialLocations: InventoryLocation[] = [
  {
    id: 1,
    name: "Main Warehouse",
    code: "WH-001",
    address: "Main Branch, Lahore",
    status: "Active",
  },
  {
    id: 2,
    name: "Store Stock Room",
    code: "STR-001",
    address: "Phoenix Store, Punjab",
    status: "Active",
  },
  {
    id: 3,
    name: "Cold Storage",
    code: "CS-001",
    address: "Warehouse Block B, Lahore",
    status: "Active",
  },
  {
    id: 4,
    name: "Previous Storage Area",
    code: "OLD-001",
    address: "Old Store Branch, Punjab",
    status: "Inactive",
  },
];

export function InventoryLocationsList() {
  const [locations, setLocations] =
    useState(initialLocations);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<
      "All" | InventoryLocationStatus
    >("All");

  const filteredLocations = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return locations.filter((location) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        location.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        location.code
          .toLowerCase()
          .includes(normalizedSearch) ||
        location.address
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" ||
        location.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [locations, search, statusFilter]);

  const activeLocations =
    locations.filter(
      (location) =>
        location.status === "Active",
    ).length;

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
  }

  function removeLocation(
    location: InventoryLocation,
  ) {
    const shouldDelete = window.confirm(
      `Delete "${location.name}"? This action will be connected to the backend later.`,
    );

    if (!shouldDelete) {
      return;
    }

    setLocations((currentLocations) =>
      currentLocations.filter(
        (currentLocation) =>
          currentLocation.id !== location.id,
      ),
    );
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total locations"
          value={String(locations.length)}
          helper="All inventory locations"
        />

        <StatCard
          title="Active locations"
          value={String(activeLocations)}
          helper="Currently available"
        />

        <StatCard
          title="Inactive locations"
          value={String(
            locations.length -
              activeLocations,
          )}
          helper="Not currently in use"
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
            <h2 className="font-bold">
              Inventory locations
            </h2>

            <p className="mt-1 text-xs text-muted">
              Manage warehouses, stock rooms and
              other inventory storage locations.
            </p>
          </div>

          <Link
            href="/catalog/inventory-locations/new"
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-4 text-sm font-semibold
              text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add location
          </Link>
        </div>

        <div
          className="
            grid gap-3 border-b border-border
            p-5 lg:grid-cols-[minmax(0,1fr)_200px_auto]
          "
        >
          <div className="relative">
            <Search
              className="
                pointer-events-none absolute
                left-4 top-1/2 size-4
                -translate-y-1/2 text-muted
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, code or address..."
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
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | "All"
                  | InventoryLocationStatus,
              )
            }
            aria-label="Filter locations by status"
            className="
              h-11 rounded-xl border border-border
              bg-white px-3 text-sm outline-none
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          >
            <option value="All">
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
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary-light px-4 text-sm
              font-semibold text-primary transition
              hover:bg-primary hover:text-white
            "
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        {filteredLocations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-surface-secondary">
                <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  <th className="px-5 py-4">
                    Location
                  </th>

                  <th className="px-5 py-4">
                    Code
                  </th>

                  <th className="px-5 py-4">
                    Address
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
                {filteredLocations.map(
                  (location) => (
                    <tr
                      key={location.id}
                      className="
                        text-sm transition
                        hover:bg-surface-secondary/50
                      "
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="
                              flex size-9 shrink-0
                              items-center justify-center
                              rounded-lg bg-primary-light
                              text-primary
                            "
                          >
                            <Warehouse className="size-4" />
                          </span>

                          <span className="font-semibold">
                            {location.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className="
                            rounded-lg
                            bg-surface-secondary
                            px-2.5 py-1 text-xs
                            font-semibold text-muted
                          "
                        >
                          {location.code}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-muted">
                        <span className="flex items-center gap-2">
                          <MapPin className="size-3.5 shrink-0" />

                          {location.address ||
                            "Not provided"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex rounded-full
                            px-2.5 py-1 text-[10px]
                            font-semibold
                            ${
                              location.status ===
                              "Active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }
                          `}
                        >
                          {location.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/catalog/inventory-locations/${location.id}`}
                            aria-label={`View ${location.name}`}
                            className="
                              flex size-9 items-center
                              justify-center rounded-lg
                              border border-border
                              text-muted transition
                              hover:border-primary
                              hover:bg-primary-light
                              hover:text-primary
                            "
                          >
                            <Eye className="size-4" />
                          </Link>

                          <Link
                            href={`/catalog/inventory-locations/${location.id}/edit`}
                            aria-label={`Edit ${location.name}`}
                            className="
                              flex size-9 items-center
                              justify-center rounded-lg
                              border border-border
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
                            onClick={() =>
                              removeLocation(
                                location,
                              )
                            }
                            aria-label={`Delete ${location.name}`}
                            className="
                              flex size-9 items-center
                              justify-center rounded-lg
                              border border-border
                              text-muted transition
                              hover:border-red-200
                              hover:bg-red-50
                              hover:text-red-600
                            "
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Warehouse className="mx-auto size-9 text-muted" />

            <h3 className="mt-3 font-semibold">
              No locations found
            </h3>

            <p className="mt-1 text-xs text-muted">
              Try changing your search or status
              filter.
            </p>
          </div>
        )}

        <div
          className="
            flex items-center justify-between
            border-t border-border px-5 py-4
            text-xs text-muted
          "
        >
          <span>
            Showing {filteredLocations.length} of{" "}
            {locations.length} locations
          </span>

          <span>
            Dummy data
          </span>
        </div>
      </section>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  helper: string;
}

function StatCard({
  title,
  value,
  helper,
}: StatCardProps) {
  return (
    <article
      className="
        rounded-2xl border border-border
        bg-white p-5 shadow-[var(--shadow-sm)]
        transition hover:-translate-y-1
        hover:shadow-[var(--shadow-md)]
      "
    >
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