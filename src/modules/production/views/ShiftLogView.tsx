"use client";

import { useShiftLog } from "../hooks/useProductionJobs";
import { useProductionModuleStore } from "../store/useProductionModuleStore";
import ShiftLogTable from "../components/ShiftLogTable";

export default function ShiftLogView() {
  const { shiftLog, isLoading } = useShiftLog();
  const { jobs } = useProductionModuleStore();

  if (isLoading)
    return <p className="text-sm text-slate-500">Loading shift log…</p>;

  return (
    <div className="h-full overflow-y-auto">
      <ShiftLogTable shiftLog={shiftLog} jobs={jobs} />
    </div>
  );
}
