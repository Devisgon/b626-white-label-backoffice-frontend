import { AppShell } from "@/components/layout";
import { PayrollPageHeader, PayslipsList } from "@/features/payroll";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1480px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Payslips"
          description="Review employee gross pay, deductions and net pay."
        />
        <PayslipsList />
      </main>
    </AppShell>
  );
}
