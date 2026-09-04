"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, X } from "lucide-react";
import { useState } from "react";

import { dashboardModules } from "@/config/dashboard-modules";
import { logoutUser } from "@/features/auth/api";
import { useAuthStore } from "@/store";
import { ROLE_LABELS, type UserRole } from "@/types/role";
import { cn } from "@/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
}

export function Sidebar({ isOpen, onClose, role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logoutUser();
    } catch {
      // Local session is still cleared if the server session already expired.
    } finally {
      clearAuth();
      onClose();
      router.replace("/login");
      setIsLoggingOut(false);
    }
  }

  const availableModules = dashboardModules.filter((module) =>
    module.allowedRoles.includes(role),
  );

  const displayName = user?.name ?? "Amna";

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="
            fixed inset-0 z-40
            bg-black/40 backdrop-blur-[2px]
          "
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50",
          "flex w-[280px] flex-col",
          "border-r border-border bg-white p-5",
          "shadow-[var(--shadow-lg)]",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 border-b border-border pb-5">
          <div
            className="
              flex size-10 items-center justify-center
              rounded-xl bg-gradient-to-br
              from-emerald-500 to-primary
              text-xs font-bold text-white
            "
          >
            TS
          </div>

          <div>
            <p className="text-sm font-semibold">Total Store</p>

            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted">
              Backoffice
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="
              ml-auto flex size-9 items-center justify-center
              rounded-lg text-muted transition-colors
              hover:bg-surface-secondary hover:text-foreground
            "
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="mt-5 flex-1 overflow-y-auto">
          <Link
            href="/"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-xl",
              "px-3 py-2.5 text-sm font-medium",
              "transition-colors",
              pathname === "/"
                ? "bg-primary-light text-primary"
                : "text-muted hover:bg-surface-secondary hover:text-foreground",
            )}
          >
            <LayoutDashboard className="size-[18px]" />
            Dashboard
          </Link>

          <p
            className="
              mb-2 mt-7 px-3 text-[10px]
              font-bold uppercase tracking-[0.14em]
              text-muted
            "
          >
            Workspace
          </p>

          <div className="space-y-1">
            {availableModules.map((module) => {
              const Icon = module.icon;

              const isActive =
                pathname === module.href ||
                pathname.startsWith(`${module.href}/`);

              return (
                <Link
                  key={module.href}
                  href={module.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-xl",
                    "px-3 py-2.5 text-sm font-medium",
                    "transition-colors",
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-muted hover:bg-surface-secondary hover:text-foreground",
                  )}
                >
                  <Icon className="size-[18px]" />
                  {module.title}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-border pt-4">
          <div className="flex items-center gap-3 px-2">
            <div
              className="
                flex size-9 shrink-0 items-center
                justify-center rounded-full
                bg-primary text-xs font-semibold text-white
              "
            >
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{displayName}</p>

              <p className="mt-0.5 truncate text-[10px] text-muted">
                {ROLE_LABELS[role]}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-label="Log out"
              className="
                flex size-9 items-center justify-center
                rounded-lg text-muted transition-colors
                hover:bg-red-50 hover:text-danger
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              <LogOut className="size-[17px]" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
