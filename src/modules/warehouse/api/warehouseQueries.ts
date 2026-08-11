import { useQuery } from "@tanstack/react-query";
import type { StockItem, StockMovement } from "../types";

const MOCK_STOCK: StockItem[] = [
  {
    id: "stk-1",
    sku: "FG-48213-A",
    description: "Gearbox housing (finished)",
    quantity: 480,
    reorderPoint: 100,
    location: "Bay 3",
    trackingMethod: "barcode",
  },
  {
    id: "stk-2",
    sku: "FG-11390-C",
    description: "Shaft coupling (finished)",
    quantity: 60,
    reorderPoint: 75,
    location: "Bay 1",
    trackingMethod: "rfid",
  },
  {
    id: "stk-3",
    sku: "RM-STEEL-6MM",
    description: "6mm steel sheet, raw stock",
    quantity: 1200,
    reorderPoint: 300,
    location: "Yard A",
    trackingMethod: "barcode",
  },
];

const MOCK_MOVEMENTS: StockMovement[] = [
  {
    id: "mv-1",
    stockItemId: "stk-1",
    type: "inbound",
    quantity: 500,
    reference: "wo-501",
    at: "2026-08-10 11:20",
  },
  {
    id: "mv-2",
    stockItemId: "stk-1",
    type: "outbound",
    quantity: 20,
    reference: "so-1006",
    at: "2026-08-10 15:45",
  },
  {
    id: "mv-3",
    stockItemId: "stk-2",
    type: "outbound",
    quantity: 90,
    reference: "so-1004",
    at: "2026-08-09 10:05",
  },
];

async function fetchStock(): Promise<StockItem[]> {
  // TODO: wire up to the real Warehouse module backend once available.
  return MOCK_STOCK;
}

async function fetchMovements(): Promise<StockMovement[]> {
  return MOCK_MOVEMENTS;
}

export function useStockQuery() {
  return useQuery({ queryKey: ["warehouse", "stock"], queryFn: fetchStock });
}

export function useMovementsQuery() {
  return useQuery({
    queryKey: ["warehouse", "movements"],
    queryFn: fetchMovements,
  });
}
