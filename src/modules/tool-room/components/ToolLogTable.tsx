import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import type { Tool, ToolLogEntry } from "../types";

export default function ToolLogTable({
  log,
  tools,
}: {
  log: ToolLogEntry[];
  tools: Tool[];
}) {
  const toolName = (id: string) => tools.find((t) => t.id === id)?.name ?? id;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">Tool</th>
            <th className="text-left px-4 py-2.5">Type</th>
            <th className="text-left px-4 py-2.5">Qty</th>
            <th className="text-left px-4 py-2.5">By</th>
            <th className="text-left px-4 py-2.5">When</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {log.map((entry) => (
            <tr key={entry.id}>
              <td className="px-4 py-3 font-medium text-slate-900">
                {toolName(entry.toolId)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                    entry.type === "issue"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {entry.type === "issue" ? (
                    <ArrowUpCircle className="h-3 w-3" />
                  ) : (
                    <ArrowDownCircle className="h-3 w-3" />
                  )}
                  {entry.type}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500">{entry.quantity}</td>
              <td className="px-4 py-3 text-slate-600">{entry.by}</td>
              <td className="px-4 py-3 text-slate-400">{entry.at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
