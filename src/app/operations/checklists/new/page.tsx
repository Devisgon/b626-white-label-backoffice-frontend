import { AppShell } from "@/components/layout";
import { CrudHeader } from "@/components/shared";
import { ChecklistForm } from "@/features/operations/components";
import { checklistConfig } from "@/features/operations/checklist-demo-data";
import { stripCrudSchema } from "@/types/crud-resource";
export default function Page() { const config = stripCrudSchema(checklistConfig); return <AppShell><main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><CrudHeader config={config} mode="create" /><ChecklistForm mode="create" /></main></AppShell>; }

