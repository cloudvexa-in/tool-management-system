import {
  useProductionJobsQuery,
  useShiftLogQuery,
} from "../api/productionQueries";

export function useProductionJobs() {
  const { data: jobs = [], isLoading } = useProductionJobsQuery();
  return { jobs, isLoading };
}

export function useShiftLog() {
  const { data: shiftLog = [], isLoading } = useShiftLogQuery();
  return { shiftLog, isLoading };
}
