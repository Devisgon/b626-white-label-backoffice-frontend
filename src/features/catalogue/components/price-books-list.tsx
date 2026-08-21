"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpenCheck,
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";

import type {
  PriceBook,
  PriceBookStatus,
} from "@/features/catalogue/types";

const initialPriceBooks: PriceBook[] = [
  {
    id: 1,
    name: "Standard Retail Prices",
    description:
      "Default retail prices for store products",
    status: "Active",
    itemCount: 48,
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },
  {
    id: 2,
    name: "Wholesale Prices",
    description:
      "Special prices for wholesale customers",
    status: "Active",
    itemCount: 32,
    createdAt: "16 Aug 2026",
    updatedAt: "19 Aug 2026",
  },
  {
    id: 3,
    name: "Ramadan Promotion",
    description:
      "Promotional prices for the Ramadan campaign",
    status: "Active",
    itemCount: 18,
    createdAt: "15 Aug 2026",
    updatedAt: "18 Aug 2026",
  },
  {
    id: 4,
    name: "Previous Promotion",
    description:
      "Prices from a completed promotional campaign",
    status: "Inactive",
    itemCount: 12,
    createdAt: "14 Aug 2026",
    updatedAt: "17 Aug 2026",
  },
];

export function PriceBooksList() {
  const [priceBooks, setPriceBooks] =
    useState<PriceBook[]>(initialPriceBooks);

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<PriceBookStatus | "all">("all");

  const filteredPriceBooks = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return priceBooks.filter((priceBook) => {
      const matchesSearch =
        priceBook.name
          .toLowerCase()
          .includes(searchValue) ||
        priceBook.description
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "all" ||
        priceBook.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [priceBooks, search, status]);

  const activePriceBooks = priceBooks.filter(
    (priceBook) => priceBook.status === "Active",
  ).length;

  const totalItems = priceBooks.reduce(
    (total, priceBook) =>
      total + priceBook.itemCount,
    0,
  );

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  function removePriceBook(id: number) {
    const shouldRemove = window.confirm(
      "Deleting a price book will also permanently delete all of its price items. Continue?",
    );

    if (!shouldRemove) {
      return;
    }

    setPriceBooks((currentPriceBooks) =>
      currentPriceBooks.filter(
        (priceBook) => priceBook.id !== id,
      ),
    );
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total price books"
          value={priceBooks.length}
          helper="All pricing collections"
        />

        <StatCard
          label="Active"
          value={activePriceBooks}
          helper="Currently available"
        />

        <StatCard
          label="Price items"
          value={totalItems}
          helper="Products with custom prices"
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
              Price book records
            </h2>

            <p className="mt-1 text-xs text-muted">
              Manage price books and custom product
              prices.
            </p>
          </div>

          <Link
            href="/catalog/price-books/new"
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl bg-primary px-4
              text-sm font-semibold text-white
              transition hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add price book
          </Link>
        </div>

        <div
          className="
            flex flex-col gap-3 border-b border-border
            p-5 md:flex-row
          "
        >
          <label className="relative flex-1">
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
              placeholder="Search by price book name or description..."
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
                  | PriceBookStatus
                  | "all",
              )
            }
            aria-label="Filter price books by status"
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
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">
                  Price book
                </th>

                <th className="px-5 py-4">
                  Items
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
              {filteredPriceBooks.map((priceBook) => (
                <tr
                  key={priceBook.id}
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
                        <BookOpenCheck className="size-4" />
                      </span>

                      <div>
                        <p className="font-semibold">
                          {priceBook.name}
                        </p>

                        <p className="mt-1 max-w-sm truncate text-xs text-muted">
                          {priceBook.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-semibold">
                      {priceBook.itemCount}
                    </span>{" "}
                    <span className="text-xs text-muted">
                      products
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={priceBook.status}
                    />
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {priceBook.updatedAt}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/catalog/price-books/${priceBook.id}`}
                        aria-label={`View ${priceBook.name}`}
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
                        href={`/catalog/price-books/${priceBook.id}/edit`}
                        aria-label={`Edit ${priceBook.name}`}
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
                          removePriceBook(priceBook.id)
                        }
                        aria-label={`Delete ${priceBook.name}`}
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

          {filteredPriceBooks.length === 0 && (
            <div className="px-5 py-14 text-center">
              <BookOpenCheck className="mx-auto size-8 text-muted-light" />

              <p className="mt-3 text-sm font-semibold">
                No price books found
              </p>

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
            Showing {filteredPriceBooks.length} of{" "}
            {priceBooks.length} price books
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
      <p className="mt-1 text-[11px] text-muted">
        {helper}
      </p>
    </article>
  );
}

function StatusBadge({
  status,
}: {
  status: PriceBookStatus;
}) {
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