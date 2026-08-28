"use client";
import { CrudForm } from "@/components/shared";
import type { CrudRecord } from "@/types/crud-resource";
import { expenseConfig } from "../expense-demo-data";
export function ExpenseForm({
  mode,
  initialRecord,
}: {
  mode: "create" | "edit";
  initialRecord?: CrudRecord;
}) {
  return (
    <CrudForm
      config={expenseConfig}
      mode={mode}
      initialRecord={initialRecord}
    />
  );
}
