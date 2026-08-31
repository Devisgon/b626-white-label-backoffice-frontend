import { AppShell } from "@/components/layout";
import { SettingsPageHeader, TaxRulesList } from "@/features/settings";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SettingsPageHeader
          title="Tax Configuration"
          description="Manage global and location-specific tax rates."
        />
        <TaxRulesList />
      </main>
    </AppShell>
  );
}
