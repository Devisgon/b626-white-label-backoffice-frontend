import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  Pencil,
  UserRound,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import type { PayeeStatus, PayeeType } from "@/features/banking/types";

interface PayeeDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface PayeeDetails {
  payeeName: string;
  payeeType: PayeeType;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  taxId: string;
  defaultAccount: string;
  notes: string;
  status: PayeeStatus;
  createdAt: string;
  updatedAt: string;
}

const payees: Record<string, PayeeDetails> = {
  "3e28d5fa-97c2-4fa9-8000-100000000001": {
    payeeName: "Pakistan State Oil",
    payeeType: "vendor",
    email: "billing@pso.com.pk",
    phone: "+92 21 111 111 776",
    addressLine1: "PSO House, Khayaban-e-Iqbal",
    addressLine2: "Clifton",
    city: "Karachi",
    state: "Sindh",
    postalCode: "75600",
    country: "Pakistan",
    taxId: "NTN-PSO-1001",
    defaultAccount: "HBL Main Operating •••• 2343",
    notes: "Primary vendor for fuel supply and related payments.",
    status: "active",
    createdAt: "10 Feb 2026",
    updatedAt: "20 Aug 2026",
  },

  "3e28d5fa-97c2-4fa9-8000-100000000002": {
    payeeName: "Nestle Pakistan",
    payeeType: "supplier",
    email: "orders@nestle.pk",
    phone: "+92 300 1234567",
    addressLine1: "Main Boulevard",
    addressLine2: "Gulberg",
    city: "Lahore",
    state: "Punjab",
    postalCode: "54660",
    country: "Pakistan",
    taxId: "NTN-NES-2002",
    defaultAccount: "HBL Main Operating •••• 2343",
    notes: "Supplier for beverages and consumer products.",
    status: "active",
    createdAt: "12 Mar 2026",
    updatedAt: "20 Aug 2026",
  },

  "3e28d5fa-97c2-4fa9-8000-100000000003": {
    payeeName: "Lahore Electric Supply Company",
    payeeType: "utility",
    email: "billing@lesco.gov.pk",
    phone: "118",
    addressLine1: "Queens Road",
    addressLine2: "",
    city: "Lahore",
    state: "Punjab",
    postalCode: "54000",
    country: "Pakistan",
    taxId: "UTILITY-3003",
    defaultAccount: "HBL Main Operating •••• 2343",
    notes: "Electricity utility payments for the store.",
    status: "active",
    createdAt: "5 Apr 2026",
    updatedAt: "19 Aug 2026",
  },

  "3e28d5fa-97c2-4fa9-8000-100000000004": {
    payeeName: "Ahmed Khan",
    payeeType: "individual",
    email: "ahmed.khan@example.com",
    phone: "+92 301 9876543",
    addressLine1: "Model Town",
    addressLine2: "",
    city: "Lahore",
    state: "Punjab",
    postalCode: "54700",
    country: "Pakistan",
    taxId: "Not provided",
    defaultAccount: "Not selected",
    notes: "Individual payment recipient.",
    status: "active",
    createdAt: "1 May 2026",
    updatedAt: "18 Aug 2026",
  },

  "3e28d5fa-97c2-4fa9-8000-100000000005": {
    payeeName: "Previous Maintenance Service",
    payeeType: "other",
    email: "maintenance@example.com",
    phone: "+92 302 5554321",
    addressLine1: "Industrial Area",
    addressLine2: "",
    city: "Lahore",
    state: "Punjab",
    postalCode: "54000",
    country: "Pakistan",
    taxId: "Not provided",
    defaultAccount: "Not selected",
    notes: "Previous maintenance service provider.",
    status: "inactive",
    createdAt: "15 Jan 2026",
    updatedAt: "17 Aug 2026",
  },
};

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default async function PayeeDetailsPage({
  params,
}: PayeeDetailsPageProps) {
  const { id } = await params;
  const payee = payees[id];

  if (!payee) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-[var(--shadow-sm)]">
            <h1 className="text-xl font-bold">Payee not found</h1>

            <p className="mt-2 text-sm text-muted">
              The requested payee does not exist.
            </p>

            <Link
              href="/bank/payees"
              className="
                mt-6 inline-flex h-10 items-center
                justify-center rounded-xl bg-primary
                px-5 text-sm font-semibold text-white
                transition hover:bg-primary-hover
              "
            >
              Return to payees
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const fullAddress = [
    payee.addressLine1,
    payee.addressLine2,
    payee.city,
    payee.state,
    payee.postalCode,
    payee.country,
  ]
    .filter(Boolean)
    .join(", ");

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
              href="/bank/payees"
              aria-label="Return to payees"
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
                Payee details
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {payee.payeeName}
                </h1>

                <span
                  className={`
                    inline-flex rounded-full
                    px-2.5 py-1 text-[10px]
                    font-semibold
                    ${
                      payee.status === "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }
                  `}
                >
                  {capitalize(payee.status)}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted">Payee ID: {id}</p>
            </div>
          </div>

          <Link
            href={`/bank/payees/${id}/edit`}
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              border border-border bg-white px-4
              text-sm font-semibold text-muted
              transition hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit payee
          </Link>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Payee type"
            value={capitalize(payee.payeeType)}
            helper="Payment recipient category"
            icon={UserRound}
          />

          <InfoCard
            title="Contact"
            value={payee.email}
            helper={payee.phone}
            icon={Mail}
          />

          <InfoCard
            title="Last updated"
            value={payee.updatedAt}
            helper={`Created ${payee.createdAt}`}
            icon={CalendarDays}
          />
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <DetailsSection
            title="Contact and address"
            description="Payee contact and postal information."
            icon={MapPin}
          >
            <DetailsRow label="Email address" value={payee.email} />

            <DetailsRow label="Phone number" value={payee.phone} />

            <DetailsRow
              label="Full address"
              value={fullAddress || "Not provided"}
            />
          </DetailsSection>

          <DetailsSection
            title="Payment information"
            description="Tax and preferred payment settings."
            icon={CreditCard}
          >
            <DetailsRow label="Tax ID" value={payee.taxId} />

            <DetailsRow label="Default account" value={payee.defaultAccount} />

            <DetailsRow label="Status" value={capitalize(payee.status)} />
          </DetailsSection>
        </div>

        <section
          className="
            mt-6 rounded-2xl border border-border
            bg-white p-5 shadow-[var(--shadow-sm)]
            sm:p-6
          "
        >
          <h2 className="font-bold">Notes</h2>

          <p className="mt-3 text-sm leading-6 text-muted">
            {payee.notes || "No notes provided."}
          </p>
        </section>
      </div>
    </AppShell>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  helper: string;
  icon: React.ElementType;
}

function InfoCard({ title, value, helper, icon: Icon }: InfoCardProps) {
  return (
    <article
      className="
        flex items-center gap-4 rounded-2xl
        border border-border bg-white p-5
        shadow-[var(--shadow-sm)]
        transition hover:-translate-y-0.5
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
        <p className="text-xs text-muted">{title}</p>

        <p className="mt-1 truncate font-bold">{value}</p>

        <p className="mt-1 truncate text-[11px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

function DetailsSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        rounded-2xl border border-border
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
          <Icon className="size-4" />
        </span>

        <div>
          <h2 className="font-bold">{title}</h2>

          <p className="text-xs text-muted">{description}</p>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-border">{children}</dl>
    </section>
  );
}

function DetailsRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        grid gap-2 py-4 text-sm
        sm:grid-cols-[140px_minmax(0,1fr)]
      "
    >
      <dt className="font-medium text-muted">{label}</dt>

      <dd className="break-words font-medium text-foreground">{value}</dd>
    </div>
  );
}
