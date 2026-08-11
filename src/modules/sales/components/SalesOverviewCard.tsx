import { Webhook, User } from "lucide-react";
import { formatOrderId } from "../utils/formatOrderId";
import type { SalesOrder } from "../types";

export default function SalesOverviewCard({
  order,
  onClick,
}: {
  order: SalesOrder;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:border-indigo-300 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-400">
          {formatOrderId(order.id)}
        </p>
        {order.source === "webhook" ? (
          <Webhook className="h-3.5 w-3.5 text-indigo-400" />
        ) : (
          <User className="h-3.5 w-3.5 text-slate-300" />
        )}
      </div>
      <p className="mt-1 font-semibold text-sm text-slate-900">
        {order.customerName}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Qty {order.quantity} · ${order.totalValue.toLocaleString()}
      </p>
    </div>
  );
}
