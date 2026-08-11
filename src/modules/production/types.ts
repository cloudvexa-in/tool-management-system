export type ProductionJobStatus = "running" | "paused" | "completed";

export interface ProductionJob {
  id: string;
  workOrderId: string;
  machineId: string;
  operator: string;
  shift: 1 | 2 | 3;
  status: ProductionJobStatus;
  startedAt: string;
}

export interface ShiftLogEntry {
  id: string;
  jobId: string;
  event: "started" | "paused" | "resumed" | "completed";
  operator: string;
  at: string;
}
