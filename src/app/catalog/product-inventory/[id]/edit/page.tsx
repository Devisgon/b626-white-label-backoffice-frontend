import Link from "next/link";
import { ArrowLeft, Warehouse } from "lucide-react";

import { AppShell } from "@/components/layout";
import { ProductInventoryForm } from "@/features/catalogue/components";

interface EditProductInventoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

const productInventoryRecords = {
  "1": {
    product_id: 1,
    location_id: 1,
    on_hand_quantity: 120,
    reserved_quantity: 10,
    reorder_level: 30,
    minimum_stock: 20,
    maximum_stock: 300,
    productName: "Premium Mineral Water",
    locationName: "Main Warehouse",
  },

  "2": {
    product_id: 2,
    location_id: 2,
    on_hand_quantity: 8,
    reserved_quantity: 2,
    reorder_level: 20,
    minimum_stock: 15,
    maximum_stock: 200,
    productName: "Classic Potato Chips",
    locationName: "Store Stock Room",
  },

  "3": {
    product_id: 4,
    location_id: 3,
    on_hand_quantity: 45,
    reserved_quantity: 5,
    reorder_level: 15,
    minimum_stock: 10,
    maximum_stock: 100,
    productName: "Fresh Milk",
    locationName: "Cold Storage",
  },

  "4": {
    product_id: 6,
    location_id: 1,
    on_hand_quantity: 5,
    reserved_quantity: 1,
    reorder_level: 15,
    minimum_stock: 12,
    maximum_stock: 80,
    productName: "Instant Coffee",
    locationName: "Main Warehouse",
  },
};

export default async function EditProductInventoryPage({
  params,
}: EditProductInventoryPageProps) {
  const { id } = await params;

  const inventory =
    productInventoryRecords[id as keyof typeof productInventoryRecords];

  if (!inventory) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div
            className="
              rounded-2xl border border-border
              bg-white p-8 text-center
              shadow-[var(--shadow-sm)]
            "
          >
            <h1 className="text-xl font-bold">Product inventory not found</h1>

            <p className="mt-2 text-sm text-muted">
              The requested product inventory record does not exist.
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

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/catalog/product-inventory/${id}`}
            aria-label="Return to product inventory details"
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

          <span
            className="
              hidden size-10 shrink-0 items-center
              justify-center rounded-xl
              bg-primary-light text-primary sm:flex
            "
          >
            <Warehouse className="size-4" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Edit product inventory
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update {inventory.productName} stock at {inventory.locationName}.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <ProductInventoryForm
            mode="edit"
            productInventoryId={Number(id)}
            initialValues={{
              product_id: inventory.product_id,
              location_id: inventory.location_id,
              on_hand_quantity: inventory.on_hand_quantity,
              reserved_quantity: inventory.reserved_quantity,
              reorder_level: inventory.reorder_level,
              minimum_stock: inventory.minimum_stock,
              maximum_stock: inventory.maximum_stock,
            }}
          />
        </div>
      </div>
    </AppShell>
  );
}
