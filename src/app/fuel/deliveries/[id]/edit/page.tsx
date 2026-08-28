import { AppShell } from "@/components/layout";
import { FuelDeliveryForm } from "@/features/fuel/components";
export default async function EditFuelDeliveryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Edit fuel delivery</h1>
        <div className="mt-8">
          <FuelDeliveryForm
            mode="edit"
            initialValues={{
              tank_id: "1",
              supplier_name: "Pakistan State Oil",
              quantity: "8000",
              invoice_number: "INV-1042",
              delivery_date: "2026-08-25",
              status: "Received",
            }}
          />
        </div>
      </main>
    </AppShell>
  );
}
