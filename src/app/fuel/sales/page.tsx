import { AppShell } from "@/components/layout"; import { FuelSalesList } from "@/features/fuel/components";
export default function FuelSalesPage(){return <AppShell><main className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8"><p className="text-xs font-bold uppercase tracking-[.14em] text-primary">Fuel management</p><h1 className="mt-2 text-3xl font-bold">Fuel sales</h1><p className="mt-2 text-sm text-muted">Manage pump readings, quantities and fuel sale totals.</p><div className="mt-8"><FuelSalesList/></div></main></AppShell>}

