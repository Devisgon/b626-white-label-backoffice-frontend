"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Eye,
  MapPin,
  Package,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Warehouse,
} from "lucide-react";
import { useMemo, useState } from "react";

import type {
  ProductInventory,
} from "@/features/catalogue/types";

const initialRecords: ProductInventory[] = [
  {
    id: 1,
    product_id: 1,
    location_id: 1,
    on_hand_quantity: 120,
    reserved_quantity: 10,
    reorder_level: 30,
    minimum_stock: 20,
    maximum_stock: 300,
    product: {
      id: 1,
      name: "Premium Mineral Water",
      sku: "PRD-1001",
    },
    location: {
      id: 1,
      name: "Main Warehouse",
      code: "WH-001",
    },
  },
  {
    id: 2,
    product_id: 2,
    location_id: 2,
    on_hand_quantity: 8,
    reserved_quantity: 2,
    reorder_level: 20,
    minimum_stock: 15,
    maximum_stock: 200,
    product: {
      id: 2,
      name: "Classic Potato Chips",
      sku: "PRD-1002",
    },
    location: {
      id: 2,
      name: "Store Stock Room",
      code: "STR-001",
    },
  },
  {
    id: 3,
    product_id: 4,
    location_id: 3,
    on_hand_quantity: 45,
    reserved_quantity: 5,
    reorder_level: 15,
    minimum_stock: 10,
    maximum_stock: 100,
    product: {
      id: 4,
      name: "Fresh Milk",
      sku: "PRD-1004",
    },
    location: {
      id: 3,
      name: "Cold Storage",
      code: "CS-001",
    },
  },
  {
    id: 4,
    product_id: 6,
    location_id: 1,
    on_hand_quantity: 5,
    reserved_quantity: 1,
    reorder_level: 15,
    minimum_stock: 12,
    maximum_stock: 80,
    product: {
      id: 6,
      name: "Instant Coffee",
      sku: "PRD-1006",
    },
    location: {
      id: 1,
      name: "Main Warehouse",
      code: "WH-001",
    },
  },
];

