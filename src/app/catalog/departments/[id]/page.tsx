import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Hash,
  Pencil,
  Percent,
  ShieldAlert,
  Warehouse,
} from "lucide-react";

import { AppShell } from "@/components/layout";

interface DepartmentDetailsPageProps {
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
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
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
    createdAt: "16 Aug 2026",
    updatedAt: "19 Aug 2026",
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
    createdAt: "15 Aug 2026",
    updatedAt: "18 Aug 2026",
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
    createdAt: "14 Aug 2026",
    updatedAt: "17 Aug 2026",
  },
};

export default async function DepartmentDetailsPage({
  params,
}: DepartmentDetailsPageProps) {
  const { id } = await params;

  const department =
    departmentRecords[id as keyof typeof departmentRecords] ??
    departmentRecords["1"];

  const statusStyles =
    department.status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-slate-100 text-slate-600";

  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section
          className="
            flex flex-col justify-between gap-5
            sm:flex-row sm:items-start
          "
        >
          <div className="flex items-start gap-4">
            <Link
              href="/catalog/departments"
              aria-label="Return to departments"
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
                Department details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {department.name}
                </h1>

                <span
                  className={`
                    inline-flex rounded-full px-2.5 py-1
                    text-[10px] font-semibold
                    ${statusStyles}
                  `}
                >
                  {department.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">Department ID: {id}</p>
            </div>
          </div>

          <Link
            href={`/catalog/departments/${id}/edit`}
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl border border-border
              bg-white px-4 text-sm font-semibold
              text-muted transition hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit department
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Department"
            value={department.name}
            helper={`Record ID: ${id}`}
            icon={Warehouse}
          />

          <InfoCard
            title="Tax and margin"
            value={`${department.defaultTaxRate}% tax`}
            helper={`${department.defaultMargin}% default margin`}
            icon={Percent}
          />

          <InfoCard
            title="Last updated"
            value={department.updatedAt}
            helper={`Created ${department.createdAt}`}
            icon={CalendarDays}
          />
        </section>

        <section
          className="
            mt-6 rounded-2xl border border-border
            bg-white p-5 shadow-[var(--shadow-sm)]
            sm:p-6
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                flex size-10 items-center justify-center
                rounded-xl bg-primary-light text-primary
              "
            >
              <Warehouse className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">Department information</h2>

              <p className="text-xs text-muted">
                Department, tax and POS configuration.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow label="Department name" value={department.name} />

            <DetailsRow label="Description" value={department.description} />

            <DetailsRow
              label="Default tax rate"
              value={`${department.defaultTaxRate}%`}
              icon={Percent}
            />

            <DetailsRow
              label="Default margin"
              value={`${department.defaultMargin}%`}
              icon={Percent}
            />

            <DetailsRow
              label="NACS code"
              value={department.nacsCode}
              icon={Hash}
            />

            <DetailsRow
              label="POS department"
              value={String(department.posDepartmentNumber)}
              icon={Hash}
            />

            <DetailsRow
              label="Age restriction"
              value={department.ageRestriction ? "Required" : "Not required"}
              icon={ShieldAlert}
            />

            <DetailsRow label="Status" value={department.status} />

            <DetailsRow label="Created" value={department.createdAt} />

            <DetailsRow label="Last updated" value={department.updatedAt} />
          </dl>
        </section>
      </div>
    </AppShell>
  );
}

function InfoCard({
  title,
  value,
  helper,
  icon: Icon,
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ElementType;
}) {
  return (
    <article
      className="
        flex items-center gap-4 rounded-2xl
        border border-border bg-white p-5
        shadow-[var(--shadow-sm)]
        transition hover:-translate-y-1
        hover:shadow-[var(--shadow-md)]
      "
    >
      <span
        className="
          flex size-11 shrink-0 items-center justify-center
          rounded-xl bg-primary-light text-primary
        "
      >
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">{title}</p>
        <p className="mt-1 truncate font-bold">{value}</p>
        <p className="mt-1 truncate text-[11px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

function DetailsRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ElementType;
}) {
  return (
    <div
      className="
        grid gap-2 py-4 text-sm
        sm:grid-cols-[180px_minmax(0,1fr)]
      "
    >
      <dt className="font-medium text-muted">{label}</dt>

      <dd className="flex items-center gap-2 font-medium">
        {Icon && <Icon className="size-4 text-muted" />}

        {value || "Not provided"}
      </dd>
    </div>
  );
}
