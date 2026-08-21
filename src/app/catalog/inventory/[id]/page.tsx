import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  History,
  Package,
  Pencil,
  Warehouse,
} from "lucide-react";

import { AppShell } from "@/components/layout";

interface InventoryDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface InventoryHistoryItem {
  id: number;
  action: string;
  previousQuantity: number;
  newQuantity: number;
  reason: string;
  date: string;
}

interface InventoryDetails {
  productId: number;
  productName: string;
  sku: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  minimumStock: number;
  maximumStock: number;
  reorderLevel: number;
  warehouse: string;
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
  history: InventoryHistoryItem[];
}

const inventoryRecords: Record<
  string,
  InventoryDetails
> = {
  "1": {
    productId: 1,
    productName: "Premium Mineral Water",
    sku: "PRD-1001",
    quantity: 120,
    reservedQuantity: 10,
    availableQuantity: 110,
    minimumStock: 20,
    maximumStock: 300,
    reorderLevel: 30,
    warehouse: "Main Warehouse",
    status: "Active",
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
    history: [
      {
        id: 1,
        action: "UPDATE",
        previousQuantity: 100,
        newQuantity: 120,
        reason: "Inventory quantity updated",
        date: "20 Aug 2026, 10:30",
      },
      {
        id: 2,
        action: "CREATE",
        previousQuantity: 0,
        newQuantity: 100,
        reason: "Initial inventory created",
        date: "17 Aug 2026, 09:00",
      },
    ],
  },

  "2": {
    productId: 2,
    productName: "Classic Potato Chips",
    sku: "PRD-1002",
    quantity: 8,
    reservedQuantity: 2,
    availableQuantity: 6,
    minimumStock: 15,
    maximumStock: 200,
    reorderLevel: 20,
    warehouse: "Store Stock Room",
    status: "Active",
    createdAt: "18 Aug 2026",
    updatedAt: "20 Aug 2026",
    history: [
      {
        id: 3,
        action: "UPDATE",
        previousQuantity: 30,
        newQuantity: 8,
        reason: "Inventory quantity updated",
        date: "20 Aug 2026, 11:15",
      },
    ],
  },

  "3": {
    productId: 4,
    productName: "Fresh Milk",
    sku: "PRD-1004",
    quantity: 45,
    reservedQuantity: 5,
    availableQuantity: 40,
    minimumStock: 10,
    maximumStock: 100,
    reorderLevel: 15,
    warehouse: "Cold Storage",
    status: "Active",
    createdAt: "18 Aug 2026",
    updatedAt: "19 Aug 2026",
    history: [],
  },

  "4": {
    productId: 6,
    productName: "Instant Coffee",
    sku: "PRD-1006",
    quantity: 5,
    reservedQuantity: 1,
    availableQuantity: 4,
    minimumStock: 12,
    maximumStock: 80,
    reorderLevel: 15,
    warehouse: "Main Warehouse",
    status: "Inactive",
    createdAt: "19 Aug 2026",
    updatedAt: "20 Aug 2026",
    history: [
      {
        id: 4,
        action: "UPDATE",
        previousQuantity: 20,
        newQuantity: 5,
        reason: "Inventory quantity updated",
        date: "20 Aug 2026, 12:00",
      },
    ],
  },
};

