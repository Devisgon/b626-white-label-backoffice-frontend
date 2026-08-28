"use client";
import { CrudList } from "@/components/shared";
import { stripCrudSchema } from "@/types/crud-resource";
import { lotterySettlementConfig } from "../lottery-settlement-demo-data";
export function LotterySettlementsList() {
  return <CrudList config={stripCrudSchema(lotterySettlementConfig)} />;
}
