"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Pencil,
  Plus,
  Power,
  RotateCcw,
  Search,
} from "lucide-react";

import type {
  Payee,
  PayeeStatus,
  PayeeType,
} from "@/features/banking/types";

const initialPayees: Payee[] = [
  {
    id: "3e28d5fa-97c2-4fa9-8000-100000000001",
    payeeName: "Pakistan State Oil",
    payeeType: "vendor",
    email: "billing@pso.com.pk",
    phone: "+92 21 111 111 776",
    city: "Karachi",
    country: "Pakistan",
    taxId: "NTN-PSO-1001",
    defaultAccountId:
      "1f83751c-54b1-4d50-85cd-100000000001",
    status: "active",
    createdAt: "2026-02-10T09:00:00.000Z",
    updatedAt: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "3e28d5fa-97c2-4fa9-8000-100000000002",
    payeeName: "Nestle Pakistan",
    payeeType: "supplier",
    email: "orders@nestle.pk",
    phone: "+92 300 1234567",
    city: "Lahore",
    state: "Punjab",
    country: "Pakistan",
    taxId: "NTN-NES-2002",
    defaultAccountId:
      "1f83751c-54b1-4d50-85cd-100000000001",
    status: "active",
    createdAt: "2026-03-12T09:30:00.000Z",
    updatedAt: "2026-08-20T11:15:00.000Z",
  },
  {
    id: "3e28d5fa-97c2-4fa9-8000-100000000003",
    payeeName: "Lahore Electric Supply Company",
    payeeType: "utility",
    email: "billing@lesco.gov.pk",
    phone: "118",
    city: "Lahore",
    state: "Punjab",
    country: "Pakistan",
    taxId: "UTILITY-3003",
    defaultAccountId:
      "1f83751c-54b1-4d50-85cd-100000000001",
    status: "active",
    createdAt: "2026-04-05T10:00:00.000Z",
    updatedAt: "2026-08-19T12:00:00.000Z",
  },
  {
    id: "3e28d5fa-97c2-4fa9-8000-100000000004",
    payeeName: "Ahmed Khan",
    payeeType: "individual",
    email: "ahmed.khan@example.com",
    phone: "+92 301 9876543",
    city: "Lahore",
    country: "Pakistan",
    defaultAccountId: null,
    status: "active",
    createdAt: "2026-05-01T11:00:00.000Z",
    updatedAt: "2026-08-18T09:45:00.000Z",
  },
  {
    id: "3e28d5fa-97c2-4fa9-8000-100000000005",
    payeeName: "Previous Maintenance Service",
    payeeType: "other",
    email: "maintenance@example.com",
    phone: "+92 302 5554321",
    city: "Lahore",
    country: "Pakistan",
    defaultAccountId: null,
    status: "inactive",
    createdAt: "2026-01-15T08:00:00.000Z",
    updatedAt: "2026-08-17T14:30:00.000Z",
  },
];

function formatPayeeType(type: PayeeType) {
  return (
    type.charAt(0).toUpperCase() +
    type.slice(1)
  );
}

