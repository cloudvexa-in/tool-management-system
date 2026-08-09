import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const PpcModule = dynamic(() => import("@/modules/ppc"), {
  loading: () => <ModuleSkeleton />,
});

export default function Page() {
  return <PpcModule />;
}
