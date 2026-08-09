import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const ToolRoomModule = dynamic(() => import("@/modules/tool-room"), {
  loading: () => <ModuleSkeleton />,
});

export default function Page() {
  return <ToolRoomModule />;
}
