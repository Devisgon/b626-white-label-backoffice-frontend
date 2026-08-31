import { AppShell } from "@/components/layout";
import { ReceiptSettingsForm, SettingsPageHeader } from "@/features/settings";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SettingsPageHeader
          title="Receipt & Invoice"
          description="Configure receipt footer, logo and invoice prefix."
        />
        <ReceiptSettingsForm />
      </main>
    </AppShell>
  );
}
