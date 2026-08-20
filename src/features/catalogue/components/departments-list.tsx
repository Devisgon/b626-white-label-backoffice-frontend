"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  ShieldAlert,
  Trash2,
  Warehouse,
} from "lucide-react";

import type {
  Department,
  DepartmentStatus,
} from "@/features/catalogue/types";

const initialDepartments: Department[] = [
  {
    id: 1,
    name: "Grocery",
    description:
      "Daily grocery and household products",
    defaultTaxRate: 5,
    defaultMargin: 18,
    ageRestriction: false,
    nacsCode: "GRC-01",
    posDepartmentNumber: 10,
    status: "Active",
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },
  {
    id: 2,
    name: "Beverages",
    description:
      "Cold drinks, juices and bottled water",
    defaultTaxRate: 8,
    defaultMargin: 20,
    ageRestriction: false,
    nacsCode: "BEV-02",
    posDepartmentNumber: 20,
    status: "Active",
    createdAt: "16 Aug 2026",
    updatedAt: "19 Aug 2026",
  },
  {
    id: 3,
    name: "Tobacco",
    description:
      "Age-restricted tobacco products",
    defaultTaxRate: 15,
    defaultMargin: 12,
    ageRestriction: true,
    nacsCode: "TOB-03",
    posDepartmentNumber: 30,
    status: "Active",
    createdAt: "15 Aug 2026",
    updatedAt: "18 Aug 2026",
  },
  {
    id: 4,
    name: "Seasonal",
    description:
      "Seasonal and promotional products",
    defaultTaxRate: 5,
    defaultMargin: 25,
    ageRestriction: false,
    nacsCode: "SEA-04",
    posDepartmentNumber: 40,
    status: "Inactive",
    createdAt: "14 Aug 2026",
    updatedAt: "17 Aug 2026",
  },
];

export function DepartmentsList() {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<DepartmentStatus | "all">("all");

  const filteredDepartments = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return departments.filter((department) => {
      const matchesSearch = [
        department.name,
        department.description,
        department.nacsCode,
      ].some((value) =>
        value.toLowerCase().includes(searchValue),
      );

      const matchesStatus =
        status === "all" ||
        department.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [departments, search, status]);

  const activeDepartments = departments.filter(
    (department) =>
      department.status === "Active",
  ).length;

  const inactiveDepartments =
    departments.length - activeDepartments;

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  function removeDepartment(id: number) {
    const shouldRemove = window.confirm(
      "Are you sure you want to delete this department?",
    );

    if (!shouldRemove) {
      return;
    }

    setDepartments((currentDepartments) =>
      currentDepartments.filter(
        (department) => department.id !== id,
      ),
    );
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total departments"
          value={departments.length}
          helper="All store departments"
        />

        <StatCard
          label="Active"
          value={activeDepartments}
          helper="Available for products"
        />

        <StatCard
          label="Inactive"
          value={inactiveDepartments}
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
              Department records
            </h2>

            <p className="mt-1 text-xs text-muted">
              Manage product departments and POS defaults.
            </p>
          </div>

          <Link
            href="/catalog/departments/new"
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl bg-primary px-4
              text-sm font-semibold text-white
              transition hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add department
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
              Search departments
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
              placeholder="Search by name, description or NACS code..."
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
                  | DepartmentStatus
                  | "all",
              )
            }
            aria-label="Filter departments by status"
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
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">
                  Department
                </th>

                <th className="px-5 py-4">
                  Tax / Margin
                </th>

                <th className="px-5 py-4">
                  NACS / POS
                </th>

                <th className="px-5 py-4">
                  Restriction
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
              {filteredDepartments.map((department) => (
                <tr
                  key={department.id}
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
                        <Warehouse className="size-4" />
                      </span>

                      <div>
                        <p className="font-semibold">
                          {department.name}
                        </p>

                        <p className="mt-1 max-w-60 truncate text-xs text-muted">
                          {department.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p>
                      Tax:{" "}
                      <span className="font-semibold">
                        {department.defaultTaxRate ?? 0}%
                      </span>
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      Margin:{" "}
                      {department.defaultMargin ?? 0}%
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium">
                      {department.nacsCode ||
                        "Not provided"}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      POS:{" "}
                      {department.posDepartmentNumber ??
                        "Not provided"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    {department.ageRestriction ? (
                      <span
                        className="
                          inline-flex items-center gap-1.5
                          rounded-full bg-orange-50 px-2.5
                          py-1 text-[10px] font-semibold
                          text-orange-700
                        "
                      >
                        <ShieldAlert className="size-3" />
                        Age restricted
                      </span>
                    ) : (
                      <span className="text-xs text-muted">
                        No restriction
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge
                      status={department.status}
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/catalog/departments/${department.id}`}
                        aria-label={`View ${department.name}`}
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
                        href={`/catalog/departments/${department.id}/edit`}
                        aria-label={`Edit ${department.name}`}
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
                          removeDepartment(department.id)
                        }
                        aria-label={`Delete ${department.name}`}
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

          {filteredDepartments.length === 0 && (
            <div className="px-5 py-14 text-center">
              <Warehouse className="mx-auto size-8 text-muted-light" />

              <p className="mt-3 text-sm font-semibold">
                No departments found
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
            Showing {filteredDepartments.length} of{" "}
            {departments.length} departments
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
  status: DepartmentStatus;
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