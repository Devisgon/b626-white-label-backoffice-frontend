import Link from "next/link";
import {
  ArrowLeft,
  Warehouse,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import { InventoryForm } from "@/features/catalogue/components";

interface EditInventoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

const inventoryRecords = {
  "1": {
    product_id: 1,
    quantity: 120,
    reserved_quantity: 10,
    minimum_stock: 20,
    maximum_stock: 300,
    reorder_level: 30,
    warehouse: "Main Warehouse",
    status: "Active" as const,
    productName: "Premium Mineral Water",
  },

  "2": {
    product_id: 2,
    quantity: 8,
    reserved_quantity: 2,
    minimum_stock: 15,
    maximum_stock: 200,
    reorder_level: 20,
    warehouse: "Store Stock Room",
    status: "Active" as const,
    productName: "Classic Potato Chips",
  },

  "3": {
    product_id: 4,
    quantity: 45,
    reserved_quantity: 5,
    minimum_stock: 10,
    maximum_stock: 100,
    reorder_level: 15,
    warehouse: "Cold Storage",
    status: "Active" as const,
    productName: "Fresh Milk",
  },

  "4": {
    product_id: 6,
    quantity: 5,
    reserved_quantity: 1,
    minimum_stock: 12,
    maximum_stock: 80,
    reorder_level: 15,
    warehouse: "Main Warehouse",
    status: "Inactive" as const,
    productName: "Instant Coffee",
  },
};

export default async function EditInventoryPage({
  params,
}: EditInventoryPageProps) {
  const { id } = await params;

  const inventory =
    inventoryRecords[
      id as keyof typeof inventoryRecords
    ];

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
            <h1 className="text-xl font-bold">
              Inventory record not found
            </h1>

            <p className="mt-2 text-sm text-muted">
              The requested inventory record does
              not exist.
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

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/catalog/inventory/${id}`}
            aria-label="Return to inventory details"
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
              Edit inventory
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update stock and warehouse information
              for {inventory.productName}.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <InventoryForm
            mode="edit"
            inventoryId={Number(id)}
            initialValues={{
              product_id:
                inventory.product_id,
              quantity: inventory.quantity,
              reserved_quantity:
                inventory.reserved_quantity,
              minimum_stock:
                inventory.minimum_stock,
              maximum_stock:
                inventory.maximum_stock,
              reorder_level:
                inventory.reorder_level,
              warehouse:
                inventory.warehouse,
              status: inventory.status,
            }}
          />
        </div>
      </div>
    </AppShell>
  );
}