"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Database,
  Fuel,
  ReceiptText,
} from "lucide-react";

import { AppShell } from "@/components/layout";
import {
  fuelModules,
} from "@/config/fuel-modules";
import {
  FuelModuleCard,
} from "@/features/fuel/components";
import { useAuthStore } from "@/store";
import { USER_ROLES } from "@/types/role";

export default function FuelPage() {
  const user = useAuthStore(
    (state) => state.user,
  );

  const currentRole =
    user?.role ?? USER_ROLES.OWNER_ADMIN;

  const availableModules = useMemo(
    () =>
      fuelModules.filter((module) =>
        module.allowedRoles.includes(
          currentRole,
        ),
      ),
    [currentRole],
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-[1250px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
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
              bg-blue-50 text-blue-700 sm:flex
            "
          >
            <Fuel className="size-4" />
          </span>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Fuel management
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Fuel
            </h1>

            <p className="mt-2 text-sm text-muted">
              Manage tanks, pumps, prices,
              deliveries and fuel sales.
            </p>
          </div>
        </section>

        <section
          aria-label="Fuel overview"
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          <OverviewCard
            title="Current stock"
            value="42,850 litres"
            helper="Across all active tanks"
            icon={
              <Database className="size-5" />
            }
            color="green"
          />

          <OverviewCard
            title="Active pumps"
            value="8 pumps"
            helper="Connected and available"
            icon={<Fuel className="size-5" />}
            color="blue"
          />

          <OverviewCard
            title="Today’s sales"
            value="PKR 685,250"
            helper="9.4% from yesterday"
            icon={
              <ReceiptText className="size-5" />
            }
            color="orange"
            trend
          />
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">
                Fuel workspace
              </h2>

              <p className="mt-1 text-xs text-muted">
                Quick access based on your role and
                permissions.
              </p>
            </div>

            <span
              className="
                hidden rounded-full
                bg-primary-light px-3 py-1.5
                text-[11px] font-semibold
                text-primary sm:inline-flex
              "
            >
              {availableModules.length} sections
              available
            </span>
          </div>

          <div
            className="
              mt-5 grid gap-4
              sm:grid-cols-2 lg:grid-cols-3
            "
          >
            {availableModules.map((module) => (
              <FuelModuleCard
                key={module.href}
                title={module.title}
                description={
                  module.description
                }
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

function OverviewCard({
  title,
  value,
  helper,
  icon,
  color,
  trend = false,
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  color: "green" | "blue" | "orange";
  trend?: boolean;
}) {
  const colorClasses = {
    green:
      "bg-emerald-50 text-emerald-700",
    blue:
      "bg-blue-50 text-blue-700",
    orange:
      "bg-orange-50 text-orange-700",
  };

  return (
    <article
      className="
        flex items-center gap-4 rounded-2xl
        border border-border bg-white p-5
        shadow-[var(--shadow-sm)]
        transition hover:-translate-y-1
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

      <div>
        <p className="text-xs text-muted">
          {title}
        </p>

        <p className="mt-1 text-xl font-bold">
          {value}
        </p>

        <p
          className={`
            mt-1 flex items-center gap-1
            text-[10px]
            ${
              trend
                ? "font-medium text-success"
                : "text-muted"
            }
          `}
        >
          {trend && (
            <ArrowUpRight className="size-3" />
          )}

          {helper}
        </p>
      </div>
    </article>
  );
}