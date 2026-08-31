import { AppShell } from "@/components/layout";
import { NotificationSettings, SettingsPageHeader } from "@/features/settings";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SettingsPageHeader
          title="Notifications"
          description="Manage your personal event and channel preferences."
        />
        <NotificationSettings />
      </main>
    </AppShell>
  );
}
