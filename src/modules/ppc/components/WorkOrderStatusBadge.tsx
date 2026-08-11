import type { WorkOrderStatus } from "../types";

const STYLES: Record<WorkOrderStatus, string> = {
  scheduled: "bg-slate-100 text-slate-600",
  "in-progress": "bg-blue-50 text-blue-700",
  delayed: "bg-red-50 text-red-700",
  completed: "bg-emerald-50 text-emerald-700",
};

const LABELS: Record<WorkOrderStatus, string> = {
  scheduled: "Scheduled",
  "in-progress": "In Progress",
  delayed: "Delayed",
  completed: "Completed",
};

export default function WorkOrderStatusBadge({
  status,
}: {
  status: WorkOrderStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
