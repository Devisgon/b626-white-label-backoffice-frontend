import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import {
  demoTaxRules,
  SettingsPageHeader,
  TaxRuleForm,
} from "@/features/settings";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rule = demoTaxRules.find((item) => item.id === id);
  if (!rule) notFound();
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SettingsPageHeader
          title="Edit Tax Rule"
          description={`Update ${rule.name}.`}
          back="/settings/tax-rules"
        />
        <TaxRuleForm initialValues={rule} />
      </main>
    </AppShell>
  );
}
