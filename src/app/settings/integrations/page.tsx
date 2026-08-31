import { AppShell } from "@/components/layout";
import { IntegrationsSettings, SettingsPageHeader } from "@/features/settings";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SettingsPageHeader
          title="Integrations"
          description="Connect and manage third-party providers securely."
        />
        <IntegrationsSettings />
      </main>
    </AppShell>
  );
}
