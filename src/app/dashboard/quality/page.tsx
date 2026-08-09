import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const QualityModule = dynamic(() => import("@/modules/quality"), {
  loading: () => <ModuleSkeleton />,
});

export default function Page() {
  return <QualityModule />;
}
