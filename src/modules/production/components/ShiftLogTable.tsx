import { Play, Pause, RotateCcw, Check } from "lucide-react";
import type { ProductionJob, ShiftLogEntry } from "../types";

const EVENT_STYLES: Record<
  ShiftLogEntry["event"],
  { icon: typeof Play; className: string }
> = {
  started: { icon: Play, className: "bg-amber-50 text-amber-700" },
  paused: { icon: Pause, className: "bg-slate-100 text-slate-600" },
  resumed: { icon: RotateCcw, className: "bg-amber-50 text-amber-700" },
  completed: { icon: Check, className: "bg-emerald-50 text-emerald-700" },
};

export default function ShiftLogTable({
  shiftLog,
  jobs,
}: {
  shiftLog: ShiftLogEntry[];
  jobs: ProductionJob[];
}) {
  const workOrderId = (jobId: string) =>
    jobs.find((j) => j.id === jobId)?.workOrderId.toUpperCase() ?? jobId;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">Work Order</th>
            <th className="text-left px-4 py-2.5">Event</th>
            <th className="text-left px-4 py-2.5">Operator</th>
            <th className="text-left px-4 py-2.5">When</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {shiftLog.map((entry) => {
            const { icon: Icon, className } = EVENT_STYLES[entry.event];
            return (
              <tr key={entry.id}>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {workOrderId(entry.jobId)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${className}`}
                  >
                    <Icon className="h-3 w-3" />
                    {entry.event}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{entry.operator}</td>
                <td className="px-4 py-3 text-slate-400">{entry.at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
