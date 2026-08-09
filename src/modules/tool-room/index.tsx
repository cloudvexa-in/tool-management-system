import { Wrench } from "lucide-react";
import { ModulePlaceholder } from "@/modules/shared";

export default function ToolRoomModule() {
  return (
    <ModulePlaceholder
      icon={Wrench}
      title="Tool Room / Tool Crib"
      description="Tool inventory tracking and minimum stock alerts will live here."
    />
  );
}
