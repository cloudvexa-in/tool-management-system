import { CodeXml } from "lucide-react";
import { ModulePlaceholder } from "@/modules/shared";

export default function EngineeringModule() {
  return (
    <ModulePlaceholder
      icon={CodeXml}
      title="Engineering & PLM"
      description="CAD/PDM integrations and BOM generation will live here."
    />
  );
}
