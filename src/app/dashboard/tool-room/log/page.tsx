import dynamic from "next/dynamic";

const LogView = dynamic(() => import("@/modules/tool-room/views/LogView"));

export default function Page() {
  return <LogView />;
}