export default async function InventoryDetailsPage({
  params,
}: InventoryDetailsPageProps) {
  const { id } = await params;

  const inventory = inventoryRecords[id];

  if (!inventory) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-[var(--shadow-sm)]">
            <h1 className="text-xl font-bold">
              Inventory record not found
            </h1>

            <p className="mt-2 text-sm text-muted">
              The requested inventory record does not
              exist.
            </p>

            <Link
              href="/catalog/inventory"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-4 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to inventory
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const isLowStock =
    inventory.quantity <=
    inventory.reorderLevel;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1150px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="flex items-start gap-4">
            <Link
              href="/catalog/inventory"
              aria-label="Return to inventory"
              className="
                flex size-10 shrink-0 items-center
                justify-center rounded-xl border
                border-border bg-white text-muted
                transition hover:border-primary
                hover:bg-primary-light hover:text-primary
              "
            >
              <ArrowLeft className="size-4" />
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Inventory details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {inventory.productName}
                </h1>

                <StatusBadge
                  status={inventory.status}
                />

                {isLowStock && (
                  <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-orange-700">
                    Low stock
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-muted">
                Inventory ID: {id} ·{" "}
                {inventory.sku}
              </p>
            </div>
          </div>

          <Link
            href={`/catalog/inventory/${id}/edit`}
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl border
              border-border bg-white px-4 text-sm
              font-semibold text-muted transition
              hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit inventory
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-4">
          <InfoCard
            title="Total quantity"
            value={String(inventory.quantity)}
            helper="All stock units"
            icon={<Package className="size-5" />}
          />

          <InfoCard
            title="Reserved"
            value={String(
              inventory.reservedQuantity,
            )}
            helper="Reserved units"
            icon={<Package className="size-5" />}
          />

          <InfoCard
            title="Available"
            value={String(
              inventory.availableQuantity,
            )}
            helper="Available for sale"
            icon={<Warehouse className="size-5" />}
          />

          <InfoCard
            title="Warehouse"
            value={inventory.warehouse}
            helper="Current storage"
            icon={<Warehouse className="size-5" />}
          />
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Package className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">
                Stock information
              </h2>

              <p className="text-xs text-muted">
                Current inventory levels and
                configuration.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow
              label="Product"
              value={inventory.productName}
            />

            <DetailsRow
              label="SKU"
              value={inventory.sku}
            />

            <DetailsRow
              label="Warehouse"
              value={inventory.warehouse}
            />

            <DetailsRow
              label="Total quantity"
              value={String(inventory.quantity)}
            />

            <DetailsRow
              label="Reserved quantity"
              value={String(
                inventory.reservedQuantity,
              )}
            />

            <DetailsRow
              label="Available quantity"
              value={String(
                inventory.availableQuantity,
              )}
            />

            <DetailsRow
              label="Minimum stock"
              value={String(
                inventory.minimumStock,
              )}
            />

            <DetailsRow
              label="Maximum stock"
              value={String(
                inventory.maximumStock,
              )}
            />

            <DetailsRow
              label="Reorder level"
              value={String(
                inventory.reorderLevel,
              )}
            />

            <DetailsRow
              label="Status"
              value={inventory.status}
            />

            <DetailsRow
              label="Last updated"
              value={inventory.updatedAt}
            />
          </dl>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-3 border-b border-border p-5 sm:p-6">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
              <History className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">
                Inventory history
              </h2>

              <p className="text-xs text-muted">
                Previous quantity changes for this
                inventory record.
              </p>
            </div>
          </div>

          {inventory.history.length > 0 ? (
            <div className="divide-y divide-border">
              {inventory.history.map(
                (historyItem) => (
                  <article
                    key={historyItem.id}
                    className="
                      flex flex-col justify-between
                      gap-4 p-5 sm:flex-row
                      sm:items-center
                    "
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-semibold text-primary">
                          {historyItem.action}
                        </span>

                        <p className="text-sm font-semibold">
                          {
                            historyItem.previousQuantity
                          }{" "}
                          →{" "}
                          {
                            historyItem.newQuantity
                          }
                        </p>
                      </div>

                      <p className="mt-2 text-xs text-muted">
                        {historyItem.reason}
                      </p>
                    </div>

                    <span className="flex items-center gap-2 text-xs text-muted">
                      <CalendarDays className="size-3.5" />
                      {historyItem.date}
                    </span>
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className="p-10 text-center">
              <History className="mx-auto size-8 text-muted" />

              <p className="mt-3 font-semibold">
                No history available
              </p>

              <p className="mt-1 text-xs text-muted">
                Inventory changes will appear here.
              </p>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function StatusBadge({
  status,
}: {
  status: "Active" | "Inactive";
}) {
  return (
    <span
      className={`
        rounded-full px-2.5 py-1
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

function InfoCard({
  title,
  value,
  helper,
  icon,
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 truncate font-bold">
          {value}
        </p>

        <p className="mt-1 truncate text-[10px] text-muted">
          {helper}
        </p>
      </div>
    </article>
  );
}

function DetailsRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-2 py-4 text-sm sm:grid-cols-[190px_minmax(0,1fr)]">
      <dt className="font-medium text-muted">
        {label}
      </dt>

      <dd className="font-medium">
        {value}
      </dd>
    </div>
  );
}