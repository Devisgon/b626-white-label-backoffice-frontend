import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout";
import { PermissionsManager } from "@/features/access";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-8 flex gap-4">
          <Link
            href="/users"
            className="flex size-10 items-center justify-center rounded-xl border border-border"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Users & Access
            </p>
            <h1 className="mt-2 text-3xl font-bold">Roles & Permissions</h1>
          </div>
        </header>
        <PermissionsManager />
      </main>
    </AppShell>
  );
}
