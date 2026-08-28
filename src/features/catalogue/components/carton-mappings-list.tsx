"use client";

import Link from "next/link";
import {
  Box,
  Eye,
  Package,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import type { CartonMapping } from "@/features/catalogue/types";

const initialMappings: CartonMapping[] = [
  {
    id: 1,
    carton_product_id: 1,
    child_product_id: 2,
    quantity: 12,
    carton: {
      id: 1,
      name: "Mineral Water Carton",
      sku: "CTN-1001",
    },
    child: {
      id: 2,
      name: "Premium Mineral Water",
      sku: "PRD-1001",
    },
  },
  {
    id: 2,
    carton_product_id: 3,
    child_product_id: 4,
    quantity: 24,
    carton: {
      id: 3,
      name: "Potato Chips Case",
      sku: "CTN-1002",
    },
    child: {
      id: 4,
      name: "Classic Potato Chips",
      sku: "PRD-1002",
    },
  },
  {
    id: 3,
    carton_product_id: 5,
    child_product_id: 6,
    quantity: 6,
    carton: {
      id: 5,
      name: "Coffee Case",
      sku: "CTN-1003",
    },
    child: {
      id: 6,
      name: "Instant Coffee",
      sku: "PRD-1006",
    },
  },
  {
    id: 4,
    carton_product_id: 7,
    child_product_id: 8,
    quantity: 12,
    carton: {
      id: 7,
      name: "Orange Juice Carton",
      sku: "CTN-1004",
    },
    child: {
      id: 8,
      name: "Orange Juice",
      sku: "PRD-1005",
    },
  },
];

export function CartonMappingsList() {
  const [mappings, setMappings] = useState(initialMappings);

  const [search, setSearch] = useState("");

  const [selectedCartonProductId, setSelectedCartonProductId] = useState("All");

  const cartonProducts = useMemo(() => {
    const uniqueCartons = new Map<number, CartonMapping["carton"]>();

    mappings.forEach((mapping) => {
      uniqueCartons.set(mapping.carton.id, mapping.carton);
    });

    return Array.from(uniqueCartons.values());
  }, [mappings]);

  const filteredMappings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return mappings.filter((mapping) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        mapping.carton.name.toLowerCase().includes(normalizedSearch) ||
        mapping.carton.sku.toLowerCase().includes(normalizedSearch) ||
        mapping.child.name.toLowerCase().includes(normalizedSearch) ||
        mapping.child.sku.toLowerCase().includes(normalizedSearch);

      const matchesCarton =
        selectedCartonProductId === "All" ||
        mapping.carton_product_id === Number(selectedCartonProductId);

      return matchesSearch && matchesCarton;
    });
  }, [mappings, search, selectedCartonProductId]);

  const totalUnits = mappings.reduce(
    (total, mapping) => total + mapping.quantity,
    0,
  );

  function resetFilters() {
    setSearch("");
    setSelectedCartonProductId("All");
  }

  function removeMapping(mapping: CartonMapping) {
    const shouldDelete = window.confirm(
      `Delete the mapping between "${mapping.carton.name}" and "${mapping.child.name}"? This is a permanent delete.`,
    );

    if (!shouldDelete) {
      return;
    }

    setMappings((currentMappings) =>
      currentMappings.filter(
        (currentMapping) => currentMapping.id !== mapping.id,
      ),
    );
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total mappings"
          value={String(mappings.length)}
          helper="Carton and unit relationships"
        />

        <StatCard
          title="Carton products"
          value={String(cartonProducts.length)}
          helper="Unique cartons configured"
        />

        <StatCard
          title="Total mapped units"
          value={String(totalUnits)}
          helper="Units across all cartons"
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
            <h2 className="font-bold">Carton mappings</h2>

            <p className="mt-1 text-xs text-muted">
              Manage the unit products and quantities contained inside cartons.
            </p>
          </div>

          <Link
            href="/catalog/carton-mappings/new"
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-4 text-sm font-semibold
              text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add mapping
          </Link>
        </div>

        <div
          className="
            grid gap-3 border-b border-border
            p-5 lg:grid-cols-[minmax(0,1fr)_250px_auto]
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
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by carton, product or SKU..."
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
            value={selectedCartonProductId}
            onChange={(event) => setSelectedCartonProductId(event.target.value)}
            aria-label="Filter by carton product"
            className="
              h-11 rounded-xl border border-border
              bg-white px-3 text-sm outline-none
              focus:border-primary
              focus:ring-4 focus:ring-primary/10
            "
          >
            <option value="All">All carton products</option>

            {cartonProducts.map((carton) => (
              <option key={carton.id} value={carton.id}>
                {carton.name}
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

        {filteredMappings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-surface-secondary">
                <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  <th className="px-5 py-4">Carton product</th>

                  <th className="px-5 py-4">Child product</th>

                  <th className="px-5 py-4">Units per carton</th>

                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredMappings.map((mapping) => (
                  <tr
                    key={mapping.id}
                    className="
                        text-sm transition
                        hover:bg-surface-secondary/50
                      "
                  >
                    <td className="px-5 py-4">
                      <ProductCell
                        name={mapping.carton.name}
                        sku={mapping.carton.sku}
                        type="carton"
                      />
                    </td>

                    <td className="px-5 py-4">
                      <ProductCell
                        name={mapping.child.name}
                        sku={mapping.child.sku}
                        type="child"
                      />
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className="
                            inline-flex rounded-full
                            bg-primary-light px-3 py-1
                            text-xs font-bold text-primary
                          "
                      >
                        {mapping.quantity} units
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/catalog/carton-mappings/${mapping.id}`}
                          aria-label={`View mapping ${mapping.id}`}
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
                          href={`/catalog/carton-mappings/${mapping.id}/edit`}
                          aria-label={`Edit mapping ${mapping.id}`}
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
                          onClick={() => removeMapping(mapping)}
                          aria-label={`Delete mapping ${mapping.id}`}
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
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Box className="mx-auto size-9 text-muted" />

            <h3 className="mt-3 font-semibold">No carton mappings found</h3>

            <p className="mt-1 text-xs text-muted">
              Try changing your filters or create a new carton mapping.
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
            Showing {filteredMappings.length} of {mappings.length} mappings
          </span>

          <span>Dummy data</span>
        </div>
      </section>
    </div>
  );
}

function ProductCell({
  name,
  sku,
  type,
}: {
  name: string;
  sku: string;
  type: "carton" | "child";
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="
          flex size-9 shrink-0 items-center
          justify-center rounded-lg
          bg-primary-light text-primary
        "
      >
        {type === "carton" ? (
          <Box className="size-4" />
        ) : (
          <Package className="size-4" />
        )}
      </span>

      <div>
        <p className="font-semibold">{name}</p>

        <p className="mt-1 text-[11px] text-muted">{sku}</p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  helper,
}: {
  title: string;
  value: string;
  helper: string;
}) {
  return (
    <article
      className="
        rounded-2xl border border-border
        bg-white p-5 shadow-[var(--shadow-sm)]
        transition hover:-translate-y-1
        hover:shadow-[var(--shadow-md)]
      "
    >
      <p className="text-xs text-muted">{title}</p>

      <p className="mt-2 text-2xl font-bold">{value}</p>

      <p className="mt-1 text-[11px] text-muted">{helper}</p>
    </article>
  );
}
