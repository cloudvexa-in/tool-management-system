import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const ProductionModule = dynamic(() => import("@/modules/production"), {
  loading: () => <ModuleSkeleton />,
});

export default function Page() {
  return <ProductionModule />;
}
