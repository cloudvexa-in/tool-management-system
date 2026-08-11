"use client";

import { useEffect } from "react";
import { Factory } from "lucide-react";
import { useProductionJobs } from "./hooks/useProductionJobs";
import { useProductionModuleStore } from "./store/useProductionModuleStore";
import ProductionJobDrawer from "./components/ProductionJobDrawer";

export default function ProductionModuleShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { jobs: fetchedJobs, isLoading } = useProductionJobs();
  const { jobs, hydrated, hydrate, selectedJobId, selectJob, setStatus } =
    useProductionModuleStore();

  useEffect(() => {
    if (!hydrated && fetchedJobs.length > 0) hydrate(fetchedJobs);
  }, [hydrated, fetchedJobs, hydrate]);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) ?? null;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center gap-3 flex-none">
        <Factory className="h-6 w-6 text-amber-600" />
        <h1 className="text-2xl font-semibold text-slate-900">Production</h1>
      </div>

      {isLoading && !hydrated ? (
        <p className="text-sm text-slate-500">Loading shift jobs…</p>
      ) : (
        <div className="flex-1 min-h-0">{children}</div>
      )}

      <ProductionJobDrawer
        job={selectedJob}
        onClose={() => selectJob(null)}
        onStatusChange={setStatus}
      />
    </div>
  );
}
