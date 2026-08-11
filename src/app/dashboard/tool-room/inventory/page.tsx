import dynamic from "next/dynamic";

const InventoryView = dynamic(
  () => import("@/modules/tool-room/views/InventoryView"),
);

export default function Page() {
  return <InventoryView />;
}
