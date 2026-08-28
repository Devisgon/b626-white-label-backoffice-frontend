import { AppShell } from "@/components/layout";
import { FuelSaleForm } from "@/features/fuel/components";
export default async function EditFuelSalePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Edit fuel sale</h1>
        <div className="mt-8">
          <FuelSaleForm
            mode="edit"
            initialValues={{
              pump_id: "1",
              tank_id: "1",
              opening_reading: "12000",
              closing_reading: "12450",
              price_per_liter: "272.95",
              payment_method: "Cash",
              shift: "Morning",
              sale_date: "2026-08-25",
              status: "Completed",
            }}
          />
        </div>
      </main>
    </AppShell>
  );
}
