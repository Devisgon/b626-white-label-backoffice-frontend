import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PayrollPageHeader, StatusPill } from "@/features/payroll";
import { demoPayRuns } from "@/features/payroll/pay-run-demo-data";
const money = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const run = demoPayRuns.find((item) => item.id === id);
  if (!run) notFound();
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Pay Run Details"
          description={`${run.locationName}: ${run.periodStart} to ${run.periodEnd}`}
          back="/payroll/pay-runs"
        />
        <section className="rounded-2xl border border-border bg-white p-6">
          <div className="flex justify-between">
            <h2 className="font-bold">Employee calculations</h2>
            <StatusPill value={run.status} />
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="py-3">Employee</th>
                  <th>Hours</th>
                  <th>Gross</th>
                  <th>Deductions</th>
                  <th>Net</th>
                </tr>
              </thead>
              <tbody>
                {run.items.map((item) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="py-4 font-semibold">{item.employeeName}</td>
                    <td>
                      {item.regularHours} + {item.overtimeHours} OT
                    </td>
                    <td>{money(item.grossPay)}</td>
                    <td>{money(item.totalDeductions)}</td>
                    <td className="font-bold">{money(item.netPay)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
