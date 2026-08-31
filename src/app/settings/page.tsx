import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Building2,
  CreditCard,
  FileText,
  KeyRound,
  ListChecks,
  Percent,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/layout";

export default function Page() {
  const sections = [
    {
      title: "Store Profile",
      description: "Store identity, logo, contact, timezone and currency",
      href: "/settings/store-profile",
      icon: Building2,
    },
    {
      title: "Tax Configuration",
      description: "Global and location-specific tax rules",
      href: "/settings/tax-rules",
      icon: Percent,
    },
    {
      title: "Payment Methods",
      description: "Cash, card, wallet and bank transfer availability",
      href: "/settings/payment-methods",
      icon: CreditCard,
    },
    {
      title: "Receipt & Invoice",
      description: "Footer, logo and invoice numbering",
      href: "/settings/receipt",
      icon: FileText,
    },
    {
      title: "Notifications",
      description: "Personal email and SMS preferences",
      href: "/settings/notifications",
      icon: Bell,
    },
    {
      title: "Security Policy",
      description: "Passwords, sessions and two-factor authentication",
      href: "/settings/security",
      icon: ShieldCheck,
    },
    {
      title: "Integrations",
      description: "Third-party providers and protected API keys",
      href: "/settings/integrations",
      icon: KeyRound,
    },
    {
      title: "Activity Log",
      description: "Auth, Banking and Catalogue activity history",
      href: "/settings/activity-log",
      icon: ListChecks,
    },
  ];
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="flex items-start gap-4">
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
            <h1 className="mt-2 text-3xl font-bold">Settings</h1>
            <p className="mt-2 text-sm text-muted">
              Configure store identity, payments, notifications, security and
              integrations.
            </p>
          </div>
        </header>
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ icon: Icon, ...section }) => (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-2xl border border-border bg-white p-6 transition hover:border-primary"
            >
              <Icon className="size-6 text-primary" />
              <h2 className="mt-5 font-bold">{section.title}</h2>
              <p className="mt-2 text-sm text-muted">{section.description}</p>
            </Link>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
