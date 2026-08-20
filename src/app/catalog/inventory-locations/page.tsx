import { MapPin } from "lucide-react";

import { CatalogueSectionPlaceholder } from "@/features/catalogue/components";

export default function InventoryLocationsPage() {
  return (
    <CatalogueSectionPlaceholder
      title="Inventory Locations"
      description="Manage warehouses, shelves and inventory locations."
      icon={MapPin}
    />
  );
}