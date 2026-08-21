"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Eye,
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
  Inventory,
  InventoryStatus,
} from "@/features/catalogue/types";

const initialInventory: Inventory[] = [
  {
    id: 1,
    product_id: 1,
    quantity: 120,
    reserved_quantity: 10,
    available_quantity: 110,
    minimum_stock: 20,
    maximum_stock: 300,
    reorder_level: 30,
    warehouse: "Main Warehouse",
    status: "Active",
    products: {
      id: 1,
      name: "Premium Mineral Water",
      sku: "PRD-1001",
    },
  },
  {
    id: 2,
    product_id: 2,
    quantity: 8,
    reserved_quantity: 2,
    available_quantity: 6,
    minimum_stock: 15,
    maximum_stock: 200,
    reorder_level: 20,
    warehouse: "Store Stock Room",
    status: "Active",
    products: {
      id: 2,
      name: "Classic Potato Chips",
      sku: "PRD-1002",
    },
  },
  {
    id: 3,
    product_id: 4,
    quantity: 45,
    reserved_quantity: 5,
    available_quantity: 40,
    minimum_stock: 10,
    maximum_stock: 100,
    reorder_level: 15,
    warehouse: "Cold Storage",
    status: "Active",
    products: {
      id: 4,
      name: "Fresh Milk",
      sku: "PRD-1004",
    },
  },
  {
    id: 4,
    product_id: 6,
    quantity: 5,
    reserved_quantity: 1,
    available_quantity: 4,
    minimum_stock: 12,
    maximum_stock: 80,
    reorder_level: 15,
    warehouse: "Main Warehouse",
    status: "Inactive",
    products: {
      id: 6,
      name: "Instant Coffee",
      sku: "PRD-1006",
    },
  },
];

export function InventoryList() {
  const [records, setRecords] =
    useState(initialInventory);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<
      "All" | InventoryStatus
    >("All");

  const filteredRecords = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return records.filter((record) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        record.products?.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        record.products?.sku
          .toLowerCase()
          .includes(normalizedSearch) ||
        record.warehouse
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const lowStockRecords = records.filter(
    (record) =>
      record.quantity <=
      (record.reorder_level ?? 10),
  ).length;

  const availableStock = records.reduce(
    (total, record) =>
      total + record.available_quantity,
    0,
  );

  function resetFilters() {
    setSearch("");
    setStatusFilter("All");
  }

  function removeRecord(record: Inventory) {
    const shouldDelete = window.confirm(
      `Delete the inventory record for "${record.products?.name}"? It can be restored after backend integration.`,
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
          title="Inventory records"
          value={String(records.length)}
          helper="Products with stock records"
          icon={
            <Warehouse className="size-5" />
          }
        />

        <StatCard
          title="Available stock"
          value={String(availableStock)}
          helper="Units available for sale"
          icon={
            <Package className="size-5" />
          }
        />

        <StatCard
          title="Low stock"
          value={String(lowStockRecords)}
          helper="Items at or below reorder level"
          warning
          icon={
            <AlertTriangle className="size-5" />
          }
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
              Inventory records
            </h2>

            <p className="mt-1 text-xs text-muted">
              Manage product quantities, reserved
              stock and reorder levels.
            </p>
          </div>

          <Link
            href="/catalog/inventory/new"
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-4 text-sm font-semibold
              text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add inventory
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
              placeholder="Search by product, SKU or warehouse..."
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
                  | InventoryStatus,
              )
            }
            aria-label="Filter inventory by status"
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

        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-surface-secondary">
                <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  <th className="px-5 py-4">
                    Product
                  </th>

                  <th className="px-5 py-4">
                    Warehouse
                  </th>

                  <th className="px-5 py-4">
                    Total
                  </th>

                  <th className="px-5 py-4">
                    Reserved
                  </th>

                  <th className="px-5 py-4">
                    Available
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
                {filteredRecords.map(
                  (record) => {
                    const isLowStock =
                      record.quantity <=
                      (record.reorder_level ??
                        10);

                    return (
                      <tr
                        key={record.id}
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
                                items-center
                                justify-center
                                rounded-lg
                                bg-primary-light
                                text-primary
                              "
                            >
                              <Package className="size-4" />
                            </span>

                            <div>
                              <p className="font-semibold">
                                {
                                  record.products
                                    ?.name
                                }
                              </p>

                              <p className="mt-1 text-[11px] text-muted">
                                {
                                  record.products
                                    ?.sku
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-muted">
                          {record.warehouse}
                        </td>

                        <td className="px-5 py-4 font-semibold">
                          {record.quantity}
                        </td>

                        <td className="px-5 py-4 text-muted">
                          {
                            record.reserved_quantity
                          }
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={
                              isLowStock
                                ? "font-bold text-orange-600"
                                : "font-bold text-primary"
                            }
                          >
                            {
                              record.available_quantity
                            }
                          </span>

                          {isLowStock && (
                            <span className="ml-2 inline-flex rounded-full bg-orange-50 px-2 py-1 text-[9px] font-semibold text-orange-700">
                              Low stock
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`
                              inline-flex rounded-full
                              px-2.5 py-1 text-[10px]
                              font-semibold
                              ${
                                record.status ===
                                "Active"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-600"
                              }
                            `}
                          >
                            {record.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/catalog/inventory/${record.id}`}
                              aria-label={`View ${record.products?.name}`}
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
                              href={`/catalog/inventory/${record.id}/edit`}
                              aria-label={`Edit ${record.products?.name}`}
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
                                removeRecord(
                                  record,
                                )
                              }
                              aria-label={`Delete ${record.products?.name}`}
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
              No inventory records found
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
    <article
      className="
        flex items-center gap-4 rounded-2xl
        border border-border bg-white p-5
        shadow-[var(--shadow-sm)]
        transition hover:-translate-y-1
        hover:shadow-[var(--shadow-md)]
      "
    >
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