"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Barcode,
  Box,
  Edit3,
  Eye,
  PackageCheck,
  PackageX,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  ProductImportButton,
  ProductStatusBadge,
} from "@/features/products/components";
import type {
  Product,
  ProductSaleType,
  ProductStatus,
} from "@/features/products/types";

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Premium Mineral Water",
    sku: "PRD-1001",
    item_code: "ITEM-001",
    barcode: "8964001200011",
    retail_price: 120,
    wholesale_price: 105,
    cost: 80,
    tax: 0,
    sale_type: "Both",
    unit: "Piece",
    size: "500ml",
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
  },
  {
    id: 2,
    name: "Classic Potato Chips",
    sku: "PRD-1002",
    item_code: "ITEM-002",
    barcode: "8964001200028",
    retail_price: 180,
    wholesale_price: 155,
    cost: 120,
    tax: 5,
    sale_type: "Both",
    unit: "Pack",
    size: "100g",
    inventory_tracking: true,
    minimum_stock: 15,
    maximum_stock: 120,
    status: "Active",
    categories: {
      id: 2,
      name: "Snacks",
    },
    brands: {
      id: 2,
      name: "Crispy",
    },
    suppliers: {
      id: 2,
      name: "National Foods Supply",
    },
  },
  {
    id: 3,
    name: "Chocolate Biscuits",
    sku: "PRD-1003",
    item_code: "ITEM-003",
    barcode: "8964001200035",
    retail_price: 250,
    wholesale_price: 220,
    cost: 175,
    tax: 5,
    sale_type: "Retail",
    unit: "Pack",
    size: "200g",
    inventory_tracking: true,
    minimum_stock: 12,
    maximum_stock: 80,
    status: "Active",
    categories: {
      id: 2,
      name: "Snacks",
    },
    brands: {
      id: 3,
      name: "Sweet Bite",
    },
    suppliers: {
      id: 2,
      name: "National Foods Supply",
    },
  },
  {
    id: 4,
    name: "Fresh Orange Juice",
    sku: "PRD-1004",
    item_code: "ITEM-004",
    barcode: "8964001200042",
    retail_price: 320,
    wholesale_price: 285,
    cost: 230,
    tax: 0,
    sale_type: "Both",
    unit: "Bottle",
    size: "1L",
    inventory_tracking: true,
    minimum_stock: 8,
    maximum_stock: 60,
    status: "Inactive",
    categories: {
      id: 1,
      name: "Beverages",
    },
    brands: {
      id: 4,
      name: "Fruit Valley",
    },
    suppliers: {
      id: 1,
      name: "Fresh Distributors",
    },
  },
  {
    id: 5,
    name: "Instant Coffee",
    sku: "PRD-1005",
    item_code: "ITEM-005",
    barcode: "8964001200059",
    retail_price: 650,
    wholesale_price: 590,
    cost: 475,
    tax: 5,
    sale_type: "Wholesale",
    unit: "Jar",
    size: "200g",
    inventory_tracking: true,
    minimum_stock: 5,
    maximum_stock: 40,
    status: "Active",
    categories: {
      id: 3,
      name: "Grocery",
    },
    brands: {
      id: 5,
      name: "Morning Brew",
    },
    suppliers: {
      id: 3,
      name: "Prime Wholesale",
    },
  },
];

