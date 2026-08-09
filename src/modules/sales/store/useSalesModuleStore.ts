import { create } from "zustand";

interface SalesModuleState {
  selectedOrderId: string | null;
  selectOrder: (id: string | null) => void;
}

export const useSalesModuleStore = create<SalesModuleState>((set) => ({
  selectedOrderId: null,
  selectOrder: (id) => set({ selectedOrderId: id }),
}));
