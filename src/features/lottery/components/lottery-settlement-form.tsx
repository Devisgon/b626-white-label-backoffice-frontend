"use client";
import { CrudForm } from "@/components/shared";
import type { CrudRecord } from "@/types/crud-resource";
import { lotterySettlementConfig } from "../lottery-settlement-demo-data";
export function LotterySettlementForm({
  mode,
  initialRecord,
}: {
  mode: "create" | "edit";
  initialRecord?: CrudRecord;
}) {
  return (
    <CrudForm
      config={lotterySettlementConfig}
      mode={mode}
      initialRecord={initialRecord}
    />
  );
}
