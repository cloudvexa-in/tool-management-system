import type { ProductionJobStatus } from "../types";

const STYLES: Record<ProductionJobStatus, string> = {
  running: "bg-amber-50 text-amber-700",
  paused: "bg-slate-100 text-slate-600",
  completed: "bg-emerald-50 text-emerald-700",
};

export default function ProductionJobStatusBadge({
  status,
}: {
  status: ProductionJobStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
