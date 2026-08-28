import Link from "next/link";
import {
  ArrowLeft,
  Barcode,
  Boxes,
  Building2,
  CircleDollarSign,
  Edit3,
  Package,
  Tag,
  Truck,
} from "lucide-react";
import { AppShell } from "@/components/layout";

import {
  DeleteProductButton,
  ProductHistory,
  ProductStatusBadge,
} from "@/features/products/components";
import type { Product } from "@/features/products/types";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const sampleProduct: Product = {
  id: 1,
  name: "Premium Mineral Water",
  sku: "PRD-1001",
  item_code: "ITEM-001",
  barcode: "8964001200011",
  plu_code: "1001",
  retail_price: 120,
  wholesale_price: 105,
  cost: 80,
  tax: 0,
  description:
    "Premium purified mineral water supplied in a sealed 500ml bottle.",
  sale_type: "Both",
  unit: "Bottle",
  size: "500ml",
  is_multi_pack: false,
  pack_size: null,
  pack_type: null,
  category_id: 1,
  supplier_id: 1,
  brand_id: 1,
  department_id: 1,
  inventory_tracking: true,
  minimum_stock: 10,
  maximum_stock: 100,
  status: "Active",
  categories: {
    id: 1,
    name: "Beverages",
  },
  brands: {
    id: 1,
    name: "Aqua Fresh",
  },
  suppliers: {
    id: 1,
    name: "Fresh Distributors",
  },
  departments: {
    id: 1,
    name: "General Store",
  },
  created_at: "2026-08-10T10:30:00",
  updated_at: "2026-08-18T14:15:00",
};

function formatCurrency(value?: number | null) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

