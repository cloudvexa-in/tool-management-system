import { useInspectionsQuery } from "../api/qualityQueries";

export function useInspections() {
  const { data: inspections = [], isLoading } = useInspectionsQuery();
  return { inspections, isLoading };
}
