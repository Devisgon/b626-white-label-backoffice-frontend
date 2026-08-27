"use client";
import { CrudActionButton } from "@/components/shared";
export function ShiftActionButton({ deleted, onAction }: { deleted: boolean; onAction?: () => void }) { return <CrudActionButton deleted={deleted} onAction={onAction} />; }

