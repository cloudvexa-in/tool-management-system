"use client";

import { useEffect, useState } from "react";
import { CodeXml } from "lucide-react";
import { useBoms } from "./hooks/useBoms";
import BomTable from "./components/BomTable";
import BomDetailPanel from "./components/BomDetailPanel";
import type { Bom, BomStatus } from "./types";

export default function EngineeringModule() {
  const { boms: fetchedBoms, isLoading } = useBoms();
  const [boms, setBoms] = useState<Bom[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (fetchedBoms.length > 0) setBoms(fetchedBoms);
  }, [fetchedBoms]);

  const handleStatusChange = (bomId: string, status: BomStatus) => {
    setBoms((prev) => prev.map((b) => (b.id === bomId ? { ...b, status } : b)));
  };

  const selectedBom = boms.find((b) => b.id === selectedId) ?? null;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center gap-3 flex-none">
        <CodeXml className="h-6 w-6 text-purple-600" />
        <h1 className="text-2xl font-semibold text-slate-900">
          Engineering & PLM
        </h1>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading BOMs…</p>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <BomTable
            boms={boms}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      )}

      <BomDetailPanel
        bom={selectedBom}
        onClose={() => setSelectedId(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
