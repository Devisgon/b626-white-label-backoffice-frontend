import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PayrollPageHeader, PayrollProfileForm } from "@/features/payroll";
import { findPayrollProfile } from "@/features/payroll/demo-data";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = findPayrollProfile(id);
  if (!item) notFound();
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Edit Payroll Profile"
          description={`Update payroll settings for ${item.employeeName}.`}
          back={`/payroll/profiles/${item.id}`}
        />
        <PayrollProfileForm initialValues={item} />
      </main>
    </AppShell>
  );
}
