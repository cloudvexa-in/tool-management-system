import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const PresetterModule = dynamic(() => import("@/modules/presetter"), {
  loading: () => <ModuleSkeleton />,
});

export default function Page() {
  return <PresetterModule />;
}
