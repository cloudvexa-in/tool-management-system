"use client";

import { useState } from "react";
import { useStock, useMovements } from "../hooks/useWarehouse";
import StockTable from "../components/StockTable";
import StockDetailDrawer from "../components/StockDetailDrawer";

export default function StockView() {
  const { stock, isLoading } = useStock();
  const { movements } = useMovements();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = stock.find((s) => s.id === selectedId) ?? null;

  return (
    <div className="h-full flex flex-col">
      {isLoading ? (
        <p className="text-sm text-slate-500">Loading stock…</p>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <StockTable stock={stock} onSelect={setSelectedId} />
        </div>
      )}
      <StockDetailDrawer
        item={selected}
        movements={movements}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
