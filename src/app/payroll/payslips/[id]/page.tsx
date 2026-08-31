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
const date = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const payslip = demoPayRuns
    .flatMap((run) =>
      run.items.map((item) => ({
        ...item,
        payRunId: run.id,
        locationName: run.locationName,
        periodStart: run.periodStart,
        periodEnd: run.periodEnd,
        status: run.status,
      })),
    )
    .find((item) => item.id === id);
  if (!payslip) notFound();
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Payslip Details"
          description={`Payroll statement for ${payslip.employeeName}.`}
          back="/payroll/payslips"
        />
        <section className="rounded-2xl border border-border bg-white p-6">
          <div className="flex justify-between border-b border-border pb-5">
            <div>
              <p className="text-xs text-muted">Employee</p>
              <h2 className="mt-1 text-xl font-bold">{payslip.employeeName}</h2>
              <p className="mt-2 text-sm text-muted">{payslip.locationName}</p>
            </div>
            <StatusPill value={payslip.status} />
          </div>
          <dl className="mt-2 divide-y divide-border">
            <Row
              label="Pay period"
              value={`${date(payslip.periodStart)} – ${date(payslip.periodEnd)}`}
            />
            <Row
              label="Regular hours"
              value={`${payslip.regularHours} hours`}
            />
            <Row
              label="Overtime hours"
              value={`${payslip.overtimeHours} hours`}
            />
            <Row label="Gross pay" value={money(payslip.grossPay)} />
            <Row
              label="Total deductions"
              value={money(payslip.totalDeductions)}
            />
            <Row label="Net pay" value={money(payslip.netPay)} important />
          </dl>
        </section>
      </main>
    </AppShell>
  );
}

function Row({
  label,
  value,
  important = false,
}: {
  label: string;
  value: string;
  important?: boolean;
}) {
  return (
    <div className="grid gap-2 py-4 text-sm sm:grid-cols-[190px_minmax(0,1fr)]">
      <dt className="font-medium text-muted">{label}</dt>
      <dd
        className={
          important ? "text-base font-bold text-primary" : "font-semibold"
        }
      >
        {value}
      </dd>
    </div>
  );
}
