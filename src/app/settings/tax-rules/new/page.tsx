import { AppShell } from "@/components/layout";
import { SettingsPageHeader, TaxRuleForm } from "@/features/settings";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SettingsPageHeader
          title="Add Tax Rule"
          description="Create a tax percentage for all stores or one location."
          back="/settings/tax-rules"
        />
        <TaxRuleForm />
      </main>
    </AppShell>
  );
}
