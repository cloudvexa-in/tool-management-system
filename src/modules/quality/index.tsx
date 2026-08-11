"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useInspections } from "./hooks/useInspections";
import InspectionTable from "./components/InspectionTable";
import InspectionDrawer from "./components/InspectionDrawer";
import type { InspectionRecord } from "./types";

export default function QualityModule() {
  const { inspections: fetched, isLoading } = useInspections();
  const [inspections, setInspections] = useState<InspectionRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (fetched.length > 0) setInspections(fetched);
  }, [fetched]);

  const handleResult = (
    id: string,
    result: "pass" | "fail",
    defectRate: number,
  ) => {
    setInspections((prev) =>
      prev.map((r) => (r.id === id ? { ...r, result, defectRate } : r)),
    );
  };

  const selected = inspections.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center gap-3 flex-none">
        <ShieldCheck className="h-6 w-6 text-emerald-600" />
        <h1 className="text-2xl font-semibold text-slate-900">Quality</h1>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading inspection records…</p>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <InspectionTable inspections={inspections} onSelect={setSelectedId} />
        </div>
      )}

      <InspectionDrawer
        record={selected}
        onClose={() => setSelectedId(null)}
        onResult={handleResult}
      />
    </div>
  );
}
