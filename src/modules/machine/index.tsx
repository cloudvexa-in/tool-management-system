import { Cpu } from "lucide-react";
import { ModulePlaceholder } from "@/modules/shared";

export default function MachineModule() {
  return (
    <ModulePlaceholder
      icon={Cpu}
      title="Machines (IoT)"
      description="CNC/lathe selection and live telemetry will live here."
    />
  );
}
