"use client";

import SalesOrdersTable from "../components/SalesOrdersTable";
import { useSalesModuleStore } from "../store/useSalesModuleStore";

export default function OrdersView() {
  const { orders, selectOrder } = useSalesModuleStore();

  return <SalesOrdersTable orders={orders} onSelect={selectOrder} />;
}
