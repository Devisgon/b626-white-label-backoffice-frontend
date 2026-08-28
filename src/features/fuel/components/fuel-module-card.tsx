import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import type { FuelModuleColor } from "@/config/fuel-modules";

interface FuelModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: FuelModuleColor;
}

const colorClasses: Record<FuelModuleColor, string> = {
  green: "bg-emerald-50 text-emerald-700",
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-purple-50 text-purple-700",
  orange: "bg-orange-50 text-orange-700",
  red: "bg-red-50 text-red-700",
};

export function FuelModuleCard({
  title,
  description,
  href,
  icon: Icon,
  color,
}: FuelModuleCardProps) {
  return (
    <Link
      href={href}
      className="
        group relative flex min-h-48 flex-col
        justify-between overflow-hidden rounded-2xl
        border border-border bg-white p-5
        shadow-[var(--shadow-sm)]
        transition duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-[var(--shadow-md)]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`
            flex size-11 items-center
            justify-center rounded-xl
            transition duration-300
            group-hover:scale-105
            ${colorClasses[color]}
          `}
        >
          <Icon className="size-5" />
        </span>

        <span
          className="
            flex size-9 items-center justify-center
            rounded-full border border-border
            text-muted transition duration-300
            group-hover:border-primary
            group-hover:bg-primary
            group-hover:text-white
          "
        >
          <ArrowRight
            className="
              size-4 transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </span>
      </div>

      <div className="mt-8">
        <h2
          className="
            font-bold transition-colors
            group-hover:text-primary
          "
        >
          {title}
        </h2>

        <p className="mt-2 text-xs leading-5 text-muted">{description}</p>
      </div>

      <div
        className="
          absolute -bottom-14 -right-14
          size-28 rounded-full bg-primary/5
          transition duration-500
          group-hover:scale-150
        "
      />
    </Link>
  );
}
