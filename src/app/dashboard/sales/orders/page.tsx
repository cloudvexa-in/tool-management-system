import dynamic from "next/dynamic";

const OrdersView = dynamic(() => import("@/modules/sales/views/OrdersView"));

export default function Page() {
  return <OrdersView />;
}
