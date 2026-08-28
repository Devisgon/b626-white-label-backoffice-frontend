"use client";
import { CrudList } from "@/components/shared";
import { stripCrudSchema } from "@/types/crud-resource";
import { checklistConfig } from "../checklist-demo-data";
export function ChecklistsList() {
  return <CrudList config={stripCrudSchema(checklistConfig)} />;
}
