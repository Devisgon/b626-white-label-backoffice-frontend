import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import { CrudHeader } from "@/components/shared";
import { ChecklistForm } from "@/features/operations/components";
import { checklistConfig, findDemoChecklist } from "@/features/operations/checklist-demo-data";
import { stripCrudSchema } from "@/types/crud-resource";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const record = findDemoChecklist(Number(id)); if (!record) notFound(); const config = stripCrudSchema(checklistConfig); return <AppShell><main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><CrudHeader config={config} mode="edit" id={Number(id)} /><ChecklistForm mode="edit" initialRecord={record} /></main></AppShell>; }

