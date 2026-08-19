import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Package,
  ReceiptText,
  UserRound,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  CancelSaleButton,
  ReceiptDownloadButton,
  RefundSaleButton,
  RestoreSaleButton,
  SaleStatusBadge,
} from "@/features/sales/components";

interface SaleDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const saleDetails = {
  saleNumber: "SAL-2026-00128",
  customerName: "Walk-in customer",
  customerPhone: "Not provided",
  paymentMethod: "Cash",
  status: "completed" as const,
  date: "19 Aug 2026, 10:35",
  subtotal: 6500,
  tax: 350,
  discount: 0,
  total: 6850,
  items: [
    {
      id: 1,
      name: "Premium Mineral Water",
      sku: "PRD-1001",
      quantity: 2,
      price: 120,
      total: 240,
    },
    {
      id: 2,
      name: "Classic Potato Chips",
      sku: "PRD-1002",
      quantity: 3,
      price: 180,
      total: 540,
    },
    {
      id: 3,
      name: "Instant Coffee",
      sku: "PRD-1006",
      quantity: 1,
      price: 6070,
      total: 6070,
    },
  ],
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function SaleDetailsPage({
  params,
}: SaleDetailsPageProps) {
  const { id } = await params;
  const currentStatus =
  id === "5"
    ? ("cancelled" as const)
    : saleDetails.status;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="flex items-start gap-4">
            <Link
              href="/sales"
              aria-label="Return to sales"
              className="
                flex size-10 shrink-0 items-center justify-center
                rounded-xl border border-border bg-white
                text-muted transition
                hover:border-primary hover:bg-primary-light
                hover:text-primary
              "
            >
              <ArrowLeft className="size-4" />
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Sale details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {saleDetails.saleNumber}
                </h1>

               <SaleStatusBadge status={currentStatus} />
              </div>

              <p className="mt-2 text-sm text-muted">
                Record ID: {id} · {saleDetails.date}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {currentStatus === "cancelled" ? (
              <RestoreSaleButton
                saleId={id}
                saleNumber={saleDetails.saleNumber}
              />
            ) : (
              <>
                <CancelSaleButton
                  saleId={id}
                  saleNumber={saleDetails.saleNumber}
                />

                <RefundSaleButton
                  saleNumber={saleDetails.saleNumber}
                  items={saleDetails.items}
                />
              </>
            )}

            <ReceiptDownloadButton
              saleNumber={saleDetails.saleNumber}
              customerName={saleDetails.customerName}
              customerPhone={saleDetails.customerPhone}
              paymentMethod={saleDetails.paymentMethod}
              date={saleDetails.date}
              subtotal={saleDetails.subtotal}
              tax={saleDetails.tax}
              discount={saleDetails.discount}
              total={saleDetails.total}
              items={saleDetails.items}
            />
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Customer"
            value={saleDetails.customerName}
            helper={saleDetails.customerPhone}
            icon={UserRound}
          />

          <InfoCard
            title="Payment method"
            value={saleDetails.paymentMethod}
            helper="Payment completed"
            icon={CreditCard}
          />

          <InfoCard
            title="Total items"
            value={`${saleDetails.items.reduce(
              (total, item) =>
                total + item.quantity,
              0,
            )} items`}
            helper={`${saleDetails.items.length} different products`}
            icon={Package}
          />
        </section>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
            <div className="border-b border-border p-5">
              <h2 className="font-bold">
                Purchased items
              </h2>

              <p className="mt-1 text-xs text-muted">
                Products included in this transaction.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-surface-secondary">
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    <th className="px-5 py-4">
                      Product
                    </th>

                    <th className="px-5 py-4">
                      Price
                    </th>

                    <th className="px-5 py-4">
                      Quantity
                    </th>

                    <th className="px-5 py-4 text-right">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {saleDetails.items.map((item) => (
                    <tr
                      key={item.id}
                      className="text-sm"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-muted">
                          {item.sku}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-muted">
                        {formatCurrency(item.price)}
                      </td>

                      <td className="px-5 py-4">
                        {item.quantity}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold">
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                <ReceiptText className="size-4" />
              </span>

              <div>
                <h2 className="font-bold">
                  Payment summary
                </h2>

                <p className="text-xs text-muted">
                  Transaction totals
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4 text-muted">
                <span>Subtotal</span>

                <span>
                  {formatCurrency(
                    saleDetails.subtotal,
                  )}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-muted">
                <span>Tax</span>

                <span>
                  {formatCurrency(saleDetails.tax)}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-muted">
                <span>Discount</span>

                <span>
                  −{" "}
                  {formatCurrency(
                    saleDetails.discount,
                  )}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-t border-border pt-4 text-lg font-bold">
                <span>Total</span>

                <span className="text-primary">
                  {formatCurrency(
                    saleDetails.total,
                  )}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  helper: string;
  icon: React.ElementType;
}

function InfoCard({
  title,
  value,
  helper,
  icon: Icon,
}: InfoCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 truncate font-bold">
          {value}
        </p>

        <p className="mt-1 truncate text-[11px] text-muted">
          {helper}
        </p>
      </div>
    </article>
  );
}