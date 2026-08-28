import { AppShell } from "@/components/layout";
import { FuelDeliveriesList } from "@/features/fuel/components";
export default function FuelDeliveriesPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-primary">
          Fuel management
        </p>
        <h1 className="mt-2 text-3xl font-bold">Fuel deliveries</h1>
        <p className="mt-2 text-sm text-muted">
          Manage supplier deliveries and received fuel quantities.
        </p>
        <div className="mt-8">
          <FuelDeliveriesList />
        </div>
      </main>
    </AppShell>
  );
}
