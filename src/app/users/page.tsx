import Link from "next/link";
import { ArrowLeft, ShieldCheck, Users } from "lucide-react";
import { AppShell } from "@/components/layout";
export default function Page() {
  const cards = [
    {
      title: "Staff Users",
      description: "Roles and account activation",
      href: "/users/staff",
      icon: Users,
    },
    {
      title: "Roles & Permissions",
      description: "Access rules and module permissions",
      href: "/users/permissions",
      icon: ShieldCheck,
    },
  ];
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="flex items-start gap-4">
          <Link
            href="/"
            className="flex size-10 items-center justify-center rounded-xl border border-border"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Administration
            </p>
            <h1 className="mt-2 text-3xl font-bold">Users & Access</h1>
            <p className="mt-2 text-sm text-muted">
              Manage staff accounts, roles and permission overrides.
            </p>
          </div>
        </section>
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {cards.map(({ icon: Icon, ...card }) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-border bg-white p-6 transition hover:border-primary"
            >
              <Icon className="size-6 text-primary" />
              <h2 className="mt-5 font-bold">{card.title}</h2>
              <p className="mt-2 text-sm text-muted">{card.description}</p>
            </Link>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