function formatDate(value?: string) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const currentStatus =
    id === "4" ? ("Inactive" as const) : sampleProduct.status;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="flex items-start gap-4">
            <Link
              href="/products"
              aria-label="Return to products"
              className="
                flex size-10 shrink-0 items-center
                justify-center rounded-xl border
                border-border bg-white text-muted transition
                hover:border-primary hover:bg-primary-light
                hover:text-primary
              "
            >
              <ArrowLeft className="size-4" />
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Product details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {sampleProduct.name}
                </h1>

                <ProductStatusBadge status={currentStatus} />
              </div>

              <p className="mt-2 text-sm text-muted">
                Product ID: {id} · {sampleProduct.sku}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <DeleteProductButton
              productId={Number(id)}
              productName={sampleProduct.name}
            />

            <Link
              href={`/products/${id}/edit`}
              className="
                inline-flex h-10 items-center
                justify-center gap-2 rounded-xl
                border border-border bg-white px-4
                text-sm font-semibold text-muted
                transition hover:border-primary
                hover:bg-primary-light hover:text-primary
              "
            >
              <Edit3 className="size-4" />
              Edit product
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Retail price"
            value={formatCurrency(sampleProduct.retail_price)}
            helper="Current selling price"
            icon={CircleDollarSign}
            iconStyle="bg-emerald-50 text-emerald-700"
          />

          <SummaryCard
            label="Cost price"
            value={formatCurrency(sampleProduct.cost)}
            helper="Product acquisition cost"
            icon={Tag}
            iconStyle="bg-blue-50 text-blue-700"
          />

          <SummaryCard
            label="Stock limits"
            value={`${sampleProduct.minimum_stock} – ${sampleProduct.maximum_stock}`}
            helper={
              sampleProduct.inventory_tracking
                ? "Inventory tracking enabled"
                : "Inventory tracking disabled"
            }
            icon={Boxes}
            iconStyle="bg-orange-50 text-orange-700"
          />
        </section>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
          <div className="space-y-6">
            <DetailSection
              title="Basic information"
              description="Product identification and description."
              icon={Package}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem label="Product name" value={sampleProduct.name} />

                <DetailItem label="SKU" value={sampleProduct.sku} />

                <DetailItem label="Item code" value={sampleProduct.item_code} />

                <DetailItem label="PLU code" value={sampleProduct.plu_code} />

                <DetailItem
                  label="Barcode"
                  value={sampleProduct.barcode}
                  icon={Barcode}
                />

                <DetailItem label="Status" value={currentStatus} />
              </div>

              <div className="mt-5 border-t border-border pt-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Description
                </p>

                <p className="mt-2 text-sm leading-6 text-foreground">
                  {sampleProduct.description || "No description provided."}
                </p>
              </div>
            </DetailSection>

            <DetailSection
              title="Pricing and sale information"
              description="Product prices, tax and sale configuration."
              icon={CircleDollarSign}
            >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem
                  label="Retail price"
                  value={formatCurrency(sampleProduct.retail_price)}
                />

                <DetailItem
                  label="Wholesale price"
                  value={formatCurrency(sampleProduct.wholesale_price)}
                />

                <DetailItem
                  label="Cost price"
                  value={formatCurrency(sampleProduct.cost)}
                />

                <DetailItem
                  label="Tax rate"
                  value={`${sampleProduct.tax ?? 0}%`}
                />

                <DetailItem label="Sale type" value={sampleProduct.sale_type} />

                <DetailItem
                  label="Unit / Size"
                  value={`${sampleProduct.unit ?? "—"} / ${
                    sampleProduct.size ?? "—"
                  }`}
                />
              </div>
            </DetailSection>

            <DetailSection
              title="Inventory settings"
              description="Stock tracking and multi-pack configuration."
              icon={Boxes}
            >
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <DetailItem
                  label="Inventory tracking"
                  value={
                    sampleProduct.inventory_tracking ? "Enabled" : "Disabled"
                  }
                />

                <DetailItem
                  label="Minimum stock"
                  value={String(sampleProduct.minimum_stock ?? 0)}
                />

                <DetailItem
                  label="Maximum stock"
                  value={String(sampleProduct.maximum_stock ?? 0)}
                />

                <DetailItem
                  label="Multi-pack"
                  value={sampleProduct.is_multi_pack ? "Yes" : "No"}
                />

                <DetailItem
                  label="Pack size"
                  value={
                    sampleProduct.pack_size
                      ? String(sampleProduct.pack_size)
                      : "Not applicable"
                  }
                />

                <DetailItem
                  label="Pack type"
                  value={sampleProduct.pack_type ?? "Not applicable"}
                />
              </div>
            </DetailSection>
            <ProductHistory productId={Number(id)} />
          </div>

          <aside className="space-y-6">
            <DetailSection
              title="Catalogue"
              description="Assigned master data."
              icon={Building2}
            >
              <div className="space-y-5">
                <DetailItem
                  label="Category"
                  value={sampleProduct.categories?.name}
                />

                <DetailItem label="Brand" value={sampleProduct.brands?.name} />

                <DetailItem
                  label="Supplier"
                  value={sampleProduct.suppliers?.name}
                  icon={Truck}
                />

                <DetailItem
                  label="Department"
                  value={sampleProduct.departments?.name}
                />
              </div>
            </DetailSection>

            <section className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
              <h2 className="font-bold">Record information</h2>

              <div className="mt-5 space-y-4">
                <DetailItem
                  label="Created"
                  value={formatDate(sampleProduct.created_at)}
                />

                <DetailItem
                  label="Last updated"
                  value={formatDate(sampleProduct.updated_at)}
                />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  helper: string;
  icon: React.ElementType;
  iconStyle: string;
}

function SummaryCard({
  label,
  value,
  helper,
  icon: Icon,
  iconStyle,
}: SummaryCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
      >
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>

        <p className="mt-1 truncate text-xl font-bold">{value}</p>

        <p className="mt-1 text-[11px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

interface DetailSectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function DetailSection({
  title,
  description,
  icon: Icon,
  children,
}: DetailSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-light text-primary">
          <Icon className="size-4" />
        </span>

        <div>
          <h2 className="font-bold">{title}</h2>

          <p className="mt-1 text-xs text-muted">{description}</p>
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

interface DetailItemProps {
  label: string;
  value?: string | null;
  icon?: React.ElementType;
}

function DetailItem({ label, value, icon: Icon }: DetailItemProps) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
        {label}
      </p>

      <p className="mt-2 flex items-center gap-2 text-sm font-medium">
        {Icon && <Icon className="size-3.5 text-muted" />}

        {value || "Not provided"}
      </p>
    </div>
  );
}
