"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";
import { useToolOffsets } from "./hooks/useToolOffsets";
import ToolOffsetTable from "./components/ToolOffsetTable";
import ToolOffsetDrawer from "./components/ToolOffsetDrawer";

export default function PresetterModule() {
  const { offsets, isLoading } = useToolOffsets();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = offsets.find((o) => o.id === selectedId) ?? null;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center gap-3 flex-none">
        <Ruler className="h-6 w-6 text-teal-600" />
        <h1 className="text-2xl font-semibold text-slate-900">
          Tool Presetter
        </h1>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading offsets…</p>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ToolOffsetTable offsets={offsets} onSelect={setSelectedId} />
        </div>
      )}

      <ToolOffsetDrawer offset={selected} onClose={() => setSelectedId(null)} />
    </div>
  );
}
