import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import {
  PayrollDetails,
  PayrollPageHeader,
  StatusPill,
} from "@/features/payroll";
import { findLeaveRequest } from "@/features/payroll/demo-data";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = findLeaveRequest(id);
  if (!item) notFound();
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Leave Request Details"
          description="Leave dates, reason and approval decision."
          back="/payroll/leave-requests"
        />
        <PayrollDetails
          title={item.employeeName}
          subtitle={`Request ${item.id}`}
          rows={[
            { label: "Leave type", value: item.leaveType },
            { label: "Start date", value: item.startDate },
            { label: "End date", value: item.endDate },
            { label: "Reason", value: item.reason ?? "—" },
            { label: "Status", value: <StatusPill value={item.status} /> },
            {
              label: "Approved by",
              value: item.approvedBy ?? "Pending decision",
            },
          ]}
        />
      </main>
    </AppShell>
  );
}
