"use client";
import { CrudActionButton } from "@/components/shared";
export function ExpenseActionButton({ deleted, onAction }: { deleted: boolean; onAction?: () => void }) { return <CrudActionButton deleted={deleted} onAction={onAction} />; }

