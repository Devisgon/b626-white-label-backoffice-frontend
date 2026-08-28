"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { leaveRequestSchema } from "../schemas";
import type { LeaveType } from "../types";

export function LeaveRequestForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    leaveType: "CASUAL" as LeaveType,
    startDate: "",
    endDate: "",
    reason: "",
  });
  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = leaveRequestSchema.safeParse(values);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Check the form fields");
      return;
    }
    setSaving(true);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    router.push("/payroll/leave-requests");
    router.refresh();
  }
  const field =
    "mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-primary";
  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6"
    >
      <h2 className="font-bold">Submit leave request</h2>
      <p className="mt-1 text-xs text-muted">
        The logged-in employee is assigned automatically by the backend.
      </p>
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 p-3 text-xs text-red-700">
          {error}
        </p>
      )}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label>
          <span className="text-sm font-semibold">Leave type *</span>
          <select
            value={values.leaveType}
            onChange={(e) =>
              setValues({ ...values, leaveType: e.target.value as LeaveType })
            }
            className={field}
          >
            {["SICK", "CASUAL", "PAID", "UNPAID"].map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <div />
        <label>
          <span className="text-sm font-semibold">Start date *</span>
          <input
            type="date"
            value={values.startDate}
            onChange={(e) =>
              setValues({ ...values, startDate: e.target.value })
            }
            className={field}
          />
        </label>
        <label>
          <span className="text-sm font-semibold">End date *</span>
          <input
            type="date"
            value={values.endDate}
            onChange={(e) => setValues({ ...values, endDate: e.target.value })}
            className={field}
          />
        </label>
        <label className="sm:col-span-2">
          <span className="text-sm font-semibold">Reason</span>
          <textarea
            rows={4}
            value={values.reason}
            onChange={(e) => setValues({ ...values, reason: e.target.value })}
            className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>
      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Link
          href="/payroll/leave-requests"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-muted"
        >
          Cancel
        </Link>
        <button
          disabled={saving}
          className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Submitting..." : "Submit request"}
        </button>
      </div>
    </form>
  );
}
