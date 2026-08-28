import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { UnitForm } from "@/features/catalogue/components";

interface EditUnitPageProps {
  params: Promise<{
    id: string;
  }>;
}

const unitRecords = {
  "1": {
    name: "Piece",
    shortName: "pc",
    status: "Active" as const,
  },

  "2": {
    name: "Kilogram",
    shortName: "kg",
    status: "Active" as const,
  },

  "3": {
    name: "Liter",
    shortName: "L",
    status: "Active" as const,
  },

  "4": {
    name: "Carton",
    shortName: "ctn",
    status: "Inactive" as const,
  },
};

export default async function EditUnitPage({ params }: EditUnitPageProps) {
  const { id } = await params;

  const unit = unitRecords[id as keyof typeof unitRecords] ?? unitRecords["1"];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/catalog/units/${id}`}
            aria-label="Return to unit details"
            className="
              flex size-10 shrink-0 items-center justify-center
              rounded-xl border border-border bg-white
              text-muted transition hover:border-primary
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
              Edit unit
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update {unit.name} information and availability.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <UnitForm mode="edit" unitId={Number(id)} initialValues={unit} />
        </div>
      </div>
    </AppShell>
  );
}
