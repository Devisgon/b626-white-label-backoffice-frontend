"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { payrollProfileSchema } from "../schemas";
import { demoPayrollProfiles } from "../demo-data";
import type { PayrollProfile } from "../types";

export function PayrollProfileForm({
  initialValues,
}: {
  initialValues?: PayrollProfile;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    userId: initialValues?.userId ?? "",
    payType: initialValues?.payType ?? "HOURLY",
    baseRate: String(initialValues?.baseRate ?? ""),
    overtimeRate: String(initialValues?.overtimeRate ?? ""),
    bankAccountId: initialValues?.bankAccountId ?? "",
  });
  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = payrollProfileSchema.safeParse(values);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Check the form fields");
      return;
    }
    setSaving(true);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    router.push("/payroll/profiles");
    router.refresh();
  }
  const field =
    "mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10";
  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6"
    >
      <h2 className="font-bold">
        {initialValues ? "Update payroll profile" : "Create payroll profile"}
      </h2>
      <p className="mt-1 text-xs text-muted">
        Pay type, rates and bank account match the backend profile DTO.
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
          <span className="text-sm font-semibold">Pay type *</span>
          <select
            value={values.payType}
            onChange={(e) =>
              setValues({
                ...values,
                payType: e.target.value as "HOURLY" | "SALARY",
              })
            }
            className={field}
          >
            <option value="HOURLY">Hourly</option>
            <option value="SALARY">Salary</option>
          </select>
        </label>
        <Input
          label={values.payType === "SALARY" ? "Monthly salary" : "Hourly rate"}
          value={values.baseRate}
          onChange={(value) => setValues({ ...values, baseRate: value })}
        />
        <Input
          label="Overtime hourly rate"
          value={values.overtimeRate}
          onChange={(value) => setValues({ ...values, overtimeRate: value })}
        />
        <label className="sm:col-span-2">
          <span className="text-sm font-semibold">
            Direct-deposit bank account ID
          </span>
          <input
            value={values.bankAccountId}
            onChange={(e) =>
              setValues({ ...values, bankAccountId: e.target.value })
            }
            placeholder="Optional bank account UUID"
            className={field}
          />
        </label>
      </div>
      <Buttons saving={saving} />
    </form>
  );
}
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="text-sm font-semibold">{label} *</span>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-xl border border-border px-4 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
function Buttons({ saving }: { saving: boolean }) {
  return (
    <div className="mt-7 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
      <Link
        href="/payroll/profiles"
        className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-muted"
      >
        Cancel
      </Link>
      <button
        disabled={saving}
        className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save profile"}
      </button>
    </div>
  );
}
