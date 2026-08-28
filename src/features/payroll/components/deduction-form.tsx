"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { deductionSchema } from "../schemas";
import { demoPayrollProfiles } from "../demo-data";
import type { PayrollDeduction } from "../types";

export function DeductionForm({
  initialValues,
}: {
  initialValues?: PayrollDeduction;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    userId: initialValues?.userId ?? "",
    type: initialValues?.type ?? "TAX",
    amount: String(initialValues?.amount ?? ""),
    isRecurring: initialValues?.isRecurring ?? true,
    note: initialValues?.note ?? "",
  });
  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = deductionSchema.safeParse(values);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Check the form fields");
      return;
    }
    setSaving(true);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    router.push("/payroll/deductions");
    router.refresh();
  }
  const field =
    "mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-primary";
  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6"
    >
      <h2 className="font-bold">
        {initialValues ? "Edit deduction" : "Create deduction"}
      </h2>
      <p className="mt-1 text-xs text-muted">
        Create recurring or one-time deductions using backend-supported fields.
      </p>
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 p-3 text-xs text-red-700">
          {error}
        </p>
      )}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label>
          <span className="text-sm font-semibold">Employee *</span>
          <select
            disabled={!!initialValues}
            value={values.userId}
            onChange={(e) => setValues({ ...values, userId: e.target.value })}
            className={field}
          >
            <option value="">Select employee</option>
            {demoPayrollProfiles.map((item) => (
              <option key={item.userId} value={item.userId}>
                {item.employeeName}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="text-sm font-semibold">Deduction type *</span>
          <select
            value={values.type}
            onChange={(e) =>
              setValues({
                ...values,
                type: e.target.value as PayrollDeduction["type"],
              })
            }
            className={field}
          >
            {["TAX", "INSURANCE", "LOAN", "OTHER"].map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="text-sm font-semibold">Amount *</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={values.amount}
            onChange={(e) => setValues({ ...values, amount: e.target.value })}
            className={field}
          />
        </label>
        <label className="flex items-center gap-3 pt-7">
          <input
            type="checkbox"
            checked={values.isRecurring}
            onChange={(e) =>
              setValues({ ...values, isRecurring: e.target.checked })
            }
            className="size-4 accent-primary"
          />
          <span className="text-sm font-semibold">Recurring deduction</span>
        </label>
        <label className="sm:col-span-2">
          <span className="text-sm font-semibold">Note</span>
          <textarea
            rows={4}
            value={values.note}
            onChange={(e) => setValues({ ...values, note: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>
      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Link
          href="/payroll/deductions"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-muted"
        >
          Cancel
        </Link>
        <button
          disabled={saving}
          className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save deduction"}
        </button>
      </div>
    </form>
  );
}
