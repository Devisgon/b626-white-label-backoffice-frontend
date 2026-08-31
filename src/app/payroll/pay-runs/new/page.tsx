import { AppShell } from "@/components/layout";
import { PayRunForm, PayrollPageHeader } from "@/features/payroll";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="New Pay Run"
          description="Create a draft payroll period for one location."
          back="/payroll/pay-runs"
        />
        <PayRunForm />
      </main>
    </AppShell>
  );
}
