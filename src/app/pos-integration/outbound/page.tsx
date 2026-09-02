import { AppShell } from "@/components/layout";
import { PosHeader, PosOutboundList } from "@/features/pos-integration";
export default function Page() { return <AppShell><main className="mx-auto max-w-[1300px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><PosHeader title="Outbound Batches" description="Check readiness, create batches and mark them as sent." /><PosOutboundList /></main></AppShell>; }
