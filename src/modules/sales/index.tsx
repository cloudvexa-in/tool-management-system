"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import SalesPipelineBoard from "./components/SalesPipelineBoard";
import { useSalesOrders } from "./hooks/useSalesOrders";
import type { SalesOrder, SalesStageId } from "./types";

export default function SalesModule() {
  const { orders: fetchedOrders, isLoading } = useSalesOrders();
  const [orders, setOrders] = useState<SalesOrder[]>([]);

  useEffect(() => {
    if (fetchedOrders.length > 0) setOrders(fetchedOrders);
  }, [fetchedOrders]);

  const handleTransition = (orderId: string, nextStage: SalesStageId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, stage: nextStage } : o)),
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center gap-3 flex-none">
        <ShoppingCart className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-slate-900">Sales & CRM</h1>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading orders…</p>
      ) : (
        <div className="flex-1 min-h-0">
          <SalesPipelineBoard orders={orders} onTransition={handleTransition} />
        </div>
      )}
    </div>
  );
}
