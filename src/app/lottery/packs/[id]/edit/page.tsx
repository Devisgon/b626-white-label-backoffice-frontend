import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Boxes } from "lucide-react";

import { AppShell } from "@/components/layout";
import { LotteryPackForm } from "@/features/lottery/components";
import { findDemoLotteryPack } from "@/features/lottery/lottery-pack-demo-data";

interface EditLotteryPackPageProps {
  params: Promise<{
    id: string;
  }>;
}

function toDateTimeLocal(value: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60_000,
  );

  return localDate.toISOString().slice(0, 16);
}

export default async function EditLotteryPackPage({
  params,
}: EditLotteryPackPageProps) {
  const { id } = await params;

  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) {
    notFound();
  }

  /*
   * Backend integration ke waqt:
   *
   * const pack =
   *   await getLotteryPack(numericId);
   */

  const pack = findDemoLotteryPack(numericId);

  if (!pack) {
    notFound();
  }

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
            href={`/lottery/packs/${pack.id}`}
            aria-label="Return to pack details"
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
              Edit lottery pack
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update {pack.pack_number}, its ticket range and availability.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <LotteryPackForm
            mode="edit"
            packId={pack.id}
            initialValues={{
              game_id: String(pack.game_id),

              pack_number: pack.pack_number,

              start_ticket_no: String(pack.start_ticket_no),

              end_ticket_no: String(pack.end_ticket_no),

              activated_at: toDateTimeLocal(pack.activated_at),

              location_id: pack.location_id ?? "",

              status: pack.status,
            }}
          />
        </div>
      </div>
    </AppShell>
  );
}
