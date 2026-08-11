import { useQuery } from "@tanstack/react-query";
import type { SalesOrder } from "../types";

const MOCK_ORDERS: SalesOrder[] = [
  {
    id: "so-1001",
    customerName: "Acme Precision Parts",
    quantity: 500,
    totalValue: 42000,
    stage: "pre-sale",
    source: "manual",
  },
  {
    id: "so-1002",
    customerName: "Bharat Auto Components",
    quantity: 1200,
    totalValue: 98000,
    stage: "quoted",
    source: "manual",
  },
  {
    id: "so-1003",
    customerName: "Meridian Aerospace",
    quantity: 80,
    totalValue: 156000,
    stage: "quoted",
    source: "webhook",
  },
  {
    id: "so-1004",
    customerName: "Northgate Industrial",
    quantity: 2000,
    totalValue: 210000,
    stage: "order-confirmed",
    source: "manual",
  },
  {
    id: "so-1005",
    customerName: "Vantage Tooling Co.",
    quantity: 300,
    totalValue: 31500,
    stage: "delivered",
    source: "webhook",
  },
  {
    id: "so-1006",
    customerName: "Orion Manufacturing",
    quantity: 150,
    totalValue: 18750,
    stage: "invoiced",
    source: "manual",
  },
];

async function fetchSalesOrders(): Promise<SalesOrder[]> {
  // TODO: wire up to the real Sales module backend once available.
  return MOCK_ORDERS;
}

export function useSalesOrdersQuery() {
  return useQuery({
    queryKey: ["sales", "orders"],
    queryFn: fetchSalesOrders,
  });
}
