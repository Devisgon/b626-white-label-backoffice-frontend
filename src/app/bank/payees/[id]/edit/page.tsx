import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  PayeeForm,
} from "@/features/banking/components";
import type {
  PayeeFormValues,
} from "@/features/banking/schemas";

interface EditPayeePageProps {
  params: Promise<{
    id: string;
  }>;
}

const payees: Record<
  string,
  PayeeFormValues
> = {
  "3e28d5fa-97c2-4fa9-8000-100000000001": {
    payeeName: "Pakistan State Oil",
    payeeType: "vendor",
    email: "billing@pso.com.pk",
    phone: "+92 21 111 111 776",
    addressLine1:
      "PSO House, Khayaban-e-Iqbal",
    addressLine2: "Clifton",
    city: "Karachi",
    state: "Sindh",
    postalCode: "75600",
    country: "Pakistan",
    taxId: "NTN-PSO-1001",
    defaultAccountId:
      "1f83751c-54b1-4d50-85cd-100000000001",
    notes:
      "Primary vendor for fuel supply and related payments.",
    status: "active",
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
    defaultAccountId:
      "1f83751c-54b1-4d50-85cd-100000000001",
    notes:
      "Supplier for beverages and consumer products.",
    status: "active",
  },

  "3e28d5fa-97c2-4fa9-8000-100000000003": {
    payeeName:
      "Lahore Electric Supply Company",
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
    defaultAccountId:
      "1f83751c-54b1-4d50-85cd-100000000001",
    notes:
      "Electricity utility payments for the store.",
    status: "active",
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
    taxId: "",
    defaultAccountId: "",
    notes:
      "Individual payment recipient.",
    status: "active",
  },

  "3e28d5fa-97c2-4fa9-8000-100000000005": {
    payeeName:
      "Previous Maintenance Service",
    payeeType: "other",
    email: "maintenance@example.com",
    phone: "+92 302 5554321",
    addressLine1: "Industrial Area",
    addressLine2: "",
    city: "Lahore",
    state: "Punjab",
    postalCode: "54000",
    country: "Pakistan",
    taxId: "",
    defaultAccountId: "",
    notes:
      "Previous maintenance service provider.",
    status: "inactive",
  },
};

export default async function EditPayeePage({
  params,
}: EditPayeePageProps) {
  const { id } = await params;
  const payee = payees[id];

  if (!payee) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-[var(--shadow-sm)]">
            <h1 className="text-xl font-bold">
              Payee not found
            </h1>

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

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href={`/bank/payees/${id}`}
            aria-label="Return to payee details"
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
              Banking management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Edit payee
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update payee, contact and payment
              information.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <PayeeForm
            mode="edit"
            payeeId={id}
            initialValues={payee}
          />
        </div>
      </div>
    </AppShell>
  );
}