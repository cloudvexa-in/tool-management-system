export type WorkOrderStatus =
  | "scheduled"
  | "in-progress"
  | "delayed"
  | "completed";

export interface WorkOrder {
  id: string;
  partNumber: string;
  linkedBomId: string;
  quantity: number;
  status: WorkOrderStatus;
  scheduledStart: string;
  dueDate: string;
  schedulingMethod: "jit" | "kanban";
}
