import { AppShell } from "@/components/layout";
import {
  PaymentMethodsSettings,
  SettingsPageHeader,
} from "@/features/settings";
export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SettingsPageHeader
          title="Payment Methods"
          description="Choose the payment options available during checkout."
        />
        <PaymentMethodsSettings />
      </main>
    </AppShell>
  );
}
