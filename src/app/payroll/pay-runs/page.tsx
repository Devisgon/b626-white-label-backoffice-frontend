import { AppShell } from "@/components/layout";
import { PayRunsList, PayrollPageHeader } from "@/features/payroll";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Pay Runs"
          description="Create, process and mark payroll periods as paid."
        />
        <PayRunsList />
      </main>
    </AppShell>
  );
}
