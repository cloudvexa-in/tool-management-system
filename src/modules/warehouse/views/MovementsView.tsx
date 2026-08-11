"use client";

import { useStock, useMovements } from "../hooks/useWarehouse";
import MovementsTable from "../components/MovementsTable";

export default function MovementsView() {
  const { stock } = useStock();
  const { movements, isLoading } = useMovements();

  if (isLoading)
    return <p className="text-sm text-slate-500">Loading movements…</p>;

  return (
    <div className="h-full overflow-y-auto">
      <MovementsTable movements={movements} stock={stock} />
    </div>
  );
}
