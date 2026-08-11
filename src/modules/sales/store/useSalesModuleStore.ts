import { create } from "zustand";
import type { SalesOrder, SalesOrderAction, SalesStageId } from "../types";

interface SalesModuleState {
  orders: SalesOrder[];
  hydrated: boolean;
  selectedOrderId: string | null;
  hydrate: (orders: SalesOrder[]) => void;
  selectOrder: (id: string | null) => void;
  transition: (orderId: string, nextStage: SalesStageId) => void;
  recordAction: (orderId: string, action: SalesOrderAction) => void;
}

export const useSalesModuleStore = create<SalesModuleState>((set) => ({
  orders: [],
  hydrated: false,
  selectedOrderId: null,
  hydrate: (orders) => set({ orders, hydrated: true }),
  selectOrder: (id) => set({ selectedOrderId: id }),
  transition: (orderId, nextStage) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, stage: nextStage } : o,
      ),
    })),
  recordAction: (orderId, action) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, lastAction: action } : o,
      ),
    })),
}));
