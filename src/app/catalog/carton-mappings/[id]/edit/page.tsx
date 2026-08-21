import Link from "next/link";
import {
  ArrowLeft,
  Box,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import { CartonMappingForm } from "@/features/catalogue/components";

interface EditCartonMappingPageProps {
  params: Promise<{
    id: string;
  }>;
}

const cartonMappings = {
  "1": {
    carton_product_id: 1,
    child_product_id: 2,
    quantity: 12,
    cartonProductName:
      "Mineral Water Carton",
    childProductName:
      "Premium Mineral Water",
  },

  "2": {
    carton_product_id: 3,
    child_product_id: 4,
    quantity: 24,
    cartonProductName:
      "Potato Chips Case",
    childProductName:
      "Classic Potato Chips",
  },

  "3": {
    carton_product_id: 5,
    child_product_id: 6,
    quantity: 6,
    cartonProductName: "Coffee Case",
    childProductName: "Instant Coffee",
  },

  "4": {
    carton_product_id: 7,
    child_product_id: 8,
    quantity: 12,
    cartonProductName:
      "Orange Juice Carton",
    childProductName: "Orange Juice",
  },
};

export default async function EditCartonMappingPage({
  params,
}: EditCartonMappingPageProps) {
  const { id } = await params;

  const mapping =
    cartonMappings[
      id as keyof typeof cartonMappings
    ];

  if (!mapping) {
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
              Carton mapping not found
            </h1>

            <p className="mt-2 text-sm text-muted">
              The requested carton mapping does not
              exist.
            </p>

            <Link
              href="/catalog/carton-mappings"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-4 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to carton mappings
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
            href={`/catalog/carton-mappings/${id}`}
            aria-label="Return to carton mapping details"
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
            <Box className="size-4" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Edit carton mapping
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update the number of units contained
              inside {mapping.cartonProductName}.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <CartonMappingForm
            mode="edit"
            cartonMappingId={Number(id)}
            cartonProductName={
              mapping.cartonProductName
            }
            childProductName={
              mapping.childProductName
            }
            initialValues={{
              carton_product_id:
                mapping.carton_product_id,
              child_product_id:
                mapping.child_product_id,
              quantity: mapping.quantity,
            }}
          />
        </div>
      </div>
    </AppShell>
  );
}