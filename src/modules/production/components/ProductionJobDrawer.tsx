"use client";

import { Pause, Play, Check } from "lucide-react";
import { DetailDrawer } from "@/modules/shared";
import type { ProductionJob, ProductionJobStatus } from "../types";
import ProductionJobStatusBadge from "./ProductionJobStatusBadge";

export default function ProductionJobDrawer({
  job,
  onClose,
  onStatusChange,
}: {
  job: ProductionJob | null;
  onClose: () => void;
  onStatusChange: (id: string, status: ProductionJobStatus) => void;
}) {
  if (!job) return null;

  return (
    <DetailDrawer
      open={Boolean(job)}
      onClose={onClose}
      title={job.workOrderId.toUpperCase()}
      subtitle={`${job.machineId} · Shift ${job.shift}`}
    >
      <div className="flex items-center gap-2">
        <ProductionJobStatusBadge status={job.status} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Operator</p>
          <p className="text-sm text-slate-800">{job.operator}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Started</p>
          <p className="text-sm text-slate-800">{job.startedAt}</p>
        </div>
      </div>

      {job.status !== "completed" && (
        <div className="flex gap-2 border-t border-slate-100 pt-4">
          {job.status === "running" ? (
            <button
              onClick={() => onStatusChange(job.id, "paused")}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 text-slate-600 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              <Pause className="h-4 w-4" /> Pause
            </button>
          ) : (
            <button
              onClick={() => onStatusChange(job.id, "running")}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 text-slate-600 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              <Play className="h-4 w-4" /> Resume
            </button>
          )}
          <button
            onClick={() => onStatusChange(job.id, "completed")}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-600 text-white px-3 py-2 text-sm font-semibold hover:bg-amber-700"
          >
            <Check className="h-4 w-4" /> Complete
          </button>
        </div>
      )}
    </DetailDrawer>
  );
}
