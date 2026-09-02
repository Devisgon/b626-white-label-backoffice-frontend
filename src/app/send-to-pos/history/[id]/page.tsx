import { notFound } from "next/navigation";

import { AppShell } from "@/components/layout";
import {
  SendToPosBatchDetails,
  SendToPosHeader,
} from "@/features/send-to-pos";
import { demoSendToPosHistory } from "@/features/send-to-pos/demo-data";

interface SendToPosBatchPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SendToPosBatchPage({
  params,
}: SendToPosBatchPageProps) {
  const { id } = await params;
  const batch = demoSendToPosHistory.find((item) => item.id === id);

  if (!batch) {
    notFound();
  }

  return (
    <AppShell>
      <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <SendToPosHeader
          title="Batch Details"
          description={`Review batch ${batch.id.slice(0, 8)} and its mapped records.`}
          back="/send-to-pos/history"
        />

        <div className="mt-8">
          <SendToPosBatchDetails batch={batch} />
        </div>
      </main>
    </AppShell>
  );
}
