import { AppShell } from "@/components/layout";
import {
  SendToPosHeader,
  SendToPosHistoryList,
} from "@/features/send-to-pos";

export default function SendToPosHistoryPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1300px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SendToPosHeader
          title="Send History"
          description="Review pending, sent and failed batches created for the POS."
        />

        <div className="mt-8">
          <SendToPosHistoryList />
        </div>
      </main>
    </AppShell>
  );
}
