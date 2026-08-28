import { AppShell } from "@/components/layout";
import { DeductionForm, PayrollPageHeader } from "@/features/payroll";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Add Deduction"
          description="Create a recurring or one-time employee deduction."
          back="/payroll/deductions"
        />
        <DeductionForm />
      </main>
    </AppShell>
  );
}
