import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout";
import { CrudDetails, CrudHeader } from "@/components/shared";
import { lotterySettlementConfig, findDemoLotterySettlement } from "@/features/lottery/lottery-settlement-demo-data";
import { stripCrudSchema } from "@/types/crud-resource";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const record = findDemoLotterySettlement(Number(id)); if (!record) notFound(); const config = stripCrudSchema(lotterySettlementConfig); return <AppShell><main className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10"><CrudHeader config={config} mode="details" id={Number(id)} /><CrudDetails config={config} record={record} /></main></AppShell>; }

