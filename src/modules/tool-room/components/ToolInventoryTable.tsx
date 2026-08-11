import type { Tool } from "../types";

export default function ToolInventoryTable({
  tools,
  onSelect,
}: {
  tools: Tool[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">Tool</th>
            <th className="text-left px-4 py-2.5">Category</th>
            <th className="text-left px-4 py-2.5">Stock</th>
            <th className="text-left px-4 py-2.5">Location</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tools.map((tool) => {
            const isLow = tool.stockLevel < tool.minThreshold;
            return (
              <tr
                key={tool.id}
                onClick={() => onSelect(tool.id)}
                className="cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-slate-900">
                  {tool.name}
                </td>
                <td className="px-4 py-3 text-slate-500">{tool.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      isLow
                        ? "bg-red-50 text-red-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {tool.stockLevel} / min {tool.minThreshold}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400">{tool.location}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
