"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Eye,
  LoaderCircle,
  MapPin,
  Search,
  Store,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuthStore } from "@/store";

import { getAccessibleLocations, switchActiveLocation } from "../api";
import type { AccessibleLocation } from "../types";
import { LocationStatusPill } from "./location-status-pill";

export function LocationsList() {
  const activeLocation = useAuthStore((state) => state.activeLocation);
  const setActiveLocation = useAuthStore((state) => state.setActiveLocation);
  const updateTokens = useAuthStore((state) => state.updateTokens);
  const user = useAuthStore((state) => state.user);
  const [locations, setLocations] = useState<AccessibleLocation[]>([]);
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [switchingId, setSwitchingId] = useState("");

  useEffect(() => {
    async function loadLocations() {
      try {
        setLocations(await getAccessibleLocations());
      } catch {
        setError("Unable to load assigned locations.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadLocations();
  }, []);

  const filteredLocations = useMemo(() => {
    const query = search.trim().toLowerCase();
    return locations.filter((location) =>
      `${location.name} ${location.address ?? ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [locations, search]);

  async function makeCurrent(location: AccessibleLocation) {
    if (location.id === activeLocation?.id) return;

    setError("");
    setSuccessMessage("");
    setSwitchingId(location.id);

    try {
      const response = await switchActiveLocation({ locationId: location.id });
      updateTokens(response.accessToken, response.refreshToken);
      setActiveLocation(location);
      setSuccessMessage(`${location.name} is now your active location.`);
    } catch {
      setError("Unable to switch active location.");
    } finally {
      setSwitchingId("");
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl border border-border bg-white">
        <div className="text-center text-sm text-muted">
          <LoaderCircle className="mx-auto size-6 animate-spin text-primary" />
          <p className="mt-3">Loading assigned locations...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Accessible locations"
          value={String(locations.length)}
          helper="Locations assigned to your account"
          icon={<Store className="size-5" />}
        />
        <SummaryCard
          title="Current location"
          value={activeLocation?.name ?? "Not selected"}
          helper="Used for location-scoped operations"
          icon={<CheckCircle2 className="size-5" />}
        />
        <SummaryCard
          title="Organization"
          value={user?.name ? `${user.name}'s workspace` : "Your organization"}
          helper="Locations remain tenant-isolated"
          icon={<MapPin className="size-5" />}
        />
      </section>

      {successMessage && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
          <CheckCircle2 className="size-5 shrink-0" />
          {successMessage}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        <div className="border-b border-border p-5">
          <h2 className="font-bold">Your locations</h2>
          <p className="mt-1 text-xs text-muted">
            View assigned locations and choose the active working location.
          </p>
        </div>
        <div className="border-b border-border p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by location name or address..."
              className="h-11 w-full rounded-xl border border-border bg-white pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-surface-secondary text-[11px] font-bold uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Address</th>
                <th className="px-5 py-4">Access</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLocations.map((location) => {
                const isActive = location.id === activeLocation?.id;

                return (
                  <tr
                    key={location.id}
                    className="transition hover:bg-surface-secondary/60"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                          <Store className="size-4" />
                        </span>
                        <span className="font-semibold">{location.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted">
                      {location.address ?? "Address not provided"}
                    </td>
                    <td className="px-5 py-4">Assigned</td>
                    <td className="px-5 py-4">
                      <LocationStatusPill active={isActive} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {!isActive && (
                          <button
                            type="button"
                            disabled={Boolean(switchingId)}
                            onClick={() => makeCurrent(location)}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-border px-3 text-xs font-semibold text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary disabled:opacity-50"
                          >
                            {switchingId === location.id && (
                              <LoaderCircle className="size-3.5 animate-spin" />
                            )}
                            Make current
                          </button>
                        )}
                        <Link
                          href={`/locations/${location.id}`}
                          aria-label={`View ${location.name}`}
                          title="View location"
                          className="flex size-9 items-center justify-center rounded-xl border border-border text-muted transition hover:border-primary hover:bg-primary-light hover:text-primary"
                        >
                          <Eye className="size-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredLocations.length === 0 && (
          <div className="px-5 py-14 text-center">
            <Store className="mx-auto size-8 text-muted" />
            <p className="mt-3 font-semibold">No locations found</p>
            <p className="mt-1 text-xs text-muted">
              No assigned location matches your search.
            </p>
          </div>
        )}
        <div className="border-t border-border px-5 py-4 text-xs text-muted">
          Showing {filteredLocations.length} of {locations.length} accessible
          locations
        </div>
      </section>

      <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-xs leading-5 text-blue-800">
        The current backend supports listing assigned locations and switching
        the active location. Additional location CRUD will be added when
        backend endpoints become available.
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  helper,
  icon,
}: {
  title: string;
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
        <p className="text-xs text-muted">{title}</p>
        <p className="mt-1 truncate text-lg font-bold">{value}</p>
        <p className="mt-1 truncate text-[10px] text-muted">{helper}</p>
      </div>
    </article>
  );
}
