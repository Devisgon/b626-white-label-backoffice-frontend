"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";

import type {
  FundTransfer,
  TransferStatus,
} from "@/features/banking/types";

interface TransferListItem extends FundTransfer {
  sourceAccountName: string;
  destinationAccountName: string;
}

const transfers: TransferListItem[] = [
  {
    id: "a1111111-1111-4111-8111-111111111111",
    tenantId: "tenant-1",
    locationId: "location-1",
    sourceAccountId:
      "11111111-1111-4111-8111-111111111111",
    destinationAccountId:
      "22222222-2222-4222-8222-222222222222",
    sourceAccountName:
      "HBL Main Operating Account",
    destinationAccountName:
      "Meezan Business Account",
    amount: 250000,
    transferDate: "2026-08-23",
    memo: "Monthly operating fund allocation",
    sourceTransactionId:
      "61111111-1111-4111-8111-111111111111",
    destinationTransactionId:
      "71111111-1111-4111-8111-111111111111",
    status: "posted",
    voidedAt: null,
    voidReason: null,
    createdAt: "2026-08-23T10:30:00.000Z",
    updatedAt: "2026-08-23T10:30:00.000Z",
    createdBy: "user-1",
    updatedBy: null,
  },
  {
    id: "a2222222-2222-4222-8222-222222222222",
    tenantId: "tenant-1",
    locationId: "location-1",
    sourceAccountId:
      "22222222-2222-4222-8222-222222222222",
    destinationAccountId:
      "33333333-3333-4333-8333-333333333333",
    sourceAccountName:
      "Meezan Business Account",
    destinationAccountName:
      "UBL Petty Cash Account",
    amount: 75000,
    transferDate: "2026-08-22",
    memo: "Weekly petty cash allocation",
    sourceTransactionId:
      "62222222-2222-4222-8222-222222222222",
    destinationTransactionId:
      "72222222-2222-4222-8222-222222222222",
    status: "posted",
    voidedAt: null,
    voidReason: null,
    createdAt: "2026-08-22T09:15:00.000Z",
    updatedAt: "2026-08-22T09:15:00.000Z",
    createdBy: "user-1",
    updatedBy: null,
  },
  {
    id: "a3333333-3333-4333-8333-333333333333",
    tenantId: "tenant-1",
    locationId: "location-1",
    sourceAccountId:
      "11111111-1111-4111-8111-111111111111",
    destinationAccountId:
      "33333333-3333-4333-8333-333333333333",
    sourceAccountName:
      "HBL Main Operating Account",
    destinationAccountName:
      "UBL Petty Cash Account",
    amount: 50000,
    transferDate: "2026-08-20",
    memo: "Transfer entered with incorrect amount",
    sourceTransactionId:
      "63333333-3333-4333-8333-333333333333",
    destinationTransactionId:
      "73333333-3333-4333-8333-333333333333",
    status: "voided",
    voidedAt: "2026-08-20T13:45:00.000Z",
    voidReason:
      "Incorrect amount entered during transfer.",
    createdAt: "2026-08-20T12:40:00.000Z",
    updatedAt: "2026-08-20T13:45:00.000Z",
    createdBy: "user-1",
    updatedBy: "user-1",
  },
  {
    id: "a4444444-4444-4444-8444-444444444444",
    tenantId: "tenant-1",
    locationId: "location-1",
    sourceAccountId:
      "22222222-2222-4222-8222-222222222222",
    destinationAccountId:
      "11111111-1111-4111-8111-111111111111",
    sourceAccountName:
      "Meezan Business Account",
    destinationAccountName:
      "HBL Main Operating Account",
    amount: 125000,
    transferDate: "2026-08-18",
    memo: "Balance consolidation",
    sourceTransactionId:
      "64444444-4444-4444-8444-444444444444",
    destinationTransactionId:
      "74444444-4444-4444-8444-444444444444",
    status: "posted",
    voidedAt: null,
    voidReason: null,
    createdAt: "2026-08-18T15:20:00.000Z",
    updatedAt: "2026-08-18T15:20:00.000Z",
    createdBy: "user-1",
    updatedBy: null,
  },
];

