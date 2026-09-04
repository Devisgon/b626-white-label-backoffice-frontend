import { Building2, KeyRound, MapPin, Store } from "lucide-react";

import type { AccessibleLocation } from "../types";

export function LocationDetails({
  location,
}: {
  location: AccessibleLocation;
}) {
  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <InfoCard
          label="Location name"
          value={location.name}
          helper="Store or operational site"
          icon={<Store className="size-5" />}
        />
        <InfoCard
          label="Address"
          value={location.address ?? "Not provided"}
          helper="Registered location address"
          icon={<MapPin className="size-5" />}
        />
        <InfoCard
          label="Access"
          value="Assigned"
          helper="Available to the current user"
          icon={<KeyRound className="size-5" />}
        />
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Building2 className="size-4" />
          </span>
          <div>
            <h2 className="font-bold">Location information</h2>
            <p className="mt-1 text-xs text-muted">
              Backend-aligned location and organization identifiers.
            </p>
          </div>
        </div>

        <dl className="mt-6 divide-y divide-border">
          <DetailsRow label="Location name" value={location.name} />
          <DetailsRow
            label="Address"
            value={location.address ?? "Address not provided"}
          />
          <DetailsRow label="Location ID" value={location.id} mono />
          <DetailsRow label="Tenant ID" value={location.tenantId} mono />
          <DetailsRow label="User access" value="Assigned" />
        </dl>
      </section>
    </div>
  );
}

function InfoCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-1 truncate font-bold">{value}</p>
        <p className="mt-1 truncate text-[10px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

function DetailsRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="grid gap-2 py-4 text-sm sm:grid-cols-[180px_minmax(0,1fr)]">
      <dt className="font-medium text-muted">{label}</dt>
      <dd className={`break-all font-medium ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
