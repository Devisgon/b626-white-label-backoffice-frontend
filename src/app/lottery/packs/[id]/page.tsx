import Link from "next/link";
import {
  notFound,
} from "next/navigation";
import {
  ArrowLeft,
  Boxes,
  CalendarDays,
  MapPin,
  Pencil,
  Ticket,
} from "lucide-react";

import {
  AppShell,
} from "@/components/layout";
import {
  findDemoLotteryPack,
} from "@/features/lottery/lottery-pack-demo-data";
import type {
  LotteryPackStatus,
} from "@/features/lottery/types";

interface LotteryPackDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
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
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Karachi",
    },
  ).format(new Date(value));
}

function getLocationName(
  locationId: string | null,
) {
  if (
    locationId ===
    "b3f1c2e0-1234-4a5b-9c6d-7e8f9a0b1c2d"
  ) {
    return "Phoenix Store";
  }

  if (
    locationId ===
    "d4f2a3b1-4321-4c5d-8e7f-1a2b3c4d5e6f"
  ) {
    return "Main Warehouse";
  }

  return "Not assigned";
}

export default async function LotteryPackDetailsPage({
  params,
}: LotteryPackDetailsPageProps) {
  const { id } = await params;

  const numericId = Number(id);

  if (
    !Number.isInteger(numericId) ||
    numericId < 1
  ) {
    notFound();
  }

  /*
   * Backend integration ke waqt:
   *
   * const pack =
   *   await getLotteryPack(numericId);
   */

  const pack =
    findDemoLotteryPack(
      numericId,
    );

  if (!pack) {
    notFound();
  }

  const totalTickets =
    pack.end_ticket_no -
    pack.start_ticket_no +
    1;

  const locationName =
    getLocationName(
      pack.location_id,
    );

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
                Lottery pack details
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
                  {pack.pack_number}
                </h1>

                <StatusBadge
                  status={pack.status}
                />
              </div>

              <p className="mt-2 text-sm text-muted">
                Pack ID: {pack.id}
              </p>
            </div>
          </div>

          <Link
            href={`/lottery/packs/${pack.id}/edit`}
            className="
              inline-flex h-10 items-center
              justify-center gap-2
              rounded-xl border
              border-border bg-white
              px-4 text-sm font-semibold
              text-muted transition
              hover:border-primary
              hover:bg-primary-light
              hover:text-primary
            "
          >
            <Pencil className="size-4" />
            Edit pack
          </Link>
        </section>

        <section
          className="
            mt-8 grid gap-4
            sm:grid-cols-3
          "
        >
          <InfoCard
            title="Lottery game"
            value={pack.game_name}
            helper={`Game ID: ${pack.game_id}`}
            icon={
              <Ticket className="size-5" />
            }
          />

          <InfoCard
            title="Total tickets"
            value={String(totalTickets)}
            helper={`${pack.start_ticket_no} to ${pack.end_ticket_no}`}
            icon={
              <Boxes className="size-5" />
            }
          />

          <InfoCard
            title="Location"
            value={locationName}
            helper="Current pack location"
            icon={
              <MapPin className="size-5" />
            }
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
          <div className="flex items-center gap-3">
            <span
              className="
                flex size-10 items-center
                justify-center rounded-xl
                bg-blue-50 text-blue-700
              "
            >
              <Boxes className="size-4" />
            </span>

            <div>
              <h2 className="font-bold">
                Pack information
              </h2>

              <p className="mt-1 text-xs text-muted">
                Ticket range, activation and
                availability information.
              </p>
            </div>
          </div>

          <dl className="mt-6 divide-y divide-border">
            <DetailsRow
              label="Pack number"
              value={pack.pack_number}
            />

            <DetailsRow
              label="Lottery game"
              value={pack.game_name}
            />

            <DetailsRow
              label="Starting ticket"
              value={String(
                pack.start_ticket_no,
              )}
            />

            <DetailsRow
              label="Ending ticket"
              value={String(
                pack.end_ticket_no,
              )}
            />

            <DetailsRow
              label="Total tickets"
              value={String(
                totalTickets,
              )}
            />

            <DetailsRow
              label="Activation"
              value={
                pack.activated_at
                  ? formatDate(
                      pack.activated_at,
                    )
                  : "Not activated"
              }
            />

            <DetailsRow
              label="Location"
              value={locationName}
            />

            <DetailsRow
              label="Status"
              value={pack.status}
            />

            <DetailsRow
              label="Created"
              value={formatDate(
                pack.created_at,
              )}
            />

            <DetailsRow
              label="Last updated"
              value={formatDate(
                pack.updated_at,
              )}
            />
          </dl>
        </section>
      </div>
    </AppShell>
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
          rounded-xl bg-blue-50
          text-blue-700
        "
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 truncate font-bold">
          {value}
        </p>

        <p className="mt-1 truncate text-[11px] text-muted">
          {helper}
        </p>
      </div>
    </article>
  );
}

function DetailsRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        grid gap-2 py-4 text-sm
        sm:grid-cols-[180px_minmax(0,1fr)]
      "
    >
      <dt className="font-medium text-muted">
        {label}
      </dt>

      <dd className="font-medium">
        {value}
      </dd>
    </div>
  );
}