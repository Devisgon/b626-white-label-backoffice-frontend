import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { BrandForm } from "@/features/catalogue/components";

interface EditBrandPageProps {
  params: Promise<{
    id: string;
  }>;
}

const brandRecords = {
  "1": {
    name: "Nestle",
    description: "Food, beverage and consumer product brand.",
    status: "Active" as const,
  },

  "2": {
    name: "Coca-Cola",
    description: "Soft drinks and beverage products.",
    status: "Active" as const,
  },

  "3": {
    name: "Unilever",
    description: "Personal care and household products.",
    status: "Active" as const,
  },

  "4": {
    name: "Local Choice",
    description: "Locally sourced store products.",
    status: "Inactive" as const,
  },
};

export default async function EditBrandPage({ params }: EditBrandPageProps) {
  const { id } = await params;

  const brand =
    brandRecords[id as keyof typeof brandRecords] ?? brandRecords["1"];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/catalog/brands/${id}`}
            aria-label="Return to brand details"
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
              Catalogue management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Edit brand
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update {brand.name} information and availability.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <BrandForm mode="edit" brandId={Number(id)} initialValues={brand} />
        </div>
      </div>
    </AppShell>
  );
}
