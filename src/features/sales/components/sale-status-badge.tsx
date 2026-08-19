import type { SaleStatus } from "@/features/sales/types";
import { cn } from "@/utils";

interface SaleStatusBadgeProps {
  status: SaleStatus;
}

const statusStyles: Record<SaleStatus, string> = {
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
  refunded: "bg-purple-50 text-purple-700",
  partially_refunded: "bg-orange-50 text-orange-700",
};

const statusLabels: Record<SaleStatus, string> = {
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
  partially_refunded: "Partially refunded",
};

export function SaleStatusBadge({
  status,
}: SaleStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-1",
        "text-[11px] font-semibold",
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}