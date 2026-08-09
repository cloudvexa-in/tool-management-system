import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const WarehouseModule = dynamic(() => import("@/modules/warehouse"), {
  loading: () => <ModuleSkeleton />,
});

export default function Page() {
  return <WarehouseModule />;
}
