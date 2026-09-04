import { AppShell } from "@/components/layout";
import { LocationDetailsView } from "@/features/locations";

interface LocationDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LocationDetailsPage({
  params,
}: LocationDetailsPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <LocationDetailsView id={id} />
      </main>
    </AppShell>
  );
}
