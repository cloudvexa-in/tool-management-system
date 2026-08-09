import { Warehouse } from "lucide-react";
import { ModulePlaceholder } from "@/modules/shared";

export default function WarehouseModule() {
  return (
    <ModulePlaceholder
      icon={Warehouse}
      title="Warehouse"
      description="Barcode/RFID tracking and stock movements will live here."
    />
  );
}
