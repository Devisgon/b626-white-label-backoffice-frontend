"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { getAccessibleLocation } from "../api";
import type { AccessibleLocation } from "../types";
import { LocationDetails } from "./location-details";
import { LocationHeader } from "./location-header";

export function LocationDetailsView({ id }: { id: string }) {
  const [location, setLocation] = useState<AccessibleLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLocation() {
      try {
        const result = await getAccessibleLocation(id);

        if (!result) {
          setError("This location is not assigned to your account.");
          return;
        }

        setLocation(result);
      } catch {
        setError("Unable to load location details.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadLocation();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center">
        <LoaderCircle className="size-7 animate-spin text-primary" />
      </div>
    );
  }

  if (!location) {
    return (
      <div>
        <LocationHeader
          title="Location unavailable"
          description={error}
          back="/locations"
        />
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <LocationHeader
        title={location.name}
        description="Review the selected location and its organization access."
        back="/locations"
      />
      <div className="mt-8">
        <LocationDetails location={location} />
      </div>
    </div>
  );
}
