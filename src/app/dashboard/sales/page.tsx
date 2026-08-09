import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const SalesModule = dynamic(() => import("@/modules/sales"), {
  loading: () => <ModuleSkeleton />,
});

export default function Page() {
  return <SalesModule />;
}
