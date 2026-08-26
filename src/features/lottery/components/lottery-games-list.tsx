"use client";

import Link from "next/link";
import {
  Eye,
  Gamepad2,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Ticket,
} from "lucide-react";
import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  LotteryGameActionButton,
} from "@/features/lottery/components/lottery-game-action-button";
import {
  demoLotteryGames,
} from "@/features/lottery/lottery-demo-data";
import type {
  LotteryGameStatus,
} from "@/features/lottery/types";

const lotteryGames =
  demoLotteryGames;

function formatCurrency(
  value: number,
) {
  return new Intl.NumberFormat(
    "en-PK",
    {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 2,
    },
  ).format(value);
}

export function LotteryGamesList() {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<
      LotteryGameStatus | "all"
    >("all");

  const filteredGames = useMemo(
    () =>
      lotteryGames.filter(
        (game) => {
          const searchValue =
            search
              .trim()
              .toLowerCase();

          const matchesSearch =
            searchValue === "" ||
            game.name
              .toLowerCase()
              .includes(
                searchValue,
              ) ||
            (
              game.game_number ??
              ""
            )
              .toLowerCase()
              .includes(
                searchValue,
              );

          const matchesStatus =
            status === "all" ||
            game.status === status;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      ),
    [search, status],
  );

  const totalGames =
    lotteryGames.length;

  const activeGames =
    lotteryGames.filter(
      (game) =>
        game.status === "Active",
    ).length;

  const inactiveGames =
    lotteryGames.filter(
      (game) =>
        game.status === "Inactive",
    ).length;

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <div>
      <section
        aria-label="Lottery game overview"
        className="
          grid gap-4
          sm:grid-cols-3
        "
      >
        <StatCard
          title="Total games"
          value={String(totalGames)}
          helper="All lottery game records"
          icon={
            <Gamepad2 className="size-5" />
          }
          color="purple"
        />

        <StatCard
          title="Active games"
          value={String(activeGames)}
          helper="Currently available for sale"
          icon={
            <Ticket className="size-5" />
          }
          color="green"
        />

        <StatCard
          title="Inactive games"
          value={String(
            inactiveGames,
          )}
          helper="Not currently available"
          icon={
            <Gamepad2 className="size-5" />
          }
          color="orange"
        />
      </section>

      <section
        className="
          mt-6 overflow-hidden
          rounded-2xl border border-border
          bg-white
          shadow-[var(--shadow-sm)]
        "
      >
        <div
          className="
            flex flex-col justify-between
            gap-4 border-b border-border
            p-5 sm:flex-row
            sm:items-center
          "
        >
          <div>
            <h2 className="font-bold">
              Lottery games
            </h2>

            <p className="mt-1 text-xs text-muted">
              Manage games, ticket prices and
              ticket pack sizes.
            </p>
          </div>

          <Link
            href="/lottery/games/new"
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-4 text-sm
              font-semibold text-white
              transition hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add game
          </Link>
        </div>

        <div
          className="
            flex flex-col gap-3
            border-b border-border p-4
            lg:flex-row
          "
        >
          <div className="relative min-w-0 flex-1">
            <Search
              className="
                pointer-events-none absolute
                left-4 top-1/2 size-4
                -translate-y-1/2 text-muted
              "
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search by game name or number..."
              className="
                h-11 w-full rounded-xl
                border border-border bg-white
                pl-11 pr-4 text-sm
                outline-none transition
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
              "
            />
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | LotteryGameStatus
                  | "all",
              )
            }
            aria-label="Filter games by status"
            className="
              h-11 rounded-xl border
              border-border bg-white px-4
              text-sm outline-none transition
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
              lg:min-w-44
            "
          >
            <option value="all">
              All statuses
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="
              inline-flex h-11 items-center
              justify-center gap-2 rounded-xl
              bg-primary-light px-4
              text-sm font-medium text-primary
              transition hover:bg-primary
              hover:text-white
            "
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table
            className="
              w-full min-w-[850px]
              text-left
            "
          >
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold
                  uppercase tracking-wider
                  text-muted
                "
              >
                <th className="px-5 py-4">
                  Game
                </th>

                <th className="px-5 py-4">
                  Game number
                </th>

                <th className="px-5 py-4">
                  Ticket price
                </th>

                <th className="px-5 py-4">
                  Tickets per pack
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredGames.map(
                (game) => (
                  <tr
                    key={game.id}
                    className="
                      text-sm transition
                      hover:bg-surface-secondary/60
                    "
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="
                            flex size-9 shrink-0
                            items-center justify-center
                            rounded-xl bg-purple-50
                            text-purple-700
                          "
                        >
                          <Gamepad2 className="size-4" />
                        </span>

                        <p className="font-semibold">
                          {game.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted">
                      {game.game_number ??
                        "Not provided"}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {formatCurrency(
                        game.ticket_price,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      {game.tickets_per_pack ??
                        "Not provided"}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge
                        status={
                          game.status
                        }
                      />
                    </td>

                    <td className="px-5 py-4">
                      <div
                        className="
                          flex items-center
                          justify-end gap-2
                        "
                      >
                        <Link
                          href={`/lottery/games/${game.id}`}
                          aria-label={`View ${game.name}`}
                          title="View game"
                          className="
                            flex size-9 items-center
                            justify-center rounded-xl
                            border border-border
                            text-muted transition
                            hover:border-primary
                            hover:bg-primary-light
                            hover:text-primary
                          "
                        >
                          <Eye className="size-4" />
                        </Link>

                        <Link
                          href={`/lottery/games/${game.id}/edit`}
                          aria-label={`Edit ${game.name}`}
                          title="Edit game"
                          className="
                            flex size-9 items-center
                            justify-center rounded-xl
                            border border-border
                            text-muted transition
                            hover:border-primary
                            hover:bg-primary-light
                            hover:text-primary
                          "
                        >
                          <Pencil className="size-4" />
                        </Link>

                        <LotteryGameActionButton
                          gameId={game.id}
                          gameName={game.name}
                          deleted={
                            game.deleted_at !==
                            null
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        {filteredGames.length === 0 && (
          <div className="px-5 py-14 text-center">
            <Gamepad2
              className="
                mx-auto size-8 text-muted
              "
            />

            <p className="mt-3 font-semibold">
              No lottery games found
            </p>

            <p className="mt-1 text-xs text-muted">
              Change the search or status filter.
            </p>
          </div>
        )}

        <div
          className="
            border-t border-border
            px-5 py-4 text-xs text-muted
          "
        >
          Showing {filteredGames.length} of{" "}
          {lotteryGames.length} games
        </div>
      </section>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  helper: string;
  icon: ReactNode;
  color:
    | "green"
    | "purple"
    | "orange";
}

function StatCard({
  title,
  value,
  helper,
  icon,
  color,
}: StatCardProps) {
  const colors = {
    green:
      "bg-emerald-50 text-emerald-700",
    purple:
      "bg-purple-50 text-purple-700",
    orange:
      "bg-orange-50 text-orange-700",
  };

  return (
    <article
      className="
        flex items-center gap-4
        rounded-2xl border border-border
        bg-white p-5
        shadow-[var(--shadow-sm)]
        transition duration-300
        hover:-translate-y-1
        hover:shadow-[var(--shadow-md)]
      "
    >
      <span
        className={`
          flex size-11 shrink-0
          items-center justify-center
          rounded-xl
          ${colors[color]}
        `}
      >
        {icon}
      </span>

      <div>
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 text-xl font-bold">
          {value}
        </p>

        <p className="mt-1 text-[10px] text-muted">
          {helper}
        </p>
      </div>
    </article>
  );
}

function StatusBadge({
  status,
}: {
  status: LotteryGameStatus;
}) {
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