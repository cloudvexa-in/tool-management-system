import dynamic from "next/dynamic";

const ShiftLogView = dynamic(
  () => import("@/modules/production/views/ShiftLogView"),
);

export default function Page() {
  return <ShiftLogView />;
}
