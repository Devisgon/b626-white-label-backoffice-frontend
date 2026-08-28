import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Gamepad2 } from "lucide-react";

import { AppShell } from "@/components/layout";
import { LotteryGameForm } from "@/features/lottery/components";
import { findDemoLotteryGame } from "@/features/lottery/lottery-demo-data";

interface EditLotteryGamePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditLotteryGamePage({
  params,
}: EditLotteryGamePageProps) {
  const { id } = await params;

  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) {
    notFound();
  }

  /*
   * Backend integration ke waqt:
   *
   * const game =
   *   await getLotteryGame(numericId);
   */

  const game = findDemoLotteryGame(numericId);

  if (!game) {
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
            href={`/lottery/games/${game.id}`}
            aria-label="Return to game details"
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
              rounded-xl bg-purple-50
              text-purple-700 sm:flex
            "
          >
            <Gamepad2 className="size-4" />
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
              Edit lottery game
            </h1>

            <p className="mt-2 text-sm text-muted">
              Update {game.name} and its ticket information.
            </p>
          </div>
        </section>

        <div className="mt-8">
          <LotteryGameForm
            mode="edit"
            gameId={game.id}
            initialValues={{
              name: game.name,

              game_number: game.game_number ?? "",

              ticket_price: String(game.ticket_price),

              tickets_per_pack: game.tickets_per_pack
                ? String(game.tickets_per_pack)
                : "",

              status: game.status,
            }}
          />
        </div>
      </div>
    </AppShell>
  );
}
