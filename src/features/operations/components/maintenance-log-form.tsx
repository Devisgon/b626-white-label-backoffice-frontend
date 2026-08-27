"use client";
import { CrudForm } from "@/components/shared";
import type { CrudRecord } from "@/types/crud-resource";
import { maintenanceLogConfig } from "../maintenance-log-demo-data";
export function MaintenanceLogForm({ mode, initialRecord }: { mode: "create" | "edit"; initialRecord?: CrudRecord }) { return <CrudForm config={maintenanceLogConfig} mode={mode} initialRecord={initialRecord} />; }
