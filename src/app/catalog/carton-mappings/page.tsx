import { Boxes } from "lucide-react";

import { CatalogueSectionPlaceholder } from "@/features/catalogue/components";

export default function CartonMappingsPage() {
  return (
    <CatalogueSectionPlaceholder
      title="Carton Mappings"
      description="Configure carton quantities and product mappings."
      icon={Boxes}
    />
  );
}