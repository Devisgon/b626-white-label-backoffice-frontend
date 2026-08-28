"use client";
import { CrudForm } from "@/components/shared";
import type { CrudRecord } from "@/types/crud-resource";
import { lotterySaleConfig } from "../lottery-sale-demo-data";
export function LotterySaleForm({
  mode,
  initialRecord,
}: {
  mode: "create" | "edit";
  initialRecord?: CrudRecord;
}) {
  return (
    <CrudForm
      config={lotterySaleConfig}
      mode={mode}
      initialRecord={initialRecord}
    />
  );
}
