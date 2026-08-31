"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PayRunForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/payroll/pay-runs");
  }
  const field =
    "mt-2 h-11 w-full rounded-xl border border-border px-4 text-sm outline-none focus:border-primary";
  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Location
          <select required className={field} defaultValue="">
            <option value="" disabled>
              Select location
            </option>
            <option value="loc-001">Phoenix Store</option>
            <option value="loc-002">Main Warehouse</option>
          </select>
        </label>
        <label className="text-sm font-semibold">
          Period start
          <input required type="date" className={field} />
        </label>
        <label className="text-sm font-semibold">
          Period end
          <input required type="date" className={field} />
        </label>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          disabled={saving}
          className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Creating..." : "Create draft pay run"}
        </button>
      </div>
    </form>
  );
}
