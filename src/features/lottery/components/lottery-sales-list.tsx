"use client";
import { CrudList } from "@/components/shared";
import { stripCrudSchema } from "@/types/crud-resource";
import { lotterySaleConfig } from "../lottery-sale-demo-data";
export function LotterySalesList() {
  return <CrudList config={stripCrudSchema(lotterySaleConfig)} />;
}