export function PayeesList() {
  const [payees, setPayees] =
    useState(initialPayees);

  const [search, setSearch] = useState("");

  const [type, setType] =
    useState<PayeeType | "all">("all");

  const [status, setStatus] =
    useState<PayeeStatus | "all">("all");

  const filteredPayees = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return payees.filter((payee) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        payee.payeeName
          .toLowerCase()
          .includes(normalizedSearch) ||
        payee.email
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        payee.phone
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesType =
        type === "all" ||
        payee.payeeType === type;

      const matchesStatus =
        status === "all" ||
        payee.status === status;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [payees, search, type, status]);

  const activePayees = payees.filter(
    (payee) => payee.status === "active",
  ).length;

  const supplierPayees = payees.filter(
    (payee) =>
      payee.payeeType === "supplier" ||
      payee.payeeType === "vendor",
  ).length;

  function resetFilters() {
    setSearch("");
    setType("all");
    setStatus("all");
  }

  function deactivatePayee(
    payeeId: string,
    payeeName: string,
  ) {
    const confirmed = window.confirm(
      `Are you sure you want to deactivate ${payeeName}?`,
    );

    if (!confirmed) {
      return;
    }

    setPayees((currentPayees) =>
      currentPayees.map((payee) =>
        payee.id === payeeId
          ? {
              ...payee,
              status: "inactive",
            }
          : payee,
      ),
    );
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total payees"
          value={payees.length}
        />

        <SummaryCard
          label="Active payees"
          value={activePayees}
        />

        <SummaryCard
          label="Vendors and suppliers"
          value={supplierPayees}
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
      sm:flex-row sm:items-center
    "
  >
    <div>
      <h2 className="font-bold">
        Payees
      </h2>

      <p className="mt-1 text-xs text-muted">
        Manage payment recipients and their
        account details.
      </p>
    </div>

    <Link
      href="/bank/payees/new"
      className="
        inline-flex h-10 items-center
        justify-center gap-2 rounded-xl
        bg-primary px-4 text-sm font-semibold
        text-white transition
        hover:bg-primary-hover
      "
    >
      <Plus className="size-4" />
      Add payee
    </Link>
  </div>

  <div
    className="
      flex flex-col gap-3 border-b
      border-border p-4 lg:flex-row
    "
  >
    <div className="relative min-w-0 flex-1">
      <Search
        className="
          pointer-events-none absolute left-4
          top-1/2 size-4 -translate-y-1/2
          text-muted
        "
      />

      <input
        type="search"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Search by name, email or phone..."
        className="
          h-11 w-full rounded-xl border
          border-border bg-white pl-11 pr-4
          text-sm text-black outline-none
          transition placeholder:text-gray-500
          focus:border-primary
          focus:ring-4 focus:ring-primary/10
        "
      />
    </div>

    <select
      value={type}
      onChange={(event) =>
        setType(
          event.target.value as
            | PayeeType
            | "all",
        )
      }
      aria-label="Filter by payee type"
      className="
        h-11 rounded-xl border border-border
        bg-white px-4 text-sm text-black
        outline-none transition
        focus:border-primary
        focus:ring-4 focus:ring-primary/10
        lg:min-w-40
      "
    >
      <option value="all">
        All types
      </option>

      <option value="vendor">
        Vendor
      </option>

      <option value="supplier">
        Supplier
      </option>

      <option value="individual">
        Individual
      </option>

      <option value="utility">
        Utility
      </option>

      <option value="other">
        Other
      </option>
    </select>

    <select
      value={status}
      onChange={(event) =>
        setStatus(
          event.target.value as
            | PayeeStatus
            | "all",
        )
      }
      aria-label="Filter by payee status"
      className="
        h-11 rounded-xl border border-border
        bg-white px-4 text-sm text-black
        outline-none transition
        focus:border-primary
        focus:ring-4 focus:ring-primary/10
        lg:min-w-40
      "
    >
      <option value="all">
        All statuses
      </option>

      <option value="active">
        Active
      </option>

      <option value="inactive">
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">
                  Payee
                </th>

                <th className="px-5 py-4">
                  Type
                </th>

                <th className="px-5 py-4">
                  Contact
                </th>

                <th className="px-5 py-4">
                  Location
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
              {filteredPayees.map((payee) => (
                <tr
                  key={payee.id}
                  className="
                    text-sm transition
                    hover:bg-surface-secondary/60
                  "
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      {payee.payeeName}
                    </p>

                    <p className="mt-1 text-[11px] text-muted">
                      ID: {payee.id.slice(0, 8)}...
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className="
                        inline-flex rounded-full
                        bg-blue-50 px-2.5 py-1
                        text-[10px] font-semibold
                        text-blue-700
                      "
                    >
                      {formatPayeeType(
                        payee.payeeType,
                      )}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <p>
                      {payee.email || "Not provided"}
                    </p>

                    <p className="mt-1 text-xs text-muted">
                      {payee.phone || "No phone"}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {[payee.city, payee.country]
                      .filter(Boolean)
                      .join(", ") ||
                      "Not provided"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`
                        inline-flex rounded-full
                        px-2.5 py-1 text-[10px]
                        font-semibold
                        ${
                          payee.status === "active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {payee.status === "active"
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <ActionLink
                        href={`/bank/payees/${payee.id}`}
                        label={`View ${payee.payeeName}`}
                      >
                        <Eye className="size-4" />
                      </ActionLink>

                      <ActionLink
                        href={`/bank/payees/${payee.id}/edit`}
                        label={`Edit ${payee.payeeName}`}
                      >
                        <Pencil className="size-4" />
                      </ActionLink>

                      <button
                        type="button"
                        onClick={() =>
                          deactivatePayee(
                            payee.id,
                            payee.payeeName,
                          )
                        }
                        disabled={
                          payee.status === "inactive"
                        }
                        aria-label={`Deactivate ${payee.payeeName}`}
                        title="Deactivate payee"
                        className="
                          flex size-9 items-center
                          justify-center rounded-lg
                          border border-border text-muted
                          transition hover:border-red-200
                          hover:bg-red-50 hover:text-red-600
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <Power className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayees.length === 0 && (
          <div className="px-5 py-14 text-center">
            <p className="font-semibold">
              No payees found
            </p>

            <p className="mt-1 text-xs text-muted">
              Try changing or resetting the filters.
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
            Showing {filteredPayees.length} of{" "}
            {payees.length} payees
          </span>

          <span>Page 1 of 1</span>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <article
      className="
        rounded-2xl border border-border
        bg-white p-5 shadow-[var(--shadow-sm)]
        transition hover:-translate-y-0.5
        hover:shadow-[var(--shadow-md)]
      "
    >
      <p className="text-xs text-muted">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </article>
  );
}

function ActionLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="
        flex size-9 items-center justify-center
        rounded-lg border border-border
        text-muted transition
        hover:border-primary hover:bg-primary-light
        hover:text-primary
      "
    >
      {children}
    </Link>
  );
}