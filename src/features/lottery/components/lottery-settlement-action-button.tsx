"use client";
import { CrudActionButton } from "@/components/shared";
export function LotterySettlementActionButton({
  deleted,
  onAction,
}: {
  deleted: boolean;
  onAction?: () => void;
}) {
  return <CrudActionButton deleted={deleted} onAction={onAction} />;
}
