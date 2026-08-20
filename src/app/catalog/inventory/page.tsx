import { Layers3 } from "lucide-react";

import { CatalogueSectionPlaceholder } from "@/features/catalogue/components";

export default function InventoryPage() {
  return (
    <CatalogueSectionPlaceholder
      title="Inventory"
      description="Manage inventory records, quantities and stock status."
      icon={Layers3}
    />
  );
}