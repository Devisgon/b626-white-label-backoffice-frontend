"use client";
import { CrudActionButton } from "@/components/shared";
export function MaintenanceLogActionButton({ deleted, onAction }: { deleted: boolean; onAction?: () => void }) { return <CrudActionButton deleted={deleted} onAction={onAction} />; }

