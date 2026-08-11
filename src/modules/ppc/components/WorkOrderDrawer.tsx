"use client";

import {
  Play,
  Check,
  AlertTriangle,
  GitMerge,
  CalendarClock,
} from "lucide-react";
import { DetailDrawer } from "@/modules/shared";
import type { WorkOrder, WorkOrderStatus } from "../types";
import WorkOrderStatusBadge from "./WorkOrderStatusBadge";

const NEXT_STATUS: Record<WorkOrderStatus, WorkOrderStatus | null> = {
  scheduled: "in-progress",
  "in-progress": "completed",
  delayed: "in-progress",
  completed: null,
};

const NEXT_LABEL: Record<WorkOrderStatus, string> = {
  scheduled: "Start Production",
  "in-progress": "Mark Completed",
  delayed: "Resume",
  completed: "",
};

export default function WorkOrderDrawer({
  workOrder,
  onClose,
  onStatusChange,
}: {
  workOrder: WorkOrder | null;
  onClose: () => void;
  onStatusChange: (id: string, status: WorkOrderStatus) => void;
}) {
  if (!workOrder) return null;

  const nextStatus = NEXT_STATUS[workOrder.status];

  return (
    <DetailDrawer
      open={Boolean(workOrder)}
      onClose={onClose}
      title={workOrder.partNumber}
      subtitle={workOrder.id.toUpperCase()}
    >
      <div className="flex items-center gap-2">
        <WorkOrderStatusBadge status={workOrder.status} />
        <span className="inline-flex items-center gap-1 text-xs text-purple-600">
          <GitMerge className="h-3 w-3" />
          {workOrder.linkedBomId}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Quantity</p>
          <p className="text-sm text-slate-800">{workOrder.quantity}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">
            Scheduling
          </p>
          <p className="text-sm text-slate-800 uppercase">
            {workOrder.schedulingMethod}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">
            Scheduled Start
          </p>
          <p className="text-sm text-slate-800">{workOrder.scheduledStart}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Due Date</p>
          <p className="text-sm text-slate-800">{workOrder.dueDate}</p>
        </div>
      </div>

      {workOrder.status !== "completed" && (
        <div className="space-y-2 border-t border-slate-100 pt-4">
          <div className="flex gap-2">
            {nextStatus && (
              <button
                onClick={() => onStatusChange(workOrder.id, nextStatus)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-pink-600 text-white px-3 py-2 text-sm font-semibold hover:bg-pink-700"
              >
                {nextStatus === "completed" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {NEXT_LABEL[workOrder.status]}
              </button>
            )}
            {workOrder.status !== "delayed" && (
              <button
                onClick={() => onStatusChange(workOrder.id, "delayed")}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 text-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-50"
              >
                <AlertTriangle className="h-4 w-4" />
                Delay
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 rounded-lg bg-pink-50 border border-pink-100 p-3">
        <CalendarClock className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-pink-700">
          Completing this work order will hand off to Machine and Quality —
          scheduled via the {workOrder.schedulingMethod.toUpperCase()} method
          configured for this org.
        </p>
      </div>
    </DetailDrawer>
  );
}
