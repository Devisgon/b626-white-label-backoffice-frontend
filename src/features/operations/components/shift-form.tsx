"use client";
import { CrudForm } from "@/components/shared";
import type { CrudRecord } from "@/types/crud-resource";
import { shiftConfig } from "../shift-demo-data";
export function ShiftForm({
  mode,
  initialRecord,
}: {
  mode: "create" | "edit";
  initialRecord?: CrudRecord;
}) {
  return (
    <CrudForm config={shiftConfig} mode={mode} initialRecord={initialRecord} />
  );
}
