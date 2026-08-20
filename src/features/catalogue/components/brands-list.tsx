"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";

import type {
  Brand,
  BrandStatus,
} from "@/features/catalogue/types";

const initialBrands: Brand[] = [
  {
    id: 1,
    name: "Nestle",
    description:
      "Food, beverage and consumer product brand",
    status: "Active",
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },
  {
    id: 2,
    name: "Coca-Cola",
    description:
      "Soft drinks and beverage products",
    status: "Active",
    createdAt: "17 Aug 2026",
    updatedAt: "19 Aug 2026",
  },
  {
    id: 3,
    name: "Unilever",
    description:
      "Personal care and household products",
    status: "Active",
    createdAt: "16 Aug 2026",
    updatedAt: "19 Aug 2026",
  },
  {
    id: 4,
    name: "Local Choice",
    description:
      "Locally sourced store products",
    status: "Inactive",
    createdAt: "15 Aug 2026",
    updatedAt: "18 Aug 2026",
  },
];

export function BrandsList() {
  const [brands, setBrands] =
    useState<Brand[]>(initialBrands);

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<BrandStatus | "all">("all");

  const filteredBrands = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return brands.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(searchValue) ||
        brand.description
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "all" || brand.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [brands, search, status]);

  const activeBrands = brands.filter(
    (brand) => brand.status === "Active",
  ).length;

  const inactiveBrands =
    brands.length - activeBrands;

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  function removeBrand(id: number) {
    const shouldRemove = window.confirm(
      "Are you sure you want to delete this brand?",
    );

    if (!shouldRemove) {
      return;
    }

    setBrands((currentBrands) =>
      currentBrands.filter(
        (brand) => brand.id !== id,
      ),
    );
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total brands"
          value={brands.length}
          helper="All catalogue brands"
        />

        <StatCard
          label="Active"
          value={activeBrands}
          helper="Available for products"
        />

        <StatCard
          label="Inactive"
          value={inactiveBrands}
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
            <h2 className="font-bold">
              Brand records
            </h2>

            <p className="mt-1 text-xs text-muted">
              Search, review and manage product brands.
            </p>
          </div>

          <Link
            href="/catalog/brands/new"
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl bg-primary px-4
              text-sm font-semibold text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add brand
          </Link>
        </div>

        <div
          className="
            flex flex-col gap-3 border-b border-border
            p-5 md:flex-row
          "
        >
          <label className="relative flex-1">
            <span className="sr-only">
              Search brands
            </span>

            <Search
              className="
                absolute left-4 top-1/2 size-4
                -translate-y-1/2 text-muted
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by brand name or description..."
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
              setStatus(
                event.target.value as
                  | BrandStatus
                  | "all",
              )
            }
            aria-label="Filter brands by status"
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
          <table className="w-full min-w-[780px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">
                  Brand
                </th>

                <th className="px-5 py-4">
                  Description
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4">
                  Updated
                </th>

                <th className="px-5 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredBrands.map((brand) => (
                <tr
                  key={brand.id}
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
                        <Building2 className="size-4" />
                      </span>

                      <span className="font-semibold">
                        {brand.name}
                      </span>
                    </div>
                  </td>

                  <td className="max-w-xs px-5 py-4 text-muted">
                    <p className="truncate">
                      {brand.description}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <BrandStatusBadge
                      status={brand.status}
                    />
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {brand.updatedAt}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/catalog/brands/${brand.id}`}
                        aria-label={`View ${brand.name}`}
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
                        href={`/catalog/brands/${brand.id}/edit`}
                        aria-label={`Edit ${brand.name}`}
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
                        onClick={() =>
                          removeBrand(brand.id)
                        }
                        aria-label={`Delete ${brand.name}`}
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

          {filteredBrands.length === 0 && (
            <div className="px-5 py-14 text-center">
              <Building2 className="mx-auto size-8 text-muted-light" />

              <p className="mt-3 text-sm font-semibold">
                No brands found
              </p>

              <p className="mt-1 text-xs text-muted">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>

        <div
          className="
            flex items-center justify-between gap-4
            border-t border-border px-5 py-4
            text-xs text-muted
          "
        >
          <span>
            Showing {filteredBrands.length} of{" "}
            {brands.length} brands
          </span>

          <span>Dummy data for frontend testing</span>
        </div>
      </section>
    </>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  helper: string;
}

function StatCard({
  label,
  value,
  helper,
}: StatCardProps) {
  return (
    <article
      className="
        rounded-2xl border border-border bg-white
        p-5 shadow-[var(--shadow-sm)]
        transition hover:-translate-y-1
        hover:shadow-[var(--shadow-md)]
      "
    >
      <p className="text-xs text-muted">
        {label}
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

function BrandStatusBadge({
  status,
}: {
  status: BrandStatus;
}) {
  const styles =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`
        inline-flex rounded-full px-2.5 py-1
        text-[10px] font-semibold ${styles}
      `}
    >
      {status}
    </span>
  );
}