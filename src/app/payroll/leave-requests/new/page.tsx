import { AppShell } from "@/components/layout";
import { LeaveRequestForm, PayrollPageHeader } from "@/features/payroll";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Request Leave"
          description="Submit a new leave request for manager review."
          back="/payroll/leave-requests"
        />
        <LeaveRequestForm />
      </main>
    </AppShell>
  );
}
