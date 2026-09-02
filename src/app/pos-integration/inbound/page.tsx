import { AppShell } from "@/components/layout";
import { PosHeader, PosInboundList } from "@/features/pos-integration";
export default function Page() { return <AppShell><main className="mx-auto max-w-[1300px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><PosHeader title="Inbound Batches" description="Approve or reject incoming POS data after review." /><PosInboundList /></main></AppShell>; }
