import Link from "next/link";
import { ArrowLeft, Settings } from "lucide-react";

export function SettingsPageHeader({
  title,
  description,
  back = "/settings",
}: {
  title: string;
  description: string;
  back?: string;
}) {
  return (
    <header className="mb-8 flex items-start gap-4">
      <Link
        href={back}
        aria-label="Go back"
        className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-muted"
      >
        <ArrowLeft className="size-4" />
      </Link>
      <span className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 sm:flex">
        <Settings className="size-4" />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          System settings
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
    </header>
  );
}
