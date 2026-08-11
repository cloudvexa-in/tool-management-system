import dynamic from "next/dynamic";

const StockView = dynamic(() => import("@/modules/warehouse/views/StockView"));

export default function Page() {
  return <StockView />;
}
