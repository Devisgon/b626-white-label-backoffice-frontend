import { AppShell } from "@/components/layout";
import { FuelPriceForm } from "@/features/fuel/components";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditFuelPricePage({ params }: Props) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold">Edit fuel price</h1>

        <div className="mt-8">
          <FuelPriceForm
            mode="edit"
            priceId={Number(id)}
            initialValues={{
              fuel_type: "Petrol",
              price_per_liter: "272.50",
              effective_from: "2026-08-25T00:00",
              location_id: "11111111-1111-4111-8111-111111111111",
              status: "Active",
            }}
          />
        </div>
      </div>
    </AppShell>
  );
}
