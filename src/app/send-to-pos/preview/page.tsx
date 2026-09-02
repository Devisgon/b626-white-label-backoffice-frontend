import { AppShell } from "@/components/layout";
import {
  SendToPosHeader,
  SendToPosPreviewPanel,
} from "@/features/send-to-pos";

export default function SendToPosPreviewPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1300px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SendToPosHeader
          title="Send Preview"
          description="Check which approved records are ready before creating a POS batch."
        />

        <div className="mt-8">
          <SendToPosPreviewPanel />
        </div>
      </main>
    </AppShell>
  );
}
