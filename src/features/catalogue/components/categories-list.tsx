"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Tags,
  Trash2,
} from "lucide-react";

import type { Category, CategoryStatus } from "@/features/catalogue/types";

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Beverages",
    description: "Soft drinks, juices and bottled water",
    status: "Active",
    productCount: 48,
    createdAt: "17 Aug 2026",
    updatedAt: "19 Aug 2026",
  },
  {
    id: 2,
    name: "Snacks",
    description: "Chips, biscuits and packaged snacks",
    status: "Active",
    productCount: 36,
    createdAt: "17 Aug 2026",
    updatedAt: "18 Aug 2026",
  },
  {
    id: 3,
    name: "Grocery",
    description: "Everyday grocery and household essentials",
    status: "Active",
    productCount: 72,
    createdAt: "16 Aug 2026",
    updatedAt: "18 Aug 2026",
  },
  {
    id: 4,
    name: "Personal Care",
    description: "Health, beauty and personal care products",
    status: "Active",
    productCount: 29,
    createdAt: "15 Aug 2026",
    updatedAt: "17 Aug 2026",
  },
  {
    id: 5,
    name: "Seasonal",
    description: "Seasonal and promotional products",
    status: "Inactive",
    productCount: 8,
    createdAt: "14 Aug 2026",
    updatedAt: "16 Aug 2026",
  },
];

export function CategoriesList() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CategoryStatus | "all">("all");

  const filteredCategories = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchValue) ||
        category.description.toLowerCase().includes(searchValue);

      const matchesStatus = status === "all" || category.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, status]);

  const activeCategories = categories.filter(
    (category) => category.status === "Active",
  ).length;

  const inactiveCategories = categories.length - activeCategories;

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  function removeCategory(id: number) {
    const shouldRemove = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!shouldRemove) {
      return;
    }

    setCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== id),
    );
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total categories"
          value={categories.length}
          helper="All catalogue categories"
        />

        <StatCard
          label="Active"
          value={activeCategories}
          helper="Available for products"
        />

        <StatCard
          label="Inactive"
          value={inactiveCategories}
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
            <h2 className="font-bold">Category records</h2>

            <p className="mt-1 text-xs text-muted">
              Search, review and manage product categories.
            </p>
          </div>

          <Link
            href="/catalog/categories/new"
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl bg-primary px-4
              text-sm font-semibold text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add category
          </Link>
        </div>

        <div
          className="
            flex flex-col gap-3 border-b border-border
            p-5 md:flex-row
          "
        >
          <label className="relative flex-1">
            <span className="sr-only">Search categories</span>

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
              placeholder="Search by category name or description..."
              className="
                h-11 w-full rounded-xl border border-border
                bg-white pl-11 pr-4 text-sm outline-none
                transition
                placeholder:text-muted-light
                focus:border-primary
                focus:ring-4 focus:ring-primary/10
              "
            />
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as CategoryStatus | "all")
            }
            aria-label="Filter categories by status"
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
              text-sm font-semibold text-primary
              transition hover:bg-primary hover:text-white
            "
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">Category</th>

                <th className="px-5 py-4">Description</th>

                <th className="px-5 py-4">Products</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Updated</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
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
                        <Tags className="size-4" />
                      </span>

                      <span className="font-semibold">{category.name}</span>
                    </div>
                  </td>

                  <td className="max-w-xs px-5 py-4 text-muted">
                    <p className="truncate">{category.description}</p>
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {category.productCount}
                  </td>

                  <td className="px-5 py-4">
                    <CategoryStatusBadge status={category.status} />
                  </td>

                  <td className="px-5 py-4 text-muted">{category.updatedAt}</td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/catalog/categories/${category.id}`}
                        aria-label={`View ${category.name}`}
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
                        href={`/catalog/categories/${category.id}/edit`}
                        aria-label={`Edit ${category.name}`}
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
                        onClick={() => removeCategory(category.id)}
                        aria-label={`Delete ${category.name}`}
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

          {filteredCategories.length === 0 && (
            <div className="px-5 py-14 text-center">
              <Tags className="mx-auto size-8 text-muted-light" />

              <p className="mt-3 text-sm font-semibold">No categories found</p>

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
            Showing {filteredCategories.length} of {categories.length}{" "}
            categories
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

function StatCard({ label, value, helper }: StatCardProps) {
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

function CategoryStatusBadge({ status }: { status: CategoryStatus }) {
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
