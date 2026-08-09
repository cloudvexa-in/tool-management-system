import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const EngineeringModule = dynamic(() => import("@/modules/engineering"), {
  loading: () => <ModuleSkeleton />,
});

export default function Page() {
  return <EngineeringModule />;
}
