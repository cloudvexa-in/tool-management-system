import { CalendarClock } from "lucide-react";
import { ModulePlaceholder } from "@/modules/shared";

export default function PpcModule() {
  return (
    <ModulePlaceholder
      icon={CalendarClock}
      title="Production Planning & Control"
      description="Scheduling methods and ERP work order syncs will live here."
    />
  );
}
