"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Mail,
  Pencil,
  Phone,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Truck,
} from "lucide-react";

import type { Supplier, SupplierStatus } from "@/features/catalogue/types";

const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Nestle Pakistan",
    email: "orders@nestle.pk",
    phone: "+92 300 1234567",
    address: "Lahore, Pakistan",
    status: "Active",
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },
  {
    id: 2,
    name: "National Foods",
    email: "supply@nationalfoods.com",
    phone: "+92 321 7654321",
    address: "Karachi, Pakistan",
    status: "Active",
    createdAt: "16 Aug 2026",
    updatedAt: "19 Aug 2026",
  },
  {
    id: 3,
    name: "Punjab Beverages",
    email: "sales@punjabbeverages.pk",
    phone: "+92 333 1122334",
    address: "Faisalabad, Pakistan",
    status: "Active",
    createdAt: "15 Aug 2026",
    updatedAt: "18 Aug 2026",
  },
  {
    id: 4,
    name: "Local Wholesale Supply",
    email: "",
    phone: "+92 305 9988776",
    address: "Sahiwal, Pakistan",
    status: "Inactive",
    createdAt: "14 Aug 2026",
    updatedAt: "17 Aug 2026",
  },
];

export function SuppliersList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<SupplierStatus | "all">("all");

  const filteredSuppliers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return suppliers.filter((supplier) => {
      const matchesSearch = [
        supplier.name,
        supplier.email,
        supplier.phone,
        supplier.address,
      ].some((value) => value.toLowerCase().includes(searchValue));

      const matchesStatus = status === "all" || supplier.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, search, status]);

  const activeSuppliers = suppliers.filter(
    (supplier) => supplier.status === "Active",
  ).length;

  const inactiveSuppliers = suppliers.length - activeSuppliers;

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  function removeSupplier(id: number) {
    const shouldRemove = window.confirm(
      "Are you sure you want to delete this supplier?",
    );

    if (!shouldRemove) {
      return;
    }

    setSuppliers((currentSuppliers) =>
      currentSuppliers.filter((supplier) => supplier.id !== id),
    );
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total suppliers"
          value={suppliers.length}
          helper="All catalogue suppliers"
        />

        <StatCard
          label="Active"
          value={activeSuppliers}
          helper="Available for purchasing"
        />

        <StatCard
          label="Inactive"
          value={inactiveSuppliers}
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
            <h2 className="font-bold">Supplier records</h2>

            <p className="mt-1 text-xs text-muted">
              Search, review and manage store suppliers.
            </p>
          </div>

          <Link
            href="/catalog/suppliers/new"
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl bg-primary px-4
              text-sm font-semibold text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add supplier
          </Link>
        </div>

        <div
          className="
            flex flex-col gap-3 border-b border-border
            p-5 md:flex-row
          "
        >
          <label className="relative flex-1">
            <span className="sr-only">Search suppliers</span>

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
              placeholder="Search by supplier name, email, phone or address..."
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
              setStatus(event.target.value as SupplierStatus | "all")
            }
            aria-label="Filter suppliers by status"
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
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">Supplier</th>

                <th className="px-5 py-4">Contact</th>

                <th className="px-5 py-4">Address</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4">Updated</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.id}
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
                        <Truck className="size-4" />
                      </span>

                      <span className="font-semibold">{supplier.name}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="space-y-1.5 text-xs text-muted">
                      <p className="flex items-center gap-2">
                        <Mail className="size-3.5" />
                        {supplier.email || "Not provided"}
                      </p>

                      <p className="flex items-center gap-2">
                        <Phone className="size-3.5" />
                        {supplier.phone || "Not provided"}
                      </p>
                    </div>
                  </td>

                  <td className="max-w-xs px-5 py-4 text-muted">
                    <p className="truncate">
                      {supplier.address || "Not provided"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <SupplierStatusBadge status={supplier.status} />
                  </td>

                  <td className="px-5 py-4 text-muted">{supplier.updatedAt}</td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/catalog/suppliers/${supplier.id}`}
                        aria-label={`View ${supplier.name}`}
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
                        href={`/catalog/suppliers/${supplier.id}/edit`}
                        aria-label={`Edit ${supplier.name}`}
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
                        onClick={() => removeSupplier(supplier.id)}
                        aria-label={`Delete ${supplier.name}`}
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

          {filteredSuppliers.length === 0 && (
            <div className="px-5 py-14 text-center">
              <Truck className="mx-auto size-8 text-muted-light" />

              <p className="mt-3 text-sm font-semibold">No suppliers found</p>

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
            Showing {filteredSuppliers.length} of {suppliers.length} suppliers
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

function SupplierStatusBadge({ status }: { status: SupplierStatus }) {
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
