import { AppShell } from "@/components/layout";
import { LocationHeader, LocationsList } from "@/features/locations";

export default function LocationsPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1300px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <LocationHeader
          title="Locations"
          description="View assigned stores and choose your active working location."
        />

        <div className="mt-8">
          <LocationsList />
        </div>
      </main>
    </AppShell>
  );
}
