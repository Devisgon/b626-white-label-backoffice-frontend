import { AppShell } from "@/components/layout";
import { PayrollPageHeader, PayrollReports } from "@/features/payroll";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Payroll Reports"
          description="Review payroll cost summaries and location totals."
        />
        <PayrollReports />
      </main>
    </AppShell>
  );
}
