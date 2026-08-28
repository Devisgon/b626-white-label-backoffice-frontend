import Link from "next/link";
import { Pencil } from "lucide-react";
import type { ReactNode } from "react";
import { StatusPill } from "./payroll-table";

export function PayrollDetails({
  title,
  subtitle,
  editHref,
  rows,
}: {
  title: string;
  subtitle: string;
  editHref?: string;
  rows: Array<{ label: string; value: ReactNode }>;
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Payroll record
          </p>
          <h2 className="mt-2 text-2xl font-bold">{title}</h2>
          <p className="mt-1 text-xs text-muted">{subtitle}</p>
        </div>
        {editHref && (
          <Link
            href={editHref}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold text-muted"
          >
            <Pencil className="size-4" />
            Edit
          </Link>
        )}
      </div>
      <dl className="mt-2 divide-y divide-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-2 py-4 text-sm sm:grid-cols-[200px_minmax(0,1fr)]"
          >
            <dt className="font-medium text-muted">{row.label}</dt>
            <dd className="font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export { StatusPill };