function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function TransfersList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    TransferStatus | "all"
  >("all");

  const filteredTransfers = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return transfers.filter((transfer) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        transfer.sourceAccountName
          .toLowerCase()
          .includes(normalizedSearch) ||
        transfer.destinationAccountName
          .toLowerCase()
          .includes(normalizedSearch) ||
        transfer.memo
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        transfer.id
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        status === "all" ||
        transfer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const postedTransfers = transfers.filter(
    (transfer) => transfer.status === "posted",
  );

  const totalTransferred = postedTransfers.reduce(
    (total, transfer) =>
      total + Number(transfer.amount),
    0,
  );

  const voidedTransfers = transfers.filter(
    (transfer) => transfer.status === "voided",
  ).length;

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <article
          className="
            rounded-2xl border border-border
            bg-white p-5 shadow-[var(--shadow-sm)]
          "
        >
          <p className="text-xs text-muted">
            Total transferred
          </p>

          <p className="mt-2 text-2xl font-bold">
            {formatCurrency(totalTransferred)}
          </p>

          <p className="mt-1 text-[11px] text-muted">
            Across posted transfers
          </p>
        </article>

        <article
          className="
            rounded-2xl border border-border
            bg-white p-5 shadow-[var(--shadow-sm)]
          "
        >
          <p className="text-xs text-muted">
            Posted transfers
          </p>

          <p className="mt-2 text-2xl font-bold">
            {postedTransfers.length}
          </p>

          <p className="mt-1 text-[11px] text-success">
            Successfully processed
          </p>
        </article>

        <article
          className="
            rounded-2xl border border-border
            bg-white p-5 shadow-[var(--shadow-sm)]
          "
        >
          <p className="text-xs text-muted">
            Voided transfers
          </p>

          <p className="mt-2 text-2xl font-bold">
            {voidedTransfers}
          </p>

          <p className="mt-1 text-[11px] text-muted">
            Reversed transfer records
          </p>
        </article>
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
              Fund transfers
            </h2>

            <p className="mt-1 text-xs text-muted">
              Manage transfers between company bank
              accounts.
            </p>
          </div>

          <Link
            href="/bank/transfers/new"
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-5 text-sm font-semibold
              text-white transition
              hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Create transfer
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
              placeholder="Search by account or memo..."
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
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | TransferStatus
                  | "all",
              )
            }
            aria-label="Filter transfers by status"
            className="
              h-11 rounded-xl border border-border
              bg-white px-4 text-sm outline-none
              transition focus:border-primary
              focus:ring-4 focus:ring-primary/10
              lg:min-w-44
            "
          >
            <option value="all">
              All statuses
            </option>

            <option value="posted">
              Posted
            </option>

            <option value="voided">
              Voided
            </option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary-light px-5 text-sm
              font-semibold text-primary transition
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
                <th className="px-5 py-4">
                  Transfer
                </th>

                <th className="px-5 py-4">
                  Source account
                </th>

                <th className="px-5 py-4">
                  Destination account
                </th>

                <th className="px-5 py-4">
                  Amount
                </th>

                <th className="px-5 py-4">
                  Date
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredTransfers.map((transfer) => (
                <tr
                  key={transfer.id}
                  className="
                    text-sm transition
                    hover:bg-surface-secondary/60
                  "
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold">
                      Fund transfer
                    </p>

                    <p className="mt-1 max-w-48 truncate text-xs text-muted">
                      {transfer.memo || "No memo"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="
                          flex size-8 shrink-0 items-center
                          justify-center rounded-lg
                          bg-orange-50 text-orange-700
                        "
                      >
                        <ArrowUpRight className="size-4" />
                      </span>

                      <span className="font-medium">
                        {transfer.sourceAccountName}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="
                          flex size-8 shrink-0 items-center
                          justify-center rounded-lg
                          bg-emerald-50 text-emerald-700
                        "
                      >
                        <ArrowDownLeft className="size-4" />
                      </span>

                      <span className="font-medium">
                        {
                          transfer.destinationAccountName
                        }
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-bold">
                    {formatCurrency(transfer.amount)}
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {formatDate(
                      transfer.transferDate,
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <TransferStatusBadge
                      status={transfer.status}
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <Link
                        href={`/bank/transfers/${transfer.id}`}
                        aria-label="View transfer details"
                        className="
                          flex size-10 items-center
                          justify-center rounded-xl
                          border border-border bg-white
                          text-muted transition
                          hover:border-primary
                          hover:bg-primary-light
                          hover:text-primary
                        "
                      >
                        <Eye className="size-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransfers.length === 0 && (
          <div className="px-5 py-16 text-center">
            <p className="font-semibold">
              No transfers found
            </p>

            <p className="mt-1 text-sm text-muted">
              Try changing or resetting the filters.
            </p>
          </div>
        )}

        <div
          className="
            flex flex-col justify-between gap-3
            border-t border-border px-5 py-4
            text-xs text-muted sm:flex-row
            sm:items-center
          "
        >
          <p>
            Showing {filteredTransfers.length} of{" "}
            {transfers.length} transfers
          </p>

          <p>
            Transfer data is currently used for
            frontend testing.
          </p>
        </div>
      </section>
    </div>
  );
}

function TransferStatusBadge({
  status,
}: {
  status: TransferStatus;
}) {
  const styles =
    status === "posted"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-red-50 text-red-700";

  return (
    <span
      className={`
        inline-flex rounded-full px-2.5 py-1
        text-[10px] font-semibold capitalize
        ${styles}
      `}
    >
      {status}
    </span>
  );
}