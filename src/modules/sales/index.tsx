"use client";

import { ShoppingCart } from "lucide-react";
import SalesOverviewCard from "./components/SalesOverviewCard";
import { useSalesOrders } from "./hooks/useSalesOrders";

export default function SalesModule() {
  const { orders, isLoading } = useSalesOrders();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-3">
        <ShoppingCart className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-slate-900">Sales & CRM</h1>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading orders…</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-slate-500">
          No sales orders yet. Once your CRM/ERP integration is connected,
          orders will appear here.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <SalesOverviewCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
