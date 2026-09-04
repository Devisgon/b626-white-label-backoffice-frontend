"use client";

import { Clock3, Menu } from "lucide-react";

import { Button } from "@/components/ui";
import { LocationSwitcher } from "@/features/locations";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header
      className="
        sticky top-0 z-30 flex h-[74px] items-center justify-between
        border-b border-border bg-white/90 px-4 backdrop-blur-xl
        sm:px-6 lg:px-8
      "
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </Button>

        <div
          className="
            flex size-10 items-center justify-center rounded-xl
            bg-gradient-to-br from-emerald-500 to-primary
            text-xs font-bold text-white
            shadow-[0_8px_20px_rgb(8_122_91_/_25%)]
          "
        >
          TS
        </div>

        <div className="hidden sm:block">
          <p className="text-sm font-semibold leading-none text-foreground">
            Total Store
          </p>

          <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted">
            Backoffice
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="outline"
          className="hidden md:inline-flex"
          leftIcon={<Clock3 className="size-4 text-primary" />}
        >
          Clock In
        </Button>

        <LocationSwitcher />

        <button
          type="button"
          aria-label="Open profile"
          className="
            flex size-10 items-center justify-center rounded-full
            bg-gradient-to-br from-[#244a40] to-primary
            text-xs font-semibold text-white
            ring-2 ring-white
          "
        >
          AM
        </button>
      </div>
    </header>
  );
}
