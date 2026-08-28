import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import {
  PayrollDetails,
  PayrollPageHeader,
  StatusPill,
} from "@/features/payroll";
import { findDeduction } from "@/features/payroll/demo-data";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = findDeduction(id);
  if (!item) notFound();
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Deduction Details"
          description="Employee deduction information."
          back="/payroll/deductions"
        />
        <PayrollDetails
          title={item.employeeName}
          subtitle={`Deduction ${item.id}`}
          editHref={`/payroll/deductions/${item.id}/edit`}
          rows={[
            { label: "Type", value: item.type },
            { label: "Amount", value: `PKR ${item.amount.toLocaleString()}` },
            {
              label: "Frequency",
              value: item.isRecurring ? "Recurring" : "One-time",
            },
            {
              label: "Status",
              value: (
                <StatusPill value={item.isActive ? "ACTIVE" : "INACTIVE"} />
              ),
            },
            { label: "Note", value: item.note ?? "—" },
          ]}
        />
      </main>
    </AppShell>
  );
}
