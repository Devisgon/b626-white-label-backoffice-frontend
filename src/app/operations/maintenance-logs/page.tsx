import { AppShell } from "@/components/layout";
import { CrudHeader } from "@/components/shared";
import { MaintenanceLogsList } from "@/features/operations/components";
import { maintenanceLogConfig } from "@/features/operations/maintenance-log-demo-data";
import { stripCrudSchema } from "@/types/crud-resource";
export default function Page() { const config = stripCrudSchema(maintenanceLogConfig); return <AppShell><main className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><CrudHeader config={config} mode="list" /><MaintenanceLogsList /></main></AppShell>; }

