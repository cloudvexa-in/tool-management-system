import dynamic from "next/dynamic";
import { ModuleSkeleton } from "@/modules/shared";

const ToolRoomModuleShell = dynamic(
  () => import("@/modules/tool-room/ToolRoomModuleShell"),
  { loading: () => <ModuleSkeleton /> },
);

export default function ToolRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToolRoomModuleShell>{children}</ToolRoomModuleShell>;
}
