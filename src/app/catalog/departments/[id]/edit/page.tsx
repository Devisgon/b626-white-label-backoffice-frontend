import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import { DepartmentForm } from "@/features/catalogue/components";

interface EditDepartmentPageProps {
  params: Promise<{
    id: string;
  }>;
}

const departmentRecords = {
  "1": {
    name: "Grocery",
    description: "Daily grocery and household products",
    defaultTaxRate: 5,
    defaultMargin: 18,
    ageRestriction: false,
    nacsCode: "GRC-01",
    posDepartmentNumber: 10,
    status: "Active" as const,
  },

  "2": {
    name: "Beverages",
    description: "Cold drinks, juices and bottled water",
    defaultTaxRate: 8,
    defaultMargin: 20,
    ageRestriction: false,
    nacsCode: "BEV-02",
    posDepartmentNumber: 20,
    status: "Active" as const,
  },

  "3": {
    name: "Tobacco",
    description: "Age-restricted tobacco products",
    defaultTaxRate: 15,
    defaultMargin: 12,
    ageRestriction: true,
    nacsCode: "TOB-03",
    posDepartmentNumber: 30,
    status: "Active" as const,
  },

  "4": {
    name: "Seasonal",
    description: "Seasonal and promotional products",
    defaultTaxRate: 5,
    defaultMargin: 25,
    ageRestriction: false,
    nacsCode: "SEA-04",
    posDepartmentNumber: 40,
    status: "Inactive" as const,
  },
};

export default async function EditDepartmentPage({
  params,
}: EditDepartmentPageProps) {
  const { id } = await params;

  const department =
    departmentRecords[id as keyof typeof departmentRecords] ??
    departmentRecords["1"];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/catalog/departments/${id}`}
            aria-label="Return to department details"
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
              Edit department
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update {department.name} and its POS configuration.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <DepartmentForm
            mode="edit"
            departmentId={Number(id)}
            initialValues={department}
          />
        </div>
      </div>
    </AppShell>
  );
}
