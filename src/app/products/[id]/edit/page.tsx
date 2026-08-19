import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { ProductForm } from "@/features/products/components";
import type { CreateProductInput } from "@/features/products/types";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const sampleProductValues: CreateProductInput = {
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

  category_id: 1,
  supplier_id: 1,
  brand_id: 1,
  department_id: 1,

  inventory_tracking: true,
  minimum_stock: 10,
  maximum_stock: 100,

  is_multi_pack: false,
  pack_size: 1,
  pack_type: "",

  status: "Active",
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/products/${id}`}
            aria-label="Return to product details"
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
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Edit product
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update product information, pricing and
              inventory settings.
            </p>

            <p className="mt-1 text-xs text-muted">
              Product ID: {id}
            </p>
          </div>
        </section>

        <div className="mt-8">
          <ProductForm
            mode="edit"
            initialValues={sampleProductValues}
          />
        </div>
      </div>
    </AppShell>
  );
}