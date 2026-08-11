import { GitMerge } from "lucide-react";
import type { Bom } from "../types";
import BomStatusBadge from "./BomStatusBadge";

export default function BomTable({
  boms,
  selectedId,
  onSelect,
}: {
  boms: Bom[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">Part Number</th>
            <th className="text-left px-4 py-2.5">Description</th>
            <th className="text-left px-4 py-2.5">Rev</th>
            <th className="text-left px-4 py-2.5">Status</th>
            <th className="text-left px-4 py-2.5">Linked Order</th>
            <th className="text-left px-4 py-2.5">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {boms.map((bom) => (
            <tr
              key={bom.id}
              onClick={() => onSelect(bom.id)}
              className={`cursor-pointer transition-colors ${
                selectedId === bom.id ? "bg-indigo-50" : "hover:bg-slate-50"
              }`}
            >
              <td className="px-4 py-3 font-medium text-slate-900">
                {bom.partNumber}
              </td>
              <td className="px-4 py-3 text-slate-600">{bom.description}</td>
              <td className="px-4 py-3 text-slate-500">{bom.revision}</td>
              <td className="px-4 py-3">
                <BomStatusBadge status={bom.status} />
              </td>
              <td className="px-4 py-3 text-slate-500">
                {bom.linkedSalesOrderId ? (
                  <span className="inline-flex items-center gap-1 text-indigo-600">
                    <GitMerge className="h-3 w-3" />
                    {bom.linkedSalesOrderId}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-3 text-slate-400">{bom.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
