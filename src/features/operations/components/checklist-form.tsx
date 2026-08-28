"use client";
import { CrudForm } from "@/components/shared";
import type { CrudRecord } from "@/types/crud-resource";
import { checklistConfig } from "../checklist-demo-data";
export function ChecklistForm({
  mode,
  initialRecord,
}: {
  mode: "create" | "edit";
  initialRecord?: CrudRecord;
}) {
  return (
    <CrudForm
      config={checklistConfig}
      mode={mode}
      initialRecord={initialRecord}
    />
  );
}
