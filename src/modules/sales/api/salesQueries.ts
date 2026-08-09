import { useQuery } from "@tanstack/react-query";
import type { SalesOrder } from "../types";

async function fetchSalesOrders(): Promise<SalesOrder[]> {
  // TODO: wire up to the real ERP/Sales endpoint once available.
  return [];
}

export function useSalesOrdersQuery() {
  return useQuery({
    queryKey: ["sales", "orders"],
    queryFn: fetchSalesOrders,
  });
}
