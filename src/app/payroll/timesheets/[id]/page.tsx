import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import {
  PayrollDetails,
  PayrollPageHeader,
  StatusPill,
} from "@/features/payroll";
import { findTimesheet } from "@/features/payroll/demo-data";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = findTimesheet(id);
  if (!item) notFound();
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Timesheet Details"
          description="Clock times, calculated hours and approval status."
          back="/payroll/timesheets"
        />
        <PayrollDetails
          title={item.employeeName}
          subtitle={`Timesheet ${item.id}`}
          rows={[
            { label: "Location", value: item.locationName },
            { label: "Clock in", value: item.clockIn },
            {
              label: "Clock out",
              value: item.clockOut ?? "Currently clocked in",
            },
            { label: "Regular hours", value: item.regularHours ?? "Pending" },
            { label: "Overtime hours", value: item.overtimeHours ?? "Pending" },
            { label: "Status", value: <StatusPill value={item.status} /> },
            { label: "Notes", value: item.notes ?? "—" },
          ]}
        />
      </main>
    </AppShell>
  );
}
