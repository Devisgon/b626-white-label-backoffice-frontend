import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PosHeader, PosMappingForm } from "@/features/pos-integration";
import { demoPosMappings } from "@/features/pos-integration/demo-data";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const mapping = demoPosMappings.find((item) => item.id === id); if (!mapping) notFound(); return <AppShell><main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><PosHeader title="Edit Mapping" description={`Update ${mapping.externalDisplayName ?? mapping.externalEntityKey}.`} back="/pos-integration/mappings" /><PosMappingForm initialValues={mapping} /></main></AppShell>; }
