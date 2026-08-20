import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { SupplierForm } from "@/features/catalogue/components";

interface EditSupplierPageProps {
  params: Promise<{
    id: string;
  }>;
}

const supplierRecords = {
  "1": {
    name: "Nestle Pakistan",
    email: "orders@nestle.pk",
    phone: "+92 300 1234567",
    address: "Lahore, Pakistan",
    status: "Active" as const,
  },

  "2": {
    name: "National Foods",
    email: "supply@nationalfoods.com",
    phone: "+92 321 7654321",
    address: "Karachi, Pakistan",
    status: "Active" as const,
  },

  "3": {
    name: "Punjab Beverages",
    email: "sales@punjabbeverages.pk",
    phone: "+92 333 1122334",
    address: "Faisalabad, Pakistan",
    status: "Active" as const,
  },

  "4": {
    name: "Local Wholesale Supply",
    email: "",
    phone: "+92 305 9988776",
    address: "Sahiwal, Pakistan",
    status: "Inactive" as const,
  },
};

export default async function EditSupplierPage({
  params,
}: EditSupplierPageProps) {
  const { id } = await params;

  const supplier =
    supplierRecords[
      id as keyof typeof supplierRecords
    ] ?? supplierRecords["1"];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/catalog/suppliers/${id}`}
            aria-label="Return to supplier details"
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
              Edit supplier
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update {supplier.name} and contact
              information.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <SupplierForm
            mode="edit"
            supplierId={Number(id)}
            initialValues={supplier}
          />
        </div>
      </div>
    </AppShell>
  );
}