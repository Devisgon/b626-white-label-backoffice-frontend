"use client";
import { CrudActionButton } from "@/components/shared";
export function LotterySaleActionButton({ deleted, onAction }: { deleted: boolean; onAction?: () => void }) { return <CrudActionButton deleted={deleted} onAction={onAction} />; }

