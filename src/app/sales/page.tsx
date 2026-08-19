"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Banknote,
  Eye,
  Plus,
  ReceiptText,
  RotateCcw,
  Search,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import { Button } from "@/components/ui";
import { SaleStatusBadge } from "@/features/sales/components";
import type {
  PaymentMethod,
  SaleStatus,
} from "@/features/sales/types";

interface SaleRow {
  id: number;
  saleNumber: string;
  customerName: string;
  paymentMethod: PaymentMethod;
  itemCount: number;
  total: number;
  status: SaleStatus;
  createdAt: string;
}

const sampleSales: SaleRow[] = [
  {
    id: 1,
    saleNumber: "SAL-2026-00128",
    customerName: "Walk-in customer",
    paymentMethod: "cash",
    itemCount: 4,
    total: 6850,
    status: "completed",
    createdAt: "2026-08-19T10:35:00",
  },
  {
    id: 2,
    saleNumber: "SAL-2026-00127",
    customerName: "Ahmed Khan",
    paymentMethod: "card",
    itemCount: 7,
    total: 12450,
    status: "completed",
    createdAt: "2026-08-19T09:48:00",
  },
  {
    id: 3,
    saleNumber: "SAL-2026-00126",
    customerName: "Sara Ali",
    paymentMethod: "mobile_wallet",
    itemCount: 2,
    total: 3200,
    status: "partially_refunded",
    createdAt: "2026-08-18T17:20:00",
  },
  {
    id: 4,
    saleNumber: "SAL-2026-00125",
    customerName: "Walk-in customer",
    paymentMethod: "cash",
    itemCount: 5,
    total: 7990,
    status: "refunded",
    createdAt: "2026-08-18T15:10:00",
  },
  {
    id: 5,
    saleNumber: "SAL-2026-00124",
    customerName: "Usman Malik",
    paymentMethod: "bank_transfer",
    itemCount: 3,
    total: 5600,
    status: "cancelled",
    createdAt: "2026-08-18T12:45:00",
  },
];

const paymentLabels: Record<PaymentMethod, string> = {
  cash: "Cash",
  card: "Card",
  bank_transfer: "Bank transfer",
  mobile_wallet: "Mobile wallet",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function SalesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | SaleStatus>("all");
  const [paymentMethod, setPaymentMethod] =
    useState<"all" | PaymentMethod>("all");

  const filteredSales = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return sampleSales.filter((sale) => {
      const matchesSearch =
        !normalizedSearch ||
        sale.saleNumber.toLowerCase().includes(normalizedSearch) ||
        sale.customerName.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        status === "all" || sale.status === status;

      const matchesPayment =
        paymentMethod === "all" ||
        sale.paymentMethod === paymentMethod;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [search, status, paymentMethod]);

  function resetFilters() {
    setSearch("");
    setStatus("all");
    setPaymentMethod("all");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Sales management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Sales
            </h1>

            <p className="mt-2 text-sm text-muted">
              View sales, receipts, payments and refunds.
            </p>
          </div>

        <Link
  href="/sales/new"
  className="
    inline-flex h-10 items-center justify-center gap-2
    rounded-xl bg-primary px-4
    text-sm font-semibold text-white
    transition-colors hover:bg-primary-hover
  "
>
  <Plus className="size-4" />
  Create sale
</Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total sales"
            value="1,284"
            helper="126 completed today"
            icon={ShoppingCart}
            iconClassName="bg-emerald-50 text-emerald-700"
          />

          <SummaryCard
            label="Total revenue"
            value="PKR 284,650"
            helper="12.4% from yesterday"
            icon={TrendingUp}
            iconClassName="bg-blue-50 text-blue-700"
          />

          <SummaryCard
            label="Average sale"
            value="PKR 2,218"
            helper="Across completed sales"
            icon={ReceiptText}
            iconClassName="bg-purple-50 text-purple-700"
          />

          <SummaryCard
            label="Refunded"
            value="PKR 8,450"
            helper="6 refunds processed"
            icon={Banknote}
            iconClassName="bg-orange-50 text-orange-700"
          />
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
          <div className="border-b border-border p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search
                  aria-hidden="true"
                  className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search by sale number or customer..."
                  className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>

              <select
                aria-label="Filter by status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as
                      | "all"
                      | SaleStatus,
                  )
                }
                className="h-11 rounded-xl border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              >
                <option value="all">All statuses</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
                <option value="partially_refunded">
                  Partially refunded
                </option>
              </select>

              <select
                aria-label="Filter by payment method"
                value={paymentMethod}
                onChange={(event) =>
                  setPaymentMethod(
                    event.target.value as
                      | "all"
                      | PaymentMethod,
                  )
                }
                className="h-11 rounded-xl border border-border bg-white px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              >
                <option value="all">
                  All payment methods
                </option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bank_transfer">
                  Bank transfer
                </option>
                <option value="mobile_wallet">
                  Mobile wallet
                </option>
              </select>

              <Button
                type="button"
                variant="secondary"
                onClick={resetFilters}
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead className="bg-surface-secondary">
                <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  <th className="px-5 py-4">Sale</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Payment</th>
                  <th className="px-5 py-4">Items</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="text-sm transition-colors hover:bg-surface-secondary/60"
                  >
                    <td className="px-5 py-4 font-semibold text-foreground">
                      {sale.saleNumber}
                    </td>

                    <td className="px-5 py-4 text-muted">
                      {sale.customerName}
                    </td>

                    <td className="px-5 py-4">
                      {paymentLabels[sale.paymentMethod]}
                    </td>

                    <td className="px-5 py-4 text-muted">
                      {sale.itemCount}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {formatCurrency(sale.total)}
                    </td>

                    <td className="px-5 py-4">
                      <SaleStatusBadge
                        status={sale.status}
                      />
                    </td>

                    <td className="px-5 py-4 text-xs text-muted">
                      {formatDate(sale.createdAt)}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/sales/${sale.id}`}
                        aria-label={`View ${sale.saleNumber}`}
                        className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:bg-primary-light hover:text-primary"
                      >
                        <Eye className="size-4" />
                      </Link>
                    </td>
                  </tr>
                ))}

                {filteredSales.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-14 text-center"
                    >
                      <p className="font-semibold">
                        No sales found
                      </p>

                      <p className="mt-1 text-xs text-muted">
                        Change or reset the selected filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-border px-5 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing {filteredSales.length} of{" "}
              {sampleSales.length} sales
            </p>

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" disabled>
                Previous
              </Button>

              <Button variant="secondary" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  helper: string;
  icon: React.ElementType;
  iconClassName: string;
}

function SummaryCard({
  label,
  value,
  helper,
  icon: Icon,
  iconClassName,
}: SummaryCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
      >
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-1 truncate text-xl font-bold">
          {value}
        </p>
        <p className="mt-1 text-[11px] text-muted">
          {helper}
        </p>
      </div>
    </article>
  );
}