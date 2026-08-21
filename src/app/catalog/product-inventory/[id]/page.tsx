import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Package,
  Pencil,
  Warehouse,
} from "lucide-react";

import { AppShell } from "@/components/layout";

interface ProductInventoryDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface ProductInventoryDetails {
  productId: number;
  productName: string;
  sku: string;
  locationId: number;
  locationName: string;
  locationCode: string;
  locationAddress: string;
  onHandQuantity: number;
  reservedQuantity: number;
  reorderLevel: number;
  minimumStock: number;
  maximumStock: number;
  createdAt: string;
  updatedAt: string;
}

const productInventoryRecords: Record<
  string,
  ProductInventoryDetails
> = {
  "1": {
    productId: 1,
    productName: "Premium Mineral Water",
    sku: "PRD-1001",
    locationId: 1,
    locationName: "Main Warehouse",
    locationCode: "WH-001",
    locationAddress: "Main Branch, Lahore",
    onHandQuantity: 120,
    reservedQuantity: 10,
    reorderLevel: 30,
    minimumStock: 20,
    maximumStock: 300,
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },

  "2": {
    productId: 2,
    productName: "Classic Potato Chips",
    sku: "PRD-1002",
    locationId: 2,
    locationName: "Store Stock Room",
    locationCode: "STR-001",
    locationAddress: "Phoenix Store, Punjab",
    onHandQuantity: 8,
    reservedQuantity: 2,
    reorderLevel: 20,
    minimumStock: 15,
    maximumStock: 200,
    createdAt: "18 Aug 2026",
    updatedAt: "20 Aug 2026",
  },

  "3": {
    productId: 4,
    productName: "Fresh Milk",
    sku: "PRD-1004",
    locationId: 3,
    locationName: "Cold Storage",
    locationCode: "CS-001",
    locationAddress:
      "Warehouse Block B, Lahore",
    onHandQuantity: 45,
    reservedQuantity: 5,
    reorderLevel: 15,
    minimumStock: 10,
    maximumStock: 100,
    createdAt: "18 Aug 2026",
    updatedAt: "19 Aug 2026",
  },

  "4": {
    productId: 6,
    productName: "Instant Coffee",
    sku: "PRD-1006",
    locationId: 1,
    locationName: "Main Warehouse",
    locationCode: "WH-001",
    locationAddress: "Main Branch, Lahore",
    onHandQuantity: 5,
    reservedQuantity: 1,
    reorderLevel: 15,
    minimumStock: 12,
    maximumStock: 80,
    createdAt: "19 Aug 2026",
    updatedAt: "20 Aug 2026",
  },
};

export default async function ProductInventoryDetailsPage({
  params,
}: ProductInventoryDetailsPageProps) {
  const { id } = await params;

  const inventory =
    productInventoryRecords[id];

  if (!inventory) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-[var(--shadow-sm)]">
            <h1 className="text-xl font-bold">
              Product inventory not found
            </h1>

            <p className="mt-2 text-sm text-muted">
              The requested product inventory record
              does not exist.
            </p>

            <Link
              href="/catalog/product-inventory"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-4 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to product inventory
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const availableQuantity = Math.max(
    0,
    inventory.onHandQuantity -
      inventory.reservedQuantity,
  );

  const isLowStock =
    inventory.onHandQuantity <=
    inventory.reorderLevel;

  const stockPercentage = Math.min(
    100,
    Math.round(
      (inventory.onHandQuantity /
        inventory.maximumStock) *
        100,
    ),
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-[1150px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="flex items-start gap-4">
            <Link
              href="/catalog/product-inventory"
              aria-label="Return to product inventory"
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
                Product inventory details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {inventory.productName}
                </h1>

                <span
                  className={`
                    rounded-full px-2.5 py-1
                    text-[10px] font-semibold
                    ${
                      isLowStock
                        ? "bg-orange-50 text-orange-700"
                        : "bg-emerald-50 text-emerald-700"
                    }
                  `}
                >
                  {isLowStock
                    ? "Low stock"
                    : "In stock"}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">
                Record ID: {id} ·{" "}
                {inventory.sku}
              </p>
            </div>
          </div>

          <Link
            href={`/catalog/product-inventory/${id}/edit`}
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
            title="On-hand"
            value={String(
              inventory.onHandQuantity,
            )}
            helper="Physical stock units"
            icon={<Package className="size-5" />}
          />

          <InfoCard
            title="Reserved"
            value={String(
              inventory.reservedQuantity,
            )}
            helper="Reserved stock units"
            icon={<Package className="size-5" />}
          />

          <InfoCard
            title="Available"
            value={String(availableQuantity)}
            helper="Available for sale"
            icon={
              <Warehouse className="size-5" />
            }
          />

          <InfoCard
            title="Location"
            value={inventory.locationName}
            helper={inventory.locationCode}
            icon={<MapPin className="size-5" />}
          />
        </section>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
                <Warehouse className="size-4" />
              </span>

              <div>
                <h2 className="font-bold">
                  Inventory information
                </h2>

                <p className="text-xs text-muted">
                  Product stock and assigned location
                  details.
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
                label="Inventory location"
                value={inventory.locationName}
              />

              <DetailsRow
                label="Location code"
                value={inventory.locationCode}
              />

              <DetailsRow
                label="Location address"
                value={
                  inventory.locationAddress
                }
              />

              <DetailsRow
                label="On-hand quantity"
                value={String(
                  inventory.onHandQuantity,
                )}
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
                  availableQuantity,
                )}
              />

              <DetailsRow
                label="Created"
                value={inventory.createdAt}
              />

              <DetailsRow
                label="Last updated"
                value={inventory.updatedAt}
              />
            </dl>
          </section>

          <aside className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
            <h2 className="font-bold">
              Stock limits
            </h2>

            <p className="mt-1 text-xs text-muted">
              Current inventory thresholds.
            </p>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">
                  Stock capacity
                </span>

                <span className="font-semibold">
                  {inventory.onHandQuantity} /{" "}
                  {inventory.maximumStock}
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-secondary">
                <div
                  className={`
                    h-full rounded-full
                    ${
                      isLowStock
                        ? "bg-orange-500"
                        : "bg-primary"
                    }
                  `}
                  style={{
                    width: `${stockPercentage}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-border pt-5 text-sm">
              <LimitRow
                label="Minimum stock"
                value={inventory.minimumStock}
              />

              <LimitRow
                label="Reorder level"
                value={inventory.reorderLevel}
              />

              <LimitRow
                label="Maximum stock"
                value={inventory.maximumStock}
              />
            </div>

            {isLowStock && (
              <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4">
                <p className="text-xs font-semibold text-orange-700">
                  Stock needs attention
                </p>

                <p className="mt-1 text-[11px] leading-5 text-orange-700">
                  Current quantity is at or below the
                  configured reorder level.
                </p>
              </div>
            )}
          </aside>
        </div>

        <section className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-white p-4 text-xs text-muted shadow-[var(--shadow-sm)]">
          <CalendarDays className="size-4 shrink-0 text-primary" />

          <span>
            Last updated on{" "}
            <strong className="text-foreground">
              {inventory.updatedAt}
            </strong>
          </span>
        </section>
      </div>
    </AppShell>
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
    <div className="grid gap-2 py-4 text-sm sm:grid-cols-[180px_minmax(0,1fr)]">
      <dt className="font-medium text-muted">
        {label}
      </dt>

      <dd className="font-medium">
        {value}
      </dd>
    </div>
  );
}

function LimitRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted">
        {label}
      </span>

      <span className="font-bold">
        {value}
      </span>
    </div>
  );
}