"use client";

import { useState, type ReactNode } from "react";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

import { useAuthStore } from "@/store";
import { USER_ROLES } from "@/types/role";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  const currentRole = user?.role ?? USER_ROLES.OWNER_ADMIN;

  return (
    <main className="min-h-screen bg-background">
      <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        role={currentRole}
      />

      {children}
    </main>
  );
}
