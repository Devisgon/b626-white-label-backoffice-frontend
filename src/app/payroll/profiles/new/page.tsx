import { AppShell } from "@/components/layout";
import { PayrollPageHeader, PayrollProfileForm } from "@/features/payroll";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Add Payroll Profile"
          description="Configure an employee's salary or hourly pay settings."
          back="/payroll/profiles"
        />
        <PayrollProfileForm />
      </main>
    </AppShell>
  );
}
