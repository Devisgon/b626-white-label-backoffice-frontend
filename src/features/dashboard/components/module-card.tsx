import Link from "next/link";
import {
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/utils";

type ModuleCardColor =
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "red"
  | "cyan"
  | "slate";

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color?: ModuleCardColor;
  actionCount?: number;
  comingSoon?: boolean;
}

const colorClasses: Record<ModuleCardColor, string> = {
  green: "bg-emerald-50 text-emerald-700",
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-violet-50 text-violet-700",
  orange: "bg-orange-50 text-orange-700",
  red: "bg-red-50 text-red-700",
  cyan: "bg-cyan-50 text-cyan-700",
  slate: "bg-slate-100 text-slate-700",
};

export function ModuleCard({
  title,
  description,
  href,
  icon: Icon,
  color = "green",
  actionCount,
  comingSoon = false,
}: ModuleCardProps) {
  const cardContent = (
    <>
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-xl",
          colorClasses[color],
        )}
      >
        <Icon className="size-5" strokeWidth={1.8} />
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-semibold text-foreground">
            {title}
          </h3>

          {comingSoon && (
            <span
              className="
                rounded-full bg-orange-50 px-2 py-0.5
                text-[9px] font-semibold text-orange-700
              "
            >
              Coming soon
            </span>
          )}
        </div>

        <p className="mt-1 text-xs leading-5 text-muted">
          {actionCount !== undefined
            ? `${actionCount} actions available`
            : description}
        </p>
      </div>

      <span
        className={cn(
          "absolute right-5 top-5 flex size-8 items-center justify-center",
          "rounded-full border border-border text-muted",
          "transition-all duration-200",
          !comingSoon &&
            "group-hover:border-primary group-hover:bg-primary group-hover:text-white",
        )}
      >
        <ArrowRight className="size-4" />
      </span>
    </>
  );

  const cardClasses = cn(
    "group relative flex min-h-40 flex-col overflow-hidden",
    "rounded-2xl border border-border bg-white p-5",
    "shadow-[var(--shadow-sm)] transition-all duration-200",
    comingSoon
      ? "cursor-not-allowed opacity-75"
      : "hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-md)]",
  );

  if (comingSoon) {
    return (
      <div
        className={cardClasses}
        aria-disabled="true"
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cardClasses}
    >
      {cardContent}
    </Link>
  );
}