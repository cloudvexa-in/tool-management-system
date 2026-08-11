import { useMovementsQuery, useStockQuery } from "../api/warehouseQueries";

export function useStock() {
  const { data: stock = [], isLoading } = useStockQuery();
  return { stock, isLoading };
}

export function useMovements() {
  const { data: movements = [], isLoading } = useMovementsQuery();
  return { movements, isLoading };
}
