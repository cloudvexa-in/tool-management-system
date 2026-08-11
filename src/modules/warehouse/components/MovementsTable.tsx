import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import type { StockItem, StockMovement } from "../types";

export default function MovementsTable({
  movements,
  stock,
}: {
  movements: StockMovement[];
  stock: StockItem[];
}) {
  const sku = (id: string) => stock.find((s) => s.id === id)?.sku ?? id;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">SKU</th>
            <th className="text-left px-4 py-2.5">Type</th>
            <th className="text-left px-4 py-2.5">Qty</th>
            <th className="text-left px-4 py-2.5">Reference</th>
            <th className="text-left px-4 py-2.5">When</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {movements.map((mv) => (
            <tr key={mv.id}>
              <td className="px-4 py-3 font-medium text-slate-900">
                {sku(mv.stockItemId)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                    mv.type === "inbound"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {mv.type === "inbound" ? (
                    <ArrowDownCircle className="h-3 w-3" />
                  ) : (
                    <ArrowUpCircle className="h-3 w-3" />
                  )}
                  {mv.type}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500">{mv.quantity}</td>
              <td className="px-4 py-3 text-slate-600">{mv.reference}</td>
              <td className="px-4 py-3 text-slate-400">{mv.at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
