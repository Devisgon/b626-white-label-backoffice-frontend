import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Gamepad2,
  Pencil,
  Ticket,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import { findDemoLotteryGame } from "@/features/lottery/lottery-demo-data";

interface LotteryGameDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Karachi",
  }).format(new Date(value));
}

export default async function LotteryGameDetailsPage({
  params,
}: LotteryGameDetailsPageProps) {
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
          mx-auto max-w-[1100px]
          px-4 py-8 sm:px-6
          lg:px-8 lg:py-10
        "
      >
        <section
          className="
            flex flex-col justify-between
            gap-5 sm:flex-row
            sm:items-start
          "
        >
          <div className="flex items-start gap-4">
            <Link
              href="/lottery/games"
              aria-label="Return to lottery games"
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
                Lottery game details
              </p>

              <div
                className="
                  mt-2 flex flex-wrap
                  items-center gap-3
                "
              >
                <h1
                  className="
                    text-2xl font-bold
                    tracking-tight sm:text-3xl
                  "
                >
                  {game.name}
                </h1>

                <StatusBadge status={game.status} />
              </div>

              <p className="mt-2 text-sm text-muted">Game ID: {game.id}</p>
            </div>
          </div>

          <Link
            href={`/lottery/games/${game.id}/edit`}
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              border border-border bg-white
              px-4 text-sm font-semibold
              text-muted transition
              hover:border-primary
              hover:bg-primary-light
              hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit game
          </Link>
        </section>

        <section
          className="
            mt-8 grid gap-4
            sm:grid-cols-3
          "
        >
          <InfoCard
            title="Ticket price"
            value={formatCurrency(game.ticket_price)}
            helper="Price per ticket"
            icon={<Ticket className="size-5" />}
          />

          <InfoCard
            title="Tickets per pack"
            value={
              game.tickets_per_pack
                ? String(game.tickets_per_pack)
                : "Not provided"
            }
            helper="Tickets included in each pack"
            icon={<Gamepad2 className="size-5" />}
          />

          <InfoCard
            title="Last updated"
            value={formatDate(game.updated_at)}
            helper={`Created ${formatDate(game.created_at)}`}
            icon={<CalendarDays className="size-5" />}
          />
        </section>

        <section
          className="
            mt-6 rounded-2xl border
            border-border bg-white p-5
            shadow-[var(--shadow-sm)]
            sm:p-6
          "
        >
          <div>
            <h2 className="font-bold">Game information</h2>

            <p className="mt-1 text-xs text-muted">
              General ticket and pack information for this game.
            </p>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow label="Game name" value={game.name} />

            <DetailsRow
              label="Game number"
              value={game.game_number ?? "Not provided"}
            />

            <DetailsRow
              label="Ticket price"
              value={formatCurrency(game.ticket_price)}
            />

            <DetailsRow
              label="Tickets per pack"
              value={
                game.tickets_per_pack
                  ? String(game.tickets_per_pack)
                  : "Not provided"
              }
            />

            <DetailsRow label="Status" value={game.status} />

            <DetailsRow label="Created" value={formatDate(game.created_at)} />

            <DetailsRow
              label="Last updated"
              value={formatDate(game.updated_at)}
            />
          </dl>
        </section>
      </div>
    </AppShell>
  );
}

function StatusBadge({ status }: { status: "Active" | "Inactive" }) {
  return (
    <span
      className={`
        inline-flex rounded-full
        px-2.5 py-1 text-[10px]
        font-semibold
        ${
          status === "Active"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-700"
        }
      `}
    >
      {status}
    </span>
  );
}

function InfoCard({
  title,
  value,
  helper,
  icon,
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
}) {
  return (
    <article
      className="
        flex items-center gap-4
        rounded-2xl border border-border
        bg-white p-5
        shadow-[var(--shadow-sm)]
      "
    >
      <span
        className="
          flex size-11 shrink-0
          items-center justify-center
          rounded-xl bg-purple-50
          text-purple-700
        "
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">{title}</p>

        <p className="mt-1 truncate font-bold">{value}</p>

        <p className="mt-1 truncate text-[11px] text-muted">{helper}</p>
      </div>
    </article>
  );
}

function DetailsRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        grid gap-2 py-4 text-sm
        sm:grid-cols-[180px_minmax(0,1fr)]
      "
    >
      <dt className="font-medium text-muted">{label}</dt>

      <dd className="font-medium">{value}</dd>
    </div>
  );
}
