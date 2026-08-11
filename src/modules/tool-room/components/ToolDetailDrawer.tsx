import { ArrowDownCircle, ArrowUpCircle, MapPin } from "lucide-react";
import { DetailDrawer } from "@/modules/shared";
import type { Tool, ToolLogEntry } from "../types";

export default function ToolDetailDrawer({
  tool,
  log,
  onClose,
}: {
  tool: Tool | null;
  log: ToolLogEntry[];
  onClose: () => void;
}) {
  if (!tool) return null;

  const isLow = tool.stockLevel < tool.minThreshold;
  const toolLog = log.filter((entry) => entry.toolId === tool.id);

  return (
    <DetailDrawer
      open={Boolean(tool)}
      onClose={onClose}
      title={tool.name}
      subtitle={tool.category}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">
            Stock Level
          </p>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              isLow
                ? "bg-red-50 text-red-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {tool.stockLevel} / min {tool.minThreshold}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Location</p>
          <p className="text-sm text-slate-800 inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            {tool.location}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold text-slate-500 mb-2">
          Issue / Return Log
        </p>
        <div className="space-y-2">
          {toolLog.length === 0 && (
            <p className="text-xs text-slate-400">No activity recorded.</p>
          )}
          {toolLog.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2.5"
            >
              {entry.type === "issue" ? (
                <ArrowUpCircle className="h-4 w-4 text-amber-500 flex-none" />
              ) : (
                <ArrowDownCircle className="h-4 w-4 text-emerald-500 flex-none" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-700">
                  <span className="font-medium capitalize">{entry.type}</span> ·
                  qty {entry.quantity} · {entry.by}
                </p>
                <p className="text-[10px] text-slate-400">{entry.at}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DetailDrawer>
  );
}
