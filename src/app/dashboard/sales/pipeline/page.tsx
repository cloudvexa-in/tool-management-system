import dynamic from "next/dynamic";

const PipelineView = dynamic(
  () => import("@/modules/sales/views/PipelineView"),
);

export default function Page() {
  return <PipelineView />;
}
