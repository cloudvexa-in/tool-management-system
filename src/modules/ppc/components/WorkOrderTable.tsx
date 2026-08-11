import { GitMerge } from "lucide-react";
import type { WorkOrder } from "../types";
import WorkOrderStatusBadge from "./WorkOrderStatusBadge";

export default function WorkOrderTable({
  workOrders,
  onSelect,
}: {
  workOrders: WorkOrder[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">Work Order</th>
            <th className="text-left px-4 py-2.5">Part Number</th>
            <th className="text-left px-4 py-2.5">Linked BOM</th>
            <th className="text-left px-4 py-2.5">Qty</th>
            <th className="text-left px-4 py-2.5">Status</th>
            <th className="text-left px-4 py-2.5">Due Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {workOrders.map((wo) => (
            <tr
              key={wo.id}
              onClick={() => onSelect(wo.id)}
              className="cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-slate-900">
                {wo.id.toUpperCase()}
              </td>
              <td className="px-4 py-3 text-slate-600">{wo.partNumber}</td>
              <td className="px-4 py-3 text-slate-500">
                <span className="inline-flex items-center gap-1 text-purple-600">
                  <GitMerge className="h-3 w-3" />
                  {wo.linkedBomId}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500">{wo.quantity}</td>
              <td className="px-4 py-3">
                <WorkOrderStatusBadge status={wo.status} />
              </td>
              <td className="px-4 py-3 text-slate-400">{wo.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
