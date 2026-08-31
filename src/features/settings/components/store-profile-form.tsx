"use client";
import { useState } from "react";
import type { StoreProfile } from "../types";

const initialProfile: StoreProfile = {
  storeName: "Total Store",
  logoUrl: "",
  contactEmail: "store@totalstore.pk",
  contactPhone: "+92 300 1234567",
  timezone: "Asia/Karachi",
  currency: "PKR",
};

export function StoreProfileForm() {
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  function change(key: keyof StoreProfile, value: string) {
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    setSaved(true);
  }
  const field =
    "mt-2 h-11 w-full rounded-xl border border-border bg-white px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10";
  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Store name
          <input
            required
            value={profile.storeName}
            onChange={(event) => change("storeName", event.target.value)}
            className={field}
          />
        </label>
        <label className="text-sm font-semibold">
          Logo URL
          <input
            type="url"
            value={profile.logoUrl ?? ""}
            onChange={(event) => change("logoUrl", event.target.value)}
            placeholder="https://..."
            className={field}
          />
        </label>
        <label className="text-sm font-semibold">
          Contact email
          <input
            type="email"
            value={profile.contactEmail ?? ""}
            onChange={(event) => change("contactEmail", event.target.value)}
            className={field}
          />
        </label>
        <label className="text-sm font-semibold">
          Contact phone
          <input
            value={profile.contactPhone ?? ""}
            onChange={(event) => change("contactPhone", event.target.value)}
            className={field}
          />
        </label>
        <label className="text-sm font-semibold">
          Timezone
          <select
            value={profile.timezone}
            onChange={(event) => change("timezone", event.target.value)}
            className={field}
          >
            <option value="Asia/Karachi">Asia/Karachi</option>
            <option value="Europe/London">Europe/London</option>
            <option value="UTC">UTC</option>
          </select>
        </label>
        <label className="text-sm font-semibold">
          Currency
          <select
            value={profile.currency}
            onChange={(event) => change("currency", event.target.value)}
            className={field}
          >
            <option value="PKR">PKR</option>
            <option value="GBP">GBP</option>
            <option value="USD">USD</option>
          </select>
        </label>
      </div>
      <div className="mt-6 flex items-center justify-end gap-4">
        {saved && (
          <span className="text-sm font-medium text-emerald-700">
            Profile saved
          </span>
        )}
        <button
          disabled={saving}
          className="h-11 rounded-xl bg-primary px-5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save profile"}
        </button>
      </div>
    </form>
  );
}
