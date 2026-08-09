import { formatOrderId } from "../utils/formatOrderId";
import type { SalesOrder } from "../types";

export default function SalesOverviewCard({ order }: { order: SalesOrder }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-400">
        {formatOrderId(order.id)}
      </p>
      <p className="mt-1 font-semibold text-slate-900">{order.customerName}</p>
      <p className="mt-1 text-sm text-slate-500">
        Qty {order.quantity} · ${order.totalValue.toLocaleString()}
      </p>
    </div>
  );
}
