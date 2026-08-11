"use client";

import { useState } from "react";
import { useTools, useToolLog } from "../hooks/useTools";
import LowStockBanner from "../components/LowStockBanner";
import ToolInventoryTable from "../components/ToolInventoryTable";
import ToolDetailDrawer from "../components/ToolDetailDrawer";

export default function InventoryView() {
  const { tools, isLoading } = useTools();
  const { log } = useToolLog();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedTool = tools.find((t) => t.id === selectedId) ?? null;

  return (
    <div className="h-full flex flex-col">
      <LowStockBanner tools={tools} />
      {isLoading ? (
        <p className="text-sm text-slate-500">Loading tools…</p>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ToolInventoryTable tools={tools} onSelect={setSelectedId} />
        </div>
      )}
      <ToolDetailDrawer
        tool={selectedTool}
        log={log}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
