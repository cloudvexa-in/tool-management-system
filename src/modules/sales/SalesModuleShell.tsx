"use client";

import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useSalesOrders } from "./hooks/useSalesOrders";
import { useSalesModuleStore } from "./store/useSalesModuleStore";
import SalesOrderDrawer from "./components/SalesOrderDrawer";

export default function SalesModuleShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { orders: fetchedOrders, isLoading } = useSalesOrders();
  const {
    orders,
    hydrated,
    hydrate,
    selectedOrderId,
    selectOrder,
    transition,
    recordAction,
  } = useSalesModuleStore();

  useEffect(() => {
    if (!hydrated && fetchedOrders.length > 0) hydrate(fetchedOrders);
  }, [hydrated, fetchedOrders, hydrate]);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) ?? null;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center gap-3 flex-none">
        <ShoppingCart className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-slate-900">Sales & CRM</h1>
      </div>

      {isLoading && !hydrated ? (
        <p className="text-sm text-slate-500">Loading orders…</p>
      ) : (
        <div className="flex-1 min-h-0">{children}</div>
      )}

      <SalesOrderDrawer
        order={selectedOrder}
        onClose={() => selectOrder(null)}
        onTransition={transition}
        onAction={recordAction}
      />
    </div>
  );
}
