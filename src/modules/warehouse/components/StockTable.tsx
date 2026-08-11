import type { StockItem } from "../types";

export default function StockTable({
  stock,
  onSelect,
}: {
  stock: StockItem[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">SKU</th>
            <th className="text-left px-4 py-2.5">Description</th>
            <th className="text-left px-4 py-2.5">Quantity</th>
            <th className="text-left px-4 py-2.5">Location</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {stock.map((item) => {
            const isLow = item.quantity < item.reorderPoint;
            return (
              <tr
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {item.sku}
                </td>
                <td className="px-4 py-3 text-slate-600">{item.description}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      isLow
                        ? "bg-red-50 text-red-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {item.quantity} / reorder {item.reorderPoint}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400">{item.location}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
