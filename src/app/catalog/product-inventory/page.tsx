import { ClipboardList } from "lucide-react";

import { CatalogueSectionPlaceholder } from "@/features/catalogue/components";

export default function ProductInventoryPage() {
  return (
    <CatalogueSectionPlaceholder
      title="Product Inventory"
      description="Manage product stock assigned to store locations."
      icon={ClipboardList}
    />
  );
}