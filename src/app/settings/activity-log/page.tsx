import { AppShell } from "@/components/layout";
import { ActivityLogList, SettingsPageHeader } from "@/features/settings";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1300px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SettingsPageHeader
          title="Activity Log"
          description="Review activity across authentication, banking and catalogue."
        />
        <ActivityLogList />
      </main>
    </AppShell>
  );
}
