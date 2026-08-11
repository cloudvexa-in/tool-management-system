import { AlertTriangle } from "lucide-react";
import type { Tool } from "../types";

export default function LowStockBanner({ tools }: { tools: Tool[] }) {
  const lowStock = tools.filter((t) => t.stockLevel < t.minThreshold);
  if (lowStock.length === 0) return null;

  return (
    <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 flex-none">
      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
      <p className="text-sm text-red-700">
        <span className="font-semibold">{lowStock.length} tool(s)</span> below
        minimum stock threshold — {lowStock.map((t) => t.name).join(", ")}
      </p>
    </div>
  );
}
