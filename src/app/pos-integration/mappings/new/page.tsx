import { AppShell } from "@/components/layout";
import { PosHeader, PosMappingForm } from "@/features/pos-integration";
export default function Page() { return <AppShell><main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><PosHeader title="Add Mapping" description="Connect one internal record to its provider-facing POS key." back="/pos-integration/mappings" /><PosMappingForm /></main></AppShell>; }
