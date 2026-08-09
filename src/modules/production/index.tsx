import { Factory } from "lucide-react";
import { ModulePlaceholder } from "@/modules/shared";

export default function ProductionModule() {
  return (
    <ModulePlaceholder
      icon={Factory}
      title="Production"
      description="Shift management and production tracking will live here."
    />
  );
}
