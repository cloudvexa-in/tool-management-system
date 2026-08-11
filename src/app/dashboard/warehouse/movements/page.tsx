import dynamic from "next/dynamic";

const MovementsView = dynamic(
  () => import("@/modules/warehouse/views/MovementsView"),
);

export default function Page() {
  return <MovementsView />;
}
