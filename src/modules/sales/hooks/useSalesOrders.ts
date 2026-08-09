import { useSalesOrdersQuery } from "../api/salesQueries";

export function useSalesOrders() {
  const { data: orders = [], isLoading } = useSalesOrdersQuery();
  return { orders, isLoading };
}
