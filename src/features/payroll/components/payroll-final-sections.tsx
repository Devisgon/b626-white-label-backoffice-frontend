"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, CheckCircle2, FileText, Play, Plus } from "lucide-react";
import { demoPayRuns } from "../pay-run-demo-data";
import type { PayRunItem } from "../types";
import { PayrollTable, StatusPill } from "./payroll-table";

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

export function PayRunsList() {
  const [runs, setRuns] = useState(demoPayRuns);
  const advance = (id: string) =>
    setRuns((current) =>
      current.map((run) =>
        run.id === id
          ? { ...run, status: run.status === "DRAFT" ? "PROCESSED" : "PAID" }
          : run,
      ),
    );
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h2 className="font-bold">Pay runs</h2>
          <p className="mt-1 text-xs text-muted">
            Draft, calculate and mark payroll periods as paid.
          </p>
        </div>
        <Link
          href="/payroll/pay-runs/new"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white"
        >
          <Plus className="size-4" />
          New pay run
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-surface-secondary">
            <tr className="text-[11px] uppercase tracking-wider text-muted">
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Period</th>
              <th className="px-5 py-4">Employees</th>
              <th className="px-5 py-4">Net total</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {runs.map((run) => (
              <tr key={run.id} className="text-sm">
                <td className="px-5 py-4 font-semibold">{run.locationName}</td>
                <td className="px-5 py-4">
                  {date(run.periodStart)} – {date(run.periodEnd)}
                </td>
                <td className="px-5 py-4">{run.items.length}</td>
                <td className="px-5 py-4">
                  {money(run.items.reduce((sum, item) => sum + item.netPay, 0))}
                </td>
                <td className="px-5 py-4">
                  <StatusPill value={run.status} />
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/payroll/pay-runs/${run.id}`}
                      className="rounded-xl border border-border px-3 py-2 text-xs font-semibold"
                    >
                      View
                    </Link>
                    {run.status !== "PAID" && (
                      <button
                        onClick={() => advance(run.id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white"
                      >
                        {run.status === "DRAFT" ? (
                          <Play className="size-3" />
                        ) : (
                          <CheckCircle2 className="size-3" />
                        )}
                        {run.status === "DRAFT" ? "Process" : "Mark paid"}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const payslips = demoPayRuns.flatMap((run) =>
  run.items.map((item) => ({
    ...item,
    id: item.id,
    status: run.status,
    period: `${date(run.periodStart)} – ${date(run.periodEnd)}`,
  })),
);
export function PayslipsList() {
  return (
    <PayrollTable
      title="Payslips"
      description="Processed payroll statements for employees."
      route="/payroll/payslips"
      singular="payslip"
      records={payslips}
      searchText={(item) => `${item.employeeName} ${item.period}`}
      allowCreate={false}
      allowEdit={false}
      columns={[
        {
          key: "employee",
          label: "Employee",
          render: (item) => (
            <span className="font-semibold">{item.employeeName}</span>
          ),
        },
        { key: "period", label: "Pay period", render: (item) => item.period },
        {
          key: "gross",
          label: "Gross pay",
          render: (item) => money(item.grossPay),
        },
        {
          key: "deductions",
          label: "Deductions",
          render: (item) => money(item.totalDeductions),
        },
        { key: "net", label: "Net pay", render: (item) => money(item.netPay) },
        {
          key: "status",
          label: "Status",
          render: (item) => <StatusPill value={item.status} />,
        },
      ]}
    />
  );
}

export function PayrollReports() {
  const items: PayRunItem[] = demoPayRuns.flatMap((run) => run.items);
  const gross = items.reduce((sum, item) => sum + item.grossPay, 0);
  const deductions = items.reduce((sum, item) => sum + item.totalDeductions, 0);
  const net = items.reduce((sum, item) => sum + item.netPay, 0);
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Gross payroll", gross],
          ["Total deductions", deductions],
          ["Net payroll", net],
        ].map(([label, value]) => (
          <article
            key={String(label)}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <BarChart3 className="size-5 text-primary" />
            <p className="mt-4 text-xs text-muted">{label}</p>
            <p className="mt-1 text-2xl font-bold">{money(Number(value))}</p>
          </article>
        ))}
      </div>
      <section className="mt-6 rounded-2xl border border-border bg-white p-5">
        <div className="flex items-center gap-3">
          <FileText className="size-5 text-primary" />
          <div>
            <h2 className="font-bold">Payroll summary</h2>
            <p className="text-xs text-muted">
              Backend report endpoints support location and date filters.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          {items.length} employee payslips across {demoPayRuns.length} payroll
          runs.
        </p>
      </section>
    </div>
  );
}
