import Link from "next/link";
import {
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

interface CatalogueCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  itemCount?: number;
  comingSoon?: boolean;
}

export function CatalogueCard({
  title,
  description,
  href,
  icon: Icon,
  itemCount,
  comingSoon = false,
}: CatalogueCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span
          className="
            flex size-11 items-center justify-center
            rounded-xl bg-primary-light text-primary
            transition-transform duration-200
            group-hover:scale-105
          "
        >
          <Icon className="size-5" />
        </span>

        {comingSoon ? (
          <span
            className="
              rounded-full bg-orange-50 px-2.5 py-1
              text-[10px] font-semibold text-orange-700
            "
          >
            Coming soon
          </span>
        ) : (
          <span
            className="
              flex size-9 items-center justify-center
              rounded-full border border-border text-muted
              transition-all duration-200
              group-hover:border-primary
              group-hover:bg-primary
              group-hover:text-white
            "
          >
            <ArrowUpRight className="size-4" />
          </span>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-base font-bold text-foreground">
          {title}
        </h2>

        <p className="mt-2 min-h-10 text-xs leading-5 text-muted">
          {description}
        </p>

        {typeof itemCount === "number" && (
          <p className="mt-4 text-[11px] font-semibold text-primary">
            {itemCount} records available
          </p>
        )}
      </div>
    </>
  );

  const className = `
    group relative overflow-hidden rounded-2xl
    border border-border bg-white p-5
    shadow-[var(--shadow-sm)]
    transition-all duration-200
    hover:-translate-y-1
    hover:border-primary/30
    hover:shadow-[var(--shadow-md)]
  `;

  if (comingSoon) {
    return (
      <article
        aria-disabled="true"
        className={`${className} cursor-not-allowed opacity-70`}
      >
        {content}
      </article>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}