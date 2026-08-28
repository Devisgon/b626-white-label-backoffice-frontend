import Link from "next/link";
import { ArrowLeft, Warehouse } from "lucide-react";

import { AppShell } from "@/components/layout";
import { InventoryLocationForm } from "@/features/catalogue/components";

interface EditInventoryLocationPageProps {
  params: Promise<{
    id: string;
  }>;
}

const inventoryLocations = {
  "1": {
    name: "Main Warehouse",
    code: "WH-001",
    address: "Main Branch, Lahore",
    status: "Active" as const,
  },

  "2": {
    name: "Store Stock Room",
    code: "STR-001",
    address: "Phoenix Store, Punjab",
    status: "Active" as const,
  },

  "3": {
    name: "Cold Storage",
    code: "CS-001",
    address: "Warehouse Block B, Lahore",
    status: "Active" as const,
  },

  "4": {
    name: "Previous Storage Area",
    code: "OLD-001",
    address: "Old Store Branch, Punjab",
    status: "Inactive" as const,
  },
};

export default async function EditInventoryLocationPage({
  params,
}: EditInventoryLocationPageProps) {
  const { id } = await params;

  const location = inventoryLocations[id as keyof typeof inventoryLocations];

  if (!location) {
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
            <h1 className="text-xl font-bold">Inventory location not found</h1>

            <p className="mt-2 text-sm text-muted">
              The requested inventory location does not exist.
            </p>

            <Link
              href="/catalog/inventory-locations"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-4 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to inventory locations
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/catalog/inventory-locations/${id}`}
            aria-label="Return to inventory location details"
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
              Edit inventory location
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update the information and availability of {location.name}.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <InventoryLocationForm
            mode="edit"
            inventoryLocationId={Number(id)}
            initialValues={location}
          />
        </div>
      </div>
    </AppShell>
  );
}
