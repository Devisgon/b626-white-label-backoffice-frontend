import { BadgeCheck, ChartNoAxesCombined, ShieldCheck } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const benefits = [
  {
    icon: ChartNoAxesCombined,
    title: "Complete store visibility",
    description: "Track sales, products and operations from one workspace.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    description:
      "Every team member sees only the tools they are permitted to use.",
  },
  {
    icon: BadgeCheck,
    title: "Secure and reliable",
    description: "Your organisation and store data remain properly isolated.",
  },
];

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section
        className="
          relative hidden min-h-screen overflow-hidden
          bg-gradient-to-br from-[#062f28] via-[#075844] to-primary
          p-12 text-white lg:flex lg:flex-col
        "
      >
        <div
          className="
            absolute -right-32 -top-32 size-[420px]
            rounded-full bg-white/5 blur-2xl
          "
        />

        <div
          className="
            absolute -bottom-40 -left-40 size-[480px]
            rounded-full bg-emerald-300/10 blur-3xl
          "
        />

        <div className="relative z-10 flex items-center gap-3">
          <div
            className="
              flex size-11 items-center justify-center rounded-xl
              bg-white text-sm font-bold text-primary
              shadow-lg
            "
          >
            TS
          </div>

          <div>
            <p className="text-sm font-semibold">Total Store</p>

            <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/60">
              Backoffice
            </p>
          </div>
        </div>

        <div className="relative z-10 my-auto max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">
            Retail operations, simplified
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Manage every part of your store from one place.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-white/70">
            A secure backoffice workspace built for sales, inventory, banking,
            payroll and daily store operations.
          </p>

          <div className="mt-10 space-y-5">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title} className="flex items-start gap-4">
                  <span
                    className="
                      flex size-10 shrink-0 items-center justify-center
                      rounded-xl border border-white/10 bg-white/10
                    "
                  >
                    <Icon className="size-[18px]" />
                  </span>

                  <div>
                    <h2 className="text-sm font-semibold">{benefit.title}</h2>

                    <p className="mt-1 text-xs leading-5 text-white/60">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="relative z-10 text-[11px] text-white/45">
          © 2026 Total Store. All rights reserved.
        </p>
      </section>

      <section
        className="
          flex min-h-screen items-center justify-center
          bg-background px-5 py-10 sm:px-8
        "
      >
        <div className="w-full max-w-[430px]">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div
              className="
                flex size-10 items-center justify-center rounded-xl
                bg-primary text-xs font-bold text-white
              "
            >
              TS
            </div>

            <div>
              <p className="text-sm font-semibold">Total Store</p>

              <p className="text-[10px] uppercase tracking-wider text-muted">
                Backoffice
              </p>
            </div>
          </div>

          {children}
        </div>
      </section>
    </main>
  );
}
