"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowLeft,
  BadgeDollarSign,
  Boxes,
  CircleDollarSign,
  Gamepad2,
  Ticket,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  lotteryModules,
} from "@/config/lottery-modules";
import {
  LotteryModuleCard,
} from "@/features/lottery/components";
import { useAuthStore } from "@/store";
import { USER_ROLES } from "@/types/role";

export default function LotteryPage() {
  const user = useAuthStore(
    (state) => state.user,
  );

  const currentRole =
    user?.role ?? USER_ROLES.OWNER_ADMIN;

  const availableModules = useMemo(
    () =>
      lotteryModules.filter((module) =>
        module.allowedRoles.includes(
          currentRole,
        ),
      ),
    [currentRole],
  );

  return (
    <AppShell>
      <div
        className="
          mx-auto max-w-[1250px]
          px-4 py-8 sm:px-6
          lg:px-8 lg:py-10
        "
      >
        <section className="flex items-start gap-4">
          <Link
            href="/"
            aria-label="Return to dashboard"
            className="
              flex size-10 shrink-0 items-center
              justify-center rounded-xl border
              border-border bg-white text-muted
              transition hover:border-primary
              hover:bg-primary-light hover:text-primary
            "
          >
            <ArrowLeft className="size-4" />
          </Link>

          <span
            className="
              hidden size-10 shrink-0 items-center
              justify-center rounded-xl
              bg-purple-50 text-purple-700
              sm:flex
            "
          >
            <Ticket className="size-4" />
          </span>

          <div>
            <p
              className="
                text-xs font-bold uppercase
                tracking-[0.14em] text-primary
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
              Lottery
            </h1>

            <p className="mt-2 text-sm text-muted">
              Manage games, ticket packs, sales and
              daily lottery settlements.
            </p>
          </div>
        </section>

        <section
          aria-label="Lottery overview"
          className="
            mt-8 grid gap-4
            sm:grid-cols-2 lg:grid-cols-4
          "
        >
          <OverviewCard
            title="Active games"
            value="12"
            helper="Available for sale"
            icon={
              <Gamepad2 className="size-5" />
            }
            color="purple"
          />

          <OverviewCard
            title="Active packs"
            value="38"
            helper="Across all lottery games"
            icon={<Boxes className="size-5" />}
            color="blue"
          />

          <OverviewCard
            title="Today's sales"
            value="PKR 45,850"
            helper="184 tickets sold"
            icon={
              <BadgeDollarSign className="size-5" />
            }
            color="green"
          />

          <OverviewCard
            title="Pending settlement"
            value="PKR 8,450"
            helper="Requires review"
            icon={
              <CircleDollarSign className="size-5" />
            }
            color="orange"
          />
        </section>

        <section className="mt-10">
          <div
            className="
              flex items-end justify-between gap-4
            "
          >
            <div>
              <h2 className="text-lg font-bold">
                Lottery workspace
              </h2>

              <p className="mt-1 text-xs text-muted">
                Quick access based on your role and
                permissions.
              </p>
            </div>

            <span
              className="
                hidden rounded-full bg-primary-light
                px-3 py-1.5 text-[11px]
                font-semibold text-primary
                sm:inline-flex
              "
            >
              {availableModules.length} sections
              available
            </span>
          </div>

          <div
            className="
              mt-5 grid gap-4
              sm:grid-cols-2 lg:grid-cols-4
            "
          >
            {availableModules.map((module) => (
              <LotteryModuleCard
                key={module.href}
                title={module.title}
                description={module.description}
                href={module.href}
                icon={module.icon}
                color={module.color}
              />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

type OverviewColor =
  | "green"
  | "blue"
  | "purple"
  | "orange";

function OverviewCard({
  title,
  value,
  helper,
  icon,
  color,
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  color: OverviewColor;
}) {
  const colorClasses: Record<
    OverviewColor,
    string
  > = {
    green:
      "bg-emerald-50 text-emerald-700",
    blue:
      "bg-blue-50 text-blue-700",
    purple:
      "bg-purple-50 text-purple-700",
    orange:
      "bg-orange-50 text-orange-700",
  };

  return (
    <article
      className="
        flex items-center gap-4 rounded-2xl
        border border-border bg-white p-5
        shadow-[var(--shadow-sm)]
        transition duration-300
        hover:-translate-y-1
        hover:shadow-[var(--shadow-md)]
      "
    >
      <span
        className={`
          flex size-11 shrink-0 items-center
          justify-center rounded-xl
          ${colorClasses[color]}
        `}
      >
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 truncate text-xl font-bold">
          {value}
        </p>

        <p className="mt-1 text-[10px] text-muted">
          {helper}
        </p>
      </div>
    </article>
  );
}