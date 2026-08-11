"use client";

import { useTools, useToolLog } from "../hooks/useTools";
import ToolLogTable from "../components/ToolLogTable";

export default function LogView() {
  const { tools } = useTools();
  const { log, isLoading } = useToolLog();

  if (isLoading) return <p className="text-sm text-slate-500">Loading log…</p>;

  return (
    <div className="h-full overflow-y-auto">
      <ToolLogTable log={log} tools={tools} />
    </div>
  );
}
