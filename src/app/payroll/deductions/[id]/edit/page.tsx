import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import { DeductionForm, PayrollPageHeader } from "@/features/payroll";
import { findDeduction } from "@/features/payroll/demo-data";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = findDeduction(id);
  if (!item) notFound();
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PayrollPageHeader
          title="Edit Deduction"
          description={`Update ${item.employeeName}'s deduction.`}
          back={`/payroll/deductions/${item.id}`}
        />
        <DeductionForm initialValues={item} />
      </main>
    </AppShell>
  );
}
