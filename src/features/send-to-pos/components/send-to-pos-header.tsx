import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";

interface SendToPosHeaderProps {
  title: string;
  description: string;
  back?: string;
}

export function SendToPosHeader({
  title,
  description,
  back = "/send-to-pos",
}: SendToPosHeaderProps) {
  return (
    <header className="flex items-start gap-4">
      <Link
        href={back}
        aria-label="Go back"
        className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-muted transition hover:border-primary hover:text-primary"
      >
        <ArrowLeft className="size-4" />
      </Link>

      <span className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 sm:flex">
        <Send className="size-4" />
      </span>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
          POS publishing
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>

        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
    </header>
  );
}
