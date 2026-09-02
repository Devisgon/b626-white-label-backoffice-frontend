import { AppShell } from "@/components/layout";
import { SendToPosForm, SendToPosHeader } from "@/features/send-to-pos";

export default function SendToPosNowPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SendToPosHeader
          title="Send Now"
          description="Create a batch from eligible mappings and immediately mark it as sent."
        />

        <div className="mt-8">
          <SendToPosForm />
        </div>
      </main>
    </AppShell>
  );
}
