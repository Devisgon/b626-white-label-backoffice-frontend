import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Truck,
} from "lucide-react";

import { AppShell } from "@/components/layout";

interface SupplierDetailsPageProps {
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
    createdAt: "17 Aug 2026",
    updatedAt: "20 Aug 2026",
  },

  "2": {
    name: "National Foods",
    email: "supply@nationalfoods.com",
    phone: "+92 321 7654321",
    address: "Karachi, Pakistan",
    status: "Active" as const,
    createdAt: "16 Aug 2026",
    updatedAt: "19 Aug 2026",
  },

  "3": {
    name: "Punjab Beverages",
    email: "sales@punjabbeverages.pk",
    phone: "+92 333 1122334",
    address: "Faisalabad, Pakistan",
    status: "Active" as const,
    createdAt: "15 Aug 2026",
    updatedAt: "18 Aug 2026",
  },

  "4": {
    name: "Local Wholesale Supply",
    email: "",
    phone: "+92 305 9988776",
    address: "Sahiwal, Pakistan",
    status: "Inactive" as const,
    createdAt: "14 Aug 2026",
    updatedAt: "17 Aug 2026",
  },
};

export default async function SupplierDetailsPage({
  params,
}: SupplierDetailsPageProps) {
  const { id } = await params;

  const supplierDetails =
    supplierRecords[
      id as keyof typeof supplierRecords
    ] ?? supplierRecords["1"];

  const statusStyles =
    supplierDetails.status === "Active"
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
              href="/catalog/suppliers"
              aria-label="Return to suppliers"
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
                Supplier details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {supplierDetails.name}
                </h1>

                <span
                  className={`
                    inline-flex rounded-full px-2.5 py-1
                    text-[10px] font-semibold
                    ${statusStyles}
                  `}
                >
                  {supplierDetails.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">
                Supplier ID: {id}
              </p>
            </div>
          </div>

          <Link
            href={`/catalog/suppliers/${id}/edit`}
            className="
              inline-flex h-10 items-center justify-center
              gap-2 rounded-xl border border-border
              bg-white px-4 text-sm font-semibold
              text-muted transition hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit supplier
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Supplier"
            value={supplierDetails.name}
            helper={`Record ID: ${id}`}
            icon={Truck}
          />

          <InfoCard
            title="Phone"
            value={
              supplierDetails.phone || "Not provided"
            }
            helper="Primary contact number"
            icon={Phone}
          />

          <InfoCard
            title="Last updated"
            value={supplierDetails.updatedAt}
            helper={`Created ${supplierDetails.createdAt}`}
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
              <Truck className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">
                Supplier information
              </h2>

              <p className="text-xs text-muted">
                Contact and business information.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow
              label="Supplier name"
              value={supplierDetails.name}
              icon={Truck}
            />

            <DetailsRow
              label="Email address"
              value={supplierDetails.email}
              icon={Mail}
            />

            <DetailsRow
              label="Phone number"
              value={supplierDetails.phone}
              icon={Phone}
            />

            <DetailsRow
              label="Address"
              value={supplierDetails.address}
              icon={MapPin}
            />

            <DetailsRow
              label="Status"
              value={supplierDetails.status}
            />

            <DetailsRow
              label="Created"
              value={supplierDetails.createdAt}
            />

            <DetailsRow
              label="Last updated"
              value={supplierDetails.updatedAt}
            />
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
          flex size-11 shrink-0 items-center
          justify-center rounded-xl
          bg-primary-light text-primary
        "
      >
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 truncate font-bold">
          {value}
        </p>

        <p className="mt-1 truncate text-[11px] text-muted">
          {helper}
        </p>
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
      <dt className="font-medium text-muted">
        {label}
      </dt>

      <dd className="flex items-center gap-2 font-medium">
        {Icon && (
          <Icon className="size-4 text-muted" />
        )}

        {value || "Not provided"}
      </dd>
    </div>
  );
}