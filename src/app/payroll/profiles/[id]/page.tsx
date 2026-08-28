import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import {
  PayrollDetails,
  PayrollPageHeader,
  StatusPill,
} from "@/features/payroll";
import { findPayrollProfile } from "@/features/payroll/demo-data";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = findPayrollProfile(id);
  if (!item) notFound();
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Payroll Profile Details"
          description="Employee payroll configuration and status."
          back="/payroll/profiles"
        />
        <PayrollDetails
          title={item.employeeName}
          subtitle={`Profile ${item.id}`}
          editHref={`/payroll/profiles/${item.id}/edit`}
          rows={[
            { label: "Employee ID", value: item.userId },
            { label: "Pay type", value: item.payType },
            {
              label: "Base rate",
              value: `PKR ${item.baseRate.toLocaleString()}`,
            },
            {
              label: "Overtime rate",
              value: item.overtimeRate
                ? `PKR ${item.overtimeRate.toLocaleString()}`
                : "Not applicable",
            },
            {
              label: "Bank account ID",
              value: item.bankAccountId ?? "Not assigned",
            },
            {
              label: "Status",
              value: (
                <StatusPill value={item.isActive ? "ACTIVE" : "INACTIVE"} />
              ),
            },
          ]}
        />
      </main>
    </AppShell>
  );
}
