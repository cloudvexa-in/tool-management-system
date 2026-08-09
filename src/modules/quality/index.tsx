import { ShieldCheck } from "lucide-react";
import { ModulePlaceholder } from "@/modules/shared";

export default function QualityModule() {
  return (
    <ModulePlaceholder
      icon={ShieldCheck}
      title="Quality"
      description="Inspection frequencies and quality records will live here."
    />
  );
}