export function ProductInventoryList() {
  const [records, setRecords] =
    useState(initialRecords);

  const [search, setSearch] =
    useState("");

  const [locationFilter, setLocationFilter] =
    useState("All");

  const locations = useMemo(() => {
    const uniqueLocations = new Map<
      number,
      NonNullable<
        ProductInventory["location"]
      >
    >();

    records.forEach((record) => {
      if (record.location) {
        uniqueLocations.set(
          record.location.id,
          record.location,
        );
      }
    });

    return Array.from(
      uniqueLocations.values(),
    );
  }, [records]);

  const filteredRecords = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        record.product?.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        record.product?.sku
          .toLowerCase()
          .includes(normalizedSearch) ||
        record.location?.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        record.location?.code
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesLocation =
        locationFilter === "All" ||
        record.location_id ===
          Number(locationFilter);

      return (
        matchesSearch && matchesLocation
      );
    });
  }, [records, search, locationFilter]);

  const lowStockItems = records.filter(
    (record) =>
      record.on_hand_quantity <=
      (record.reorder_level ?? 10),
  ).length;

  const availableStock = records.reduce(
    (total, record) =>
      total +
      Math.max(
        0,
        record.on_hand_quantity -
          record.reserved_quantity,
      ),
    0,
  );

  function resetFilters() {
    setSearch("");
    setLocationFilter("All");
  }

  function removeRecord(
    record: ProductInventory,
  ) {
    const shouldDelete = window.confirm(
      `Remove "${record.product?.name}" from "${record.location?.name}"? This record can be restored after backend integration.`,
    );

    if (!shouldDelete) {
      return;
    }

    setRecords((currentRecords) =>
      currentRecords.filter(
        (currentRecord) =>
          currentRecord.id !== record.id,
      ),
    );
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Product assignments"
          value={String(records.length)}
          helper="Product and location records"
          icon={<Warehouse className="size-5" />}
        />

        <StatCard
          title="Available stock"
          value={String(availableStock)}
          helper="Units available across locations"
          icon={<Package className="size-5" />}
        />

        <StatCard
          title="Low stock"
          value={String(lowStockItems)}
          helper="Items requiring attention"
          warning
          icon={
            <AlertTriangle className="size-5" />
          }
        />
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="flex flex-col justify-between gap-4 border-b border-border p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-bold">
              Product inventory
            </h2>

            <p className="mt-1 text-xs text-muted">
              Manage product stock across inventory
              locations.
            </p>
          </div>

          <Link
            href="/catalog/product-inventory/new"
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-4 text-sm font-semibold
              text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Assign product
          </Link>
        </div>

        <div className="grid gap-3 border-b border-border p-5 lg:grid-cols-[minmax(0,1fr)_250px_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by product, SKU or location..."
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
            value={locationFilter}
            onChange={(event) =>
              setLocationFilter(
                event.target.value,
              )
            }
            aria-label="Filter by inventory location"
            className="
              h-11 rounded-xl border border-border
              bg-white px-3 text-sm outline-none
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          >
            <option value="All">
              All locations
            </option>

            {locations.map((location) => (
              <option
                key={location.id}
                value={location.id}
              >
                {location.name}
              </option>
            ))}
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

        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-surface-secondary">
                <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  <th className="px-5 py-4">
                    Product
                  </th>

                  <th className="px-5 py-4">
                    Location
                  </th>

                  <th className="px-5 py-4">
                    On hand
                  </th>

                  <th className="px-5 py-4">
                    Reserved
                  </th>

                  <th className="px-5 py-4">
                    Available
                  </th>

                  <th className="px-5 py-4">
                    Stock status
                  </th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredRecords.map(
                  (record) => {
                    const available =
                      Math.max(
                        0,
                        record.on_hand_quantity -
                          record.reserved_quantity,
                      );

                    const isLowStock =
                      record.on_hand_quantity <=
                      (record.reorder_level ??
                        10);

                    return (
                      <tr
                        key={record.id}
                        className="text-sm transition hover:bg-surface-secondary/50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                              <Package className="size-4" />
                            </span>

                            <div>
                              <p className="font-semibold">
                                {
                                  record.product
                                    ?.name
                                }
                              </p>

                              <p className="mt-1 text-[11px] text-muted">
                                {
                                  record.product
                                    ?.sku
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="size-3.5 text-muted" />

                            <div>
                              <p className="font-medium">
                                {
                                  record.location
                                    ?.name
                                }
                              </p>

                              <p className="text-[10px] text-muted">
                                {
                                  record.location
                                    ?.code
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 font-semibold">
                          {
                            record.on_hand_quantity
                          }
                        </td>

                        <td className="px-5 py-4 text-muted">
                          {
                            record.reserved_quantity
                          }
                        </td>

                        <td className="px-5 py-4 font-bold text-primary">
                          {available}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`
                              inline-flex rounded-full
                              px-2.5 py-1 text-[10px]
                              font-semibold
                              ${
                                isLowStock
                                  ? "bg-orange-50 text-orange-700"
                                  : "bg-emerald-50 text-emerald-700"
                              }
                            `}
                          >
                            {isLowStock
                              ? "Low stock"
                              : "In stock"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/catalog/product-inventory/${record.id}`}
                              aria-label={`View ${record.product?.name}`}
                              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary"
                            >
                              <Eye className="size-4" />
                            </Link>

                            <Link
                              href={`/catalog/product-inventory/${record.id}/edit`}
                              aria-label={`Edit ${record.product?.name}`}
                              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary"
                            >
                              <Pencil className="size-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                removeRecord(
                                  record,
                                )
                              }
                              aria-label={`Delete ${record.product?.name}`}
                              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Warehouse className="mx-auto size-9 text-muted" />

            <h3 className="mt-3 font-semibold">
              No product inventory found
            </h3>

            <p className="mt-1 text-xs text-muted">
              Try changing your search or location
              filter.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border px-5 py-4 text-xs text-muted">
          <span>
            Showing {filteredRecords.length} of{" "}
            {records.length} records
          </span>

          <span>Dummy data</span>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  helper,
  icon,
  warning = false,
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  warning?: boolean;
}) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <span
        className={`
          flex size-11 shrink-0 items-center
          justify-center rounded-xl
          ${
            warning
              ? "bg-orange-50 text-orange-700"
              : "bg-primary-light text-primary"
          }
        `}
      >
        {icon}
      </span>

      <div>
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 text-xl font-bold">
          {value}
        </p>

        <p className="mt-1 text-[10px] text-muted">
          {helper}
        </p>
      </div>
    </article>
  );
}