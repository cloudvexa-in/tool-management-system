"use client";

import ProductionJobTable from "../components/ProductionJobTable";
import { useProductionModuleStore } from "../store/useProductionModuleStore";

export default function JobsView() {
  const { jobs, selectJob } = useProductionModuleStore();

  return (
    <div className="h-full overflow-y-auto">
      <ProductionJobTable jobs={jobs} onSelect={selectJob} />
    </div>
  );
}
