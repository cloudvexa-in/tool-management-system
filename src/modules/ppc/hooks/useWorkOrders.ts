import { useWorkOrdersQuery } from "../api/ppcQueries";

export function useWorkOrders() {
  const { data: workOrders = [], isLoading } = useWorkOrdersQuery();
  return { workOrders, isLoading };
}
