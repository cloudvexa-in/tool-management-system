import { create } from "zustand";
import type { ProductionJob, ProductionJobStatus } from "../types";

interface ProductionModuleState {
  jobs: ProductionJob[];
  hydrated: boolean;
  selectedJobId: string | null;
  hydrate: (jobs: ProductionJob[]) => void;
  selectJob: (id: string | null) => void;
  setStatus: (id: string, status: ProductionJobStatus) => void;
}

export const useProductionModuleStore = create<ProductionModuleState>(
  (set) => ({
    jobs: [],
    hydrated: false,
    selectedJobId: null,
    hydrate: (jobs) => set({ jobs, hydrated: true }),
    selectJob: (id) => set({ selectedJobId: id }),
    setStatus: (id, status) =>
      set((state) => ({
        jobs: state.jobs.map((j) => (j.id === id ? { ...j, status } : j)),
      })),
  }),
);
