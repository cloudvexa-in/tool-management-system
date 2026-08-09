import { Ruler } from "lucide-react";
import { ModulePlaceholder } from "@/modules/shared";

export default function PresetterModule() {
  return (
    <ModulePlaceholder
      icon={Ruler}
      title="Tool Presetter"
      description="Zoller/Speroni integration and offset data will live here."
    />
  );
}
