"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TaxRule } from "../types";

export function TaxRuleForm({ initialValues }: { initialValues?: TaxRule }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/settings/tax-rules");
  }
  const field =
    "mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-primary";
  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-white p-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Tax rule name
          <input
            required
            name="name"
            defaultValue={initialValues?.name ?? ""}
            placeholder="Standard GST"
            className={field}
          />
        </label>
        <label className="text-sm font-semibold">
          Rate percentage
          <input
            required
            name="ratePercent"
            type="number"
            min="0"
            max="100"
            step="0.01"
            defaultValue={initialValues?.ratePercent ?? ""}
            className={field}
          />
        </label>
        <label className="text-sm font-semibold">
          Location
          <select
            name="locationId"
            defaultValue={initialValues?.locationId ?? ""}
            className={field}
          >
            <option value="">All locations</option>
            <option value="loc-001">Phoenix Store</option>
            <option value="loc-002">Main Warehouse</option>
          </select>
        </label>
        {initialValues && (
          <label className="flex items-center gap-3 self-end pb-3 text-sm font-semibold">
            <input
              name="isActive"
              type="checkbox"
              defaultChecked={initialValues.isActive}
              className="size-4 accent-primary"
            />
            Active tax rule
          </label>
        )}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          disabled={saving}
          className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : initialValues
              ? "Update tax rule"
              : "Create tax rule"}
        </button>
      </div>
    </form>
  );
}
