"use client";

import { Check, ChevronDown, LoaderCircle, Store } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "@/store";

import { getAccessibleLocations, switchActiveLocation } from "../api";
import type { AccessibleLocation } from "../types";

export function LocationSwitcher() {
  const activeLocation = useAuthStore((state) => state.activeLocation);
  const setActiveLocation = useAuthStore((state) => state.setActiveLocation);
  const updateTokens = useAuthStore((state) => state.updateTokens);
  const [locations, setLocations] = useState<AccessibleLocation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [switchingId, setSwitchingId] = useState("");
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  async function openSwitcher() {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (!nextOpen || locations.length > 0) return;

    setIsLoading(true);
    setError("");

    try {
      setLocations(await getAccessibleLocations());
    } catch {
      setError("Unable to load your locations.");
    } finally {
      setIsLoading(false);
    }
  }

  async function selectLocation(location: AccessibleLocation) {
    if (location.id === activeLocation?.id) {
      setIsOpen(false);
      return;
    }

    setSwitchingId(location.id);
    setError("");

    try {
      const response = await switchActiveLocation({ locationId: location.id });
      updateTokens(response.accessToken, response.refreshToken);
      setActiveLocation(location);
      setIsOpen(false);
    } catch {
      setError("Unable to switch location. Please try again.");
    } finally {
      setSwitchingId("");
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={openSwitcher}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-3 rounded-xl border border-border bg-white p-2 pr-3 text-left transition-colors hover:bg-surface-secondary"
      >
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary-light text-primary">
          <Store className="size-[18px]" />
        </span>
        <span className="hidden md:flex md:max-w-44 md:flex-col">
          <strong className="truncate text-xs font-semibold">
            {activeLocation?.name ?? "Select location"}
          </strong>
          <small className="mt-0.5 truncate text-[10px] text-muted">
            {activeLocation?.address ?? "Choose your working location"}
          </small>
        </span>
        <ChevronDown
          className={`hidden size-4 text-muted transition md:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select active location"
          className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-[var(--shadow-lg)]"
        >
          <div className="px-3 py-2">
            <p className="text-xs font-bold">Switch location</p>
            <p className="mt-1 text-[10px] text-muted">
              Choose where you are currently working.
            </p>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-2 px-3 py-6 text-xs text-muted">
              <LoaderCircle className="size-4 animate-spin" />
              Loading locations...
            </div>
          )}

          {error && (
            <p className="mx-2 my-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </p>
          )}

          {!isLoading && !error && locations.length === 0 && (
            <p className="px-3 py-6 text-center text-xs text-muted">
              No assigned locations found.
            </p>
          )}

          <div className="mt-1 space-y-1">
            {locations.map((location) => {
              const isCurrent = location.id === activeLocation?.id;
              const isSwitching = location.id === switchingId;

              return (
                <button
                  key={location.id}
                  type="button"
                  role="option"
                  aria-selected={isCurrent}
                  disabled={Boolean(switchingId)}
                  onClick={() => selectLocation(location)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition disabled:opacity-60 ${
                    isCurrent
                      ? "bg-primary-light text-primary"
                      : "hover:bg-surface-secondary"
                  }`}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Store className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-xs font-semibold">
                      {location.name}
                    </strong>
                    <small className="mt-1 block truncate text-[10px] text-muted">
                      {location.address ?? "Address not provided"}
                    </small>
                  </span>
                  {isSwitching ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    isCurrent && <Check className="size-4 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
