import { useQuery } from "@tanstack/react-query";
import type { ProductionJob, ShiftLogEntry } from "../types";

const MOCK_JOBS: ProductionJob[] = [
  {
    id: "job-1",
    workOrderId: "wo-501",
    machineId: "mach-1",
    operator: "R. Mehta",
    shift: 1,
    status: "running",
    startedAt: "2026-08-10 06:05",
  },
  {
    id: "job-2",
    workOrderId: "wo-502",
    machineId: "mach-2",
    operator: "S. Verma",
    shift: 1,
    status: "completed",
    startedAt: "2026-08-09 06:10",
  },
  {
    id: "job-3",
    workOrderId: "wo-504",
    machineId: "mach-3",
    operator: "A. Khan",
    shift: 2,
    status: "paused",
    startedAt: "2026-08-10 14:20",
  },
];

const MOCK_SHIFT_LOG: ShiftLogEntry[] = [
  {
    id: "sl-1",
    jobId: "job-1",
    event: "started",
    operator: "R. Mehta",
    at: "2026-08-10 06:05",
  },
  {
    id: "sl-2",
    jobId: "job-2",
    event: "started",
    operator: "S. Verma",
    at: "2026-08-09 06:10",
  },
  {
    id: "sl-3",
    jobId: "job-2",
    event: "completed",
    operator: "S. Verma",
    at: "2026-08-09 13:50",
  },
  {
    id: "sl-4",
    jobId: "job-3",
    event: "started",
    operator: "A. Khan",
    at: "2026-08-10 14:20",
  },
  {
    id: "sl-5",
    jobId: "job-3",
    event: "paused",
    operator: "A. Khan",
    at: "2026-08-10 16:02",
  },
];

async function fetchJobs(): Promise<ProductionJob[]> {
  // TODO: wire up to the real Production module backend once available.
  return MOCK_JOBS;
}

async function fetchShiftLog(): Promise<ShiftLogEntry[]> {
  return MOCK_SHIFT_LOG;
}

export function useProductionJobsQuery() {
  return useQuery({
    queryKey: ["production", "jobs"],
    queryFn: fetchJobs,
  });
}

export function useShiftLogQuery() {
  return useQuery({
    queryKey: ["production", "shiftLog"],
    queryFn: fetchShiftLog,
  });
}
