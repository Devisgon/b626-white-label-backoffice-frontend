"use client";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import type { TaxRule } from "../types";

export const demoTaxRules: TaxRule[] = [
  {
    id: "tax-001",
    name: "Standard GST",
    ratePercent: 17,
    locationId: null,
    locationName: "All locations",
    isActive: true,
  },
  {
    id: "tax-002",
    name: "Reduced Rate",
    ratePercent: 5,
    locationId: "loc-001",
    locationName: "Phoenix Store",
    isActive: true,
  },
  {
    id: "tax-003",
    name: "Zero Rated",
    ratePercent: 0,
    locationId: null,
    locationName: "All locations",
    isActive: false,
  },
];

export function TaxRulesList() {
  const [rules, setRules] = useState(demoTaxRules);
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h2 className="font-bold">Tax rules</h2>
          <p className="mt-1 text-xs text-muted">
            Global and location-specific tax percentages.
          </p>
        </div>
        <Link
          href="/settings/tax-rules/new"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white"
        >
          <Plus className="size-4" />
          Add tax rule
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead className="bg-surface-secondary text-xs uppercase text-muted">
            <tr>
              <th className="px-5 py-4">Rule</th>
              <th className="px-5 py-4">Rate</th>
              <th className="px-5 py-4">Scope</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td className="px-5 py-4 font-semibold">{rule.name}</td>
                <td className="px-5 py-4">{rule.ratePercent}%</td>
                <td className="px-5 py-4">{rule.locationName}</td>
                <td className="px-5 py-4">
                  <button
                    onClick={() =>
                      setRules((current) =>
                        current.map((item) =>
                          item.id === rule.id
                            ? { ...item, isActive: !item.isActive }
                            : item,
                        ),
                      )
                    }
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${rule.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
                  >
                    {rule.isActive ? "ACTIVE" : "INACTIVE"}
                  </button>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/settings/tax-rules/${rule.id}/edit`}
                      title="Edit"
                      className="flex size-9 items-center justify-center rounded-xl border border-border"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <button
                      onClick={() =>
                        setRules((current) =>
                          current.filter((item) => item.id !== rule.id),
                        )
                      }
                      title="Delete"
                      className="flex size-9 items-center justify-center rounded-xl border border-border"
                    >
                      <Trash2 className="size-4" />
                    </button>
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
