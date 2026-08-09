import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const MachineModule = dynamic(() => import("@/modules/machine"), {
  loading: () => <ModuleSkeleton />,
});

export default function Page() {
  return <MachineModule />;
}
