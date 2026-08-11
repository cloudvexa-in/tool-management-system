import { Webhook, User } from "lucide-react";
import { SALES_STAGES } from "../types";
import type { SalesOrder } from "../types";
import { formatOrderId } from "../utils/formatOrderId";

export default function SalesOrdersTable({
  orders,
  onSelect,
}: {
  orders: SalesOrder[];
  onSelect: (orderId: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">Order</th>
            <th className="text-left px-4 py-2.5">Customer</th>
            <th className="text-left px-4 py-2.5">Stage</th>
            <th className="text-left px-4 py-2.5">Qty</th>
            <th className="text-left px-4 py-2.5">Value</th>
            <th className="text-left px-4 py-2.5">Source</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => {
            const stage = SALES_STAGES.find((s) => s.id === order.stage)!;
            return (
              <tr
                key={order.id}
                onClick={() => onSelect(order.id)}
                className="cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {formatOrderId(order.id)}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {order.customerName}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${stage.color.header} ${stage.color.text}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${stage.color.dot}`}
                    />
                    {stage.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{order.quantity}</td>
                <td className="px-4 py-3 text-slate-500">
                  ${order.totalValue.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-slate-400">
                  {order.source === "webhook" ? (
                    <span className="inline-flex items-center gap-1">
                      <Webhook className="h-3 w-3" /> Webhook
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <User className="h-3 w-3" /> Manual
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
