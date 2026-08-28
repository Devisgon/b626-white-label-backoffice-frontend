import type { ProductStatus } from "@/features/products/types";
import { cn } from "@/utils";

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1",
        "text-[11px] font-semibold",
        status === "Active"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600",
      )}
    >
      {status}
    </span>
  );
}
