import { AppShell } from "@/components/layout";
import { FuelDeliveryForm } from "@/features/fuel/components";
export default function NewFuelDeliveryPage(){return <AppShell><main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8"><p className="text-xs font-bold uppercase tracking-[.14em] text-primary">Fuel management</p><h1 className="mt-2 text-3xl font-bold">Add fuel delivery</h1><div className="mt-8"><FuelDeliveryForm/></div></main></AppShell>}

