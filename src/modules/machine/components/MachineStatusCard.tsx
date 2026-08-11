import { Cpu, Wrench } from "lucide-react";
import type { MachineInstance, MachineStatus } from "../types";

const STATUS_STYLES: Record<
  MachineStatus,
  { dot: string; label: string; text: string }
> = {
  running: {
    dot: "bg-emerald-500 animate-pulse",
    label: "Running",
    text: "text-emerald-700",
  },
  idle: { dot: "bg-slate-400", label: "Idle", text: "text-slate-600" },
  down: { dot: "bg-red-500", label: "Down", text: "text-red-700" },
};

export default function MachineStatusCard({
  machine,
}: {
  machine: MachineInstance;
}) {
  const status = STATUS_STYLES[machine.status];

  return (
    <div className="w-64 flex-none rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${status.dot}`} />
          <span className={`text-xs font-semibold ${status.text}`}>
            {status.label}
          </span>
        </div>
        <Cpu className="h-3.5 w-3.5 text-zinc-400" />
      </div>
      <p className="text-sm font-semibold text-slate-900">{machine.label}</p>
      <p className="mt-0.5 text-xs font-mono text-slate-400">{machine.ip}</p>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
        <Wrench className="h-3 w-3" />
        {machine.currentWorkOrderId ? (
          <span>{machine.currentWorkOrderId}</span>
        ) : (
          <span className="text-slate-400">No active work order</span>
        )}
      </div>
    </div>
  );
}
