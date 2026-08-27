"use client";
import { CrudList } from "@/components/shared";
import { stripCrudSchema } from "@/types/crud-resource";
import { maintenanceLogConfig } from "../maintenance-log-demo-data";
export function MaintenanceLogsList() { return <CrudList config={stripCrudSchema(maintenanceLogConfig)} />; }