function formatCurrency(value?: number | null) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<"all" | ProductStatus>("all");

  const [saleType, setSaleType] = useState<"all" | ProductSaleType>("all");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return sampleProducts.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.sku?.toLowerCase().includes(normalizedSearch) ||
        product.barcode?.toLowerCase().includes(normalizedSearch) ||
        product.item_code?.toLowerCase().includes(normalizedSearch);

      const matchesStatus = status === "all" || product.status === status;

      const matchesSaleType =
        saleType === "all" || product.sale_type === saleType;

      return matchesSearch && matchesStatus && matchesSaleType;
    });
  }, [search, status, saleType]);

  const totalProducts = sampleProducts.length;

  const activeProducts = sampleProducts.filter(
    (product) => product.status === "Active",
  ).length;

  const inactiveProducts = sampleProducts.filter(
    (product) => product.status === "Inactive",
  ).length;

  function resetFilters() {
    setSearch("");
    setStatus("all");
    setSaleType("all");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Products
            </h1>

            <p className="mt-2 text-sm text-muted">
              Manage product information, pricing, inventory settings and
              status.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ProductImportButton />

            <Link
              href="/products/new"
              className="
                inline-flex h-10 items-center
                justify-center gap-2 rounded-xl
                bg-primary px-4 text-sm font-semibold
                text-white transition
                hover:bg-primary-hover
              "
            >
              <Plus className="size-4" />
              Add product
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total products"
            value={totalProducts}
            helper="Across the complete catalogue"
            icon={Box}
            iconStyle="bg-blue-50 text-blue-700"
          />

          <SummaryCard
            label="Active products"
            value={activeProducts}
            helper="Available for sale"
            icon={PackageCheck}
            iconStyle="bg-emerald-50 text-emerald-700"
          />

          <SummaryCard
            label="Inactive products"
            value={inactiveProducts}
            helper="Currently unavailable"
            icon={PackageX}
            iconStyle="bg-orange-50 text-orange-700"
          />
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
          <div className="border-b border-border p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, SKU, barcode or item code..."
                  className="
                    h-11 w-full rounded-xl border
                    border-border bg-white pl-10 pr-4
                    text-sm outline-none transition
                    focus:border-primary
                    focus:ring-4 focus:ring-primary/10
                  "
                />
              </div>

              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as "all" | ProductStatus)
                }
                aria-label="Filter by product status"
                className="
                  h-11 rounded-xl border border-border
                  bg-white px-3 text-sm outline-none
                  focus:border-primary
                  focus:ring-4 focus:ring-primary/10
                "
              >
                <option value="all">All statuses</option>

                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={saleType}
                onChange={(event) =>
                  setSaleType(event.target.value as "all" | ProductSaleType)
                }
                aria-label="Filter by sale type"
                className="
                  h-11 rounded-xl border border-border
                  bg-white px-3 text-sm outline-none
                  focus:border-primary
                  focus:ring-4 focus:ring-primary/10
                "
              >
                <option value="all">All sale types</option>

                <option value="Retail">Retail</option>

                <option value="Wholesale">Wholesale</option>

                <option value="Both">Retail &amp; Wholesale</option>
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
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-surface-secondary">
                <tr className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  <th className="px-5 py-4">Product</th>

                  <th className="px-5 py-4">SKU / Barcode</th>

                  <th className="px-5 py-4">Category</th>

                  <th className="px-5 py-4">Sale type</th>

                  <th className="px-5 py-4">Retail price</th>

                  <th className="px-5 py-4">Status</th>

                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="
                      text-sm transition-colors
                      hover:bg-surface-secondary/60
                    "
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                          <Box className="size-4" />
                        </span>

                        <div>
                          <p className="font-semibold">{product.name}</p>

                          <p className="mt-1 text-[11px] text-muted">
                            {product.size || "No size"} ·{" "}
                            {product.unit || "No unit"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium">{product.sku || "—"}</p>

                      <p className="mt-1 flex items-center gap-1 text-[11px] text-muted">
                        <Barcode className="size-3" />

                        {product.barcode || "No barcode"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-muted">
                      {product.categories?.name || "Uncategorized"}
                    </td>

                    <td className="px-5 py-4">{product.sale_type || "—"}</td>

                    <td className="px-5 py-4 font-semibold">
                      {formatCurrency(product.retail_price)}
                    </td>

                    <td className="px-5 py-4">
                      <ProductStatusBadge status={product.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          aria-label={`View ${product.name}`}
                          className="
                            flex size-9 items-center
                            justify-center rounded-lg
                            border border-border text-muted
                            transition hover:border-primary
                            hover:bg-primary-light
                            hover:text-primary
                          "
                        >
                          <Eye className="size-4" />
                        </Link>

                        <Link
                          href={`/products/${product.id}/edit`}
                          aria-label={`Edit ${product.name}`}
                          className="
                            flex size-9 items-center
                            justify-center rounded-lg
                            border border-border text-muted
                            transition hover:border-primary
                            hover:bg-primary-light
                            hover:text-primary
                          "
                        >
                          <Edit3 className="size-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-14 text-center">
                      <p className="font-semibold">No products found</p>

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
              Showing {filteredProducts.length} of {sampleProducts.length}{" "}
              products
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                disabled
                className="
                  h-9 rounded-lg border border-border
                  px-3 font-semibold disabled:opacity-50
                "
              >
                Previous
              </button>

              <button
                type="button"
                disabled
                className="
                  h-9 rounded-lg border border-border
                  px-3 font-semibold disabled:opacity-50
                "
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

interface SummaryCardProps {
  label: string;
  value: number;
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

      <div>
        <p className="text-xs text-muted">{label}</p>

        <p className="mt-1 text-xl font-bold">{value}</p>

        <p className="mt-1 text-[11px] text-muted">{helper}</p>
      </div>
    </article>
  );
}
