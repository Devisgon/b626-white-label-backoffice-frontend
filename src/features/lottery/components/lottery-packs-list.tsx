"use client";

import Link from "next/link";
import {
  Boxes,
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import {
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  LotteryPackActionButton,
} from "@/features/lottery/components/lottery-pack-action-button";
import {
  demoLotteryPacks,
} from "@/features/lottery/lottery-pack-demo-data";
import type {
  LotteryPackStatus,
} from "@/features/lottery/types";

export function LotteryPacksList() {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<
      LotteryPackStatus | "all"
    >("all");

  const filteredPacks = useMemo(
    () =>
      demoLotteryPacks.filter(
        (pack) => {
          const searchValue =
            search
              .trim()
              .toLowerCase();

          const matchesSearch =
            searchValue === "" ||
            pack.pack_number
              .toLowerCase()
              .includes(
                searchValue,
              ) ||
            pack.game_name
              .toLowerCase()
              .includes(
                searchValue,
              );

          const matchesStatus =
            status === "all" ||
            pack.status === status;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      ),
    [search, status],
  );

  const activePacks =
    demoLotteryPacks.filter(
      (pack) =>
        pack.status === "Active",
    ).length;

  const inStockPacks =
    demoLotteryPacks.filter(
      (pack) =>
        pack.status === "In Stock",
    ).length;

  function resetFilters() {
    setSearch("");
    setStatus("all");
  }

  return (
    <div>
      <section
        aria-label="Lottery pack overview"
        className="
          grid gap-4 sm:grid-cols-3
        "
      >
        <StatCard
          title="Total packs"
          value={String(
            demoLotteryPacks.length,
          )}
          helper="All lottery pack records"
          icon={
            <Boxes className="size-5" />
          }
          color="blue"
        />

        <StatCard
          title="Active packs"
          value={String(activePacks)}
          helper="Currently selling tickets"
          icon={
            <Boxes className="size-5" />
          }
          color="green"
        />

        <StatCard
          title="In stock"
          value={String(inStockPacks)}
          helper="Waiting for activation"
          icon={
            <Boxes className="size-5" />
          }
          color="purple"
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
            p-5 sm:flex-row sm:items-center
          "
        >
          <div>
            <h2 className="font-bold">
              Lottery packs
            </h2>

            <p className="mt-1 text-xs text-muted">
              Manage ticket ranges, activation and
              pack availability.
            </p>
          </div>

          <Link
            href="/lottery/packs/new"
            className="
              inline-flex h-10 items-center
              justify-center gap-2 rounded-xl
              bg-primary px-4 text-sm
              font-semibold text-white
              transition hover:bg-primary-hover
            "
          >
            <Plus className="size-4" />
            Add pack
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
              placeholder="Search by pack number or game..."
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
                  | LotteryPackStatus
                  | "all",
              )
            }
            aria-label="Filter packs by status"
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

            <option value="In Stock">
              In Stock
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Completed">
              Completed
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
              w-full min-w-[950px]
              text-left
            "
          >
            <thead className="bg-surface-secondary">
              <tr
                className="
                  text-[11px] font-bold uppercase
                  tracking-wider text-muted
                "
              >
                <th className="px-5 py-4">
                  Pack
                </th>

                <th className="px-5 py-4">
                  Game
                </th>

                <th className="px-5 py-4">
                  Ticket range
                </th>

                <th className="px-5 py-4">
                  Total tickets
                </th>

                <th className="px-5 py-4">
                  Activated
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
              {filteredPacks.map(
                (pack) => {
                  const totalTickets =
                    pack.end_ticket_no -
                    pack.start_ticket_no +
                    1;

                  return (
                    <tr
                      key={pack.id}
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
                              rounded-xl bg-blue-50
                              text-blue-700
                            "
                          >
                            <Boxes className="size-4" />
                          </span>

                          <p className="font-semibold">
                            {pack.pack_number}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {pack.game_name}
                      </td>

                      <td className="px-5 py-4 text-muted">
                        {pack.start_ticket_no} –{" "}
                        {pack.end_ticket_no}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        {totalTickets}
                      </td>

                      <td className="px-5 py-4 text-muted">
                        {pack.activated_at
                          ? formatDate(
                              pack.activated_at,
                            )
                          : "Not activated"}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={
                            pack.status
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
                            href={`/lottery/packs/${pack.id}`}
                            aria-label={`View ${pack.pack_number}`}
                            title="View pack"
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
                            href={`/lottery/packs/${pack.id}/edit`}
                            aria-label={`Edit ${pack.pack_number}`}
                            title="Edit pack"
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

                          <LotteryPackActionButton
                            packId={pack.id}
                            packNumber={
                              pack.pack_number
                            }
                            deleted={
                              pack.deleted_at !==
                              null
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>

        {filteredPacks.length === 0 && (
          <div className="px-5 py-14 text-center">
            <Boxes className="mx-auto size-8 text-muted" />

            <p className="mt-3 font-semibold">
              No lottery packs found
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
          Showing {filteredPacks.length} of{" "}
          {demoLotteryPacks.length} packs
        </div>
      </section>
    </div>
  );
}

function formatDate(
  value: string,
) {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Karachi",
    },
  ).format(new Date(value));
}

interface StatCardProps {
  title: string;
  value: string;
  helper: string;
  icon: ReactNode;
  color:
    | "green"
    | "blue"
    | "purple";
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

    blue:
      "bg-blue-50 text-blue-700",

    purple:
      "bg-purple-50 text-purple-700",
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
  status: LotteryPackStatus;
}) {
  const colors: Record<
    LotteryPackStatus,
    string
  > = {
    "In Stock":
      "bg-blue-50 text-blue-700",

    Active:
      "bg-emerald-50 text-emerald-700",

    Completed:
      "bg-purple-50 text-purple-700",

    Inactive:
      "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`
        inline-flex rounded-full
        px-2.5 py-1 text-[10px]
        font-semibold
        ${colors[status]}
      `}
    >
      {status}
    </span>
  );
}