import Link from "next/link";
import { ArrowLeft, Boxes } from "lucide-react";

import { AppShell } from "@/components/layout";
import { LotteryPackForm } from "@/features/lottery/components";

export default function NewLotteryPackPage() {
  return (
    <AppShell>
      <div
        className="
          mx-auto max-w-3xl
          px-4 py-8 sm:px-6
          lg:px-8 lg:py-10
        "
      >
        <section className="flex items-start gap-4">
          <Link
            href="/lottery/packs"
            aria-label="Return to lottery packs"
            className="
              flex size-10 shrink-0
              items-center justify-center
              rounded-xl border
              border-border bg-white
              text-muted transition
              hover:border-primary
              hover:bg-primary-light
              hover:text-primary
            "
          >
            <ArrowLeft className="size-4" />
          </Link>

          <span
            className="
              hidden size-10 shrink-0
              items-center justify-center
              rounded-xl bg-blue-50
              text-blue-700 sm:flex
            "
          >
            <Boxes className="size-4" />
          </span>

          <div>
            <p
              className="
                text-xs font-bold uppercase
                tracking-[0.14em]
                text-primary
              "
            >
              Lottery management
            </p>

            <h1
              className="
                mt-2 text-2xl font-bold
                tracking-tight sm:text-3xl
              "
            >
              Add lottery pack
            </h1>

            <p className="mt-2 text-sm text-muted">
              Create a ticket pack and assign it to a lottery game and location.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <LotteryPackForm mode="create" />
        </div>
      </div>
    </AppShell>
  );
}
