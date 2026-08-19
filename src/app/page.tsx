"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  ReceiptText,
  TrendingUp,
} from "lucide-react";

import { Sidebar, Topbar } from "@/components/layout";
import { dashboardModules } from "@/config/dashboard-modules";
import { ModuleCard } from "@/features/dashboard/components";
import { useAuthStore } from "@/store";
import { USER_ROLES } from "@/types/role";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const user = useAuthStore((state) => state.user);

  const currentRole =
    user?.role ?? USER_ROLES.OWNER_ADMIN;

  const availableModules = useMemo(
    () =>
      dashboardModules.filter((module) =>
        module.allowedRoles.includes(currentRole),
      ),
    [currentRole],
  );

  return (
    <main className="min-h-screen bg-background">
      <Topbar
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        role={currentRole}
      />

      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="dashboard-fade-up">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Monday, 17 August
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Good morning, {user?.name ?? "there"}
          </h1>

          <p className="mt-2 text-sm text-muted">
            Here&apos;s what&apos;s happening across your
            store today.
          </p>
        </section>

        <section
          aria-label="Store overview"
          className="
            dashboard-summary-grid
            mt-8 grid gap-4 md:grid-cols-3
          "
        >
          <article
            className="
              flex items-center gap-4 rounded-2xl
              border border-border bg-white p-5
              shadow-[var(--shadow-sm)]
            "
          >
            <span
              className="
                flex size-11 items-center justify-center
                rounded-xl bg-emerald-50 text-emerald-700
              "
            >
              <TrendingUp className="size-5" />
            </span>

            <div>
              <p className="text-xs text-muted">
                Today&apos;s sales
              </p>

              <p className="mt-1 text-xl font-bold">
                PKR 284,650
              </p>

              <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-success">
                <ArrowUpRight className="size-3" />
                12.4% from yesterday
              </p>
            </div>
          </article>

          <article
            className="
              flex items-center gap-4 rounded-2xl
              border border-border bg-white p-5
              shadow-[var(--shadow-sm)]
            "
          >
            <span
              className="
                flex size-11 items-center justify-center
                rounded-xl bg-blue-50 text-blue-700
              "
            >
              <ReceiptText className="size-5" />
            </span>

            <div>
              <p className="text-xs text-muted">
                Transactions
              </p>

              <p className="mt-1 text-xl font-bold">
                1,284
              </p>

              <p className="mt-1 text-[10px] text-muted">
                Across all registers
              </p>
            </div>
          </article>

          <article
            className="
              flex items-center gap-4 rounded-2xl
              border border-border bg-white p-5
              shadow-[var(--shadow-sm)]
            "
          >
            <span
              className="
                flex size-11 items-center justify-center
                rounded-xl bg-orange-50 text-orange-700
              "
            >
              <AlertTriangle className="size-5" />
            </span>

            <div>
              <p className="text-xs text-muted">
                Low stock
              </p>

              <p className="mt-1 text-xl font-bold">
                18 items
              </p>

              <p className="mt-1 text-[10px] font-medium text-warning">
                5 need attention today
              </p>
            </div>
          </article>
        </section>

        <section className="dashboard-workspace mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">
                Your workspace
              </h2>

              <p className="mt-1 text-xs text-muted">
                Quick access based on your role and
                permissions
              </p>
            </div>

            <span
              className="
                hidden rounded-full bg-primary-light
                px-3 py-1.5 text-[11px] font-semibold
                text-primary sm:inline-flex
              "
            >
              {availableModules.length} modules available
            </span>
          </div>

          <div
            className="
              dashboard-module-grid
              mt-5 grid gap-4
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {availableModules.map((module) => (
              <ModuleCard
                key={module.href}
                title={module.title}
                description={module.description}
                href={module.href}
                icon={module.icon}
                color={module.color}
                actionCount={module.actionCount}
                comingSoon={module.comingSoon}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}