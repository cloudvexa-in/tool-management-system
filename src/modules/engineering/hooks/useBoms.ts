import { useBomsQuery } from "../api/engineeringQueries";

export function useBoms() {
  const { data: boms = [], isLoading } = useBomsQuery();
  return { boms, isLoading };
}
