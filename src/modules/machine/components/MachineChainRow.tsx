import { ArrowRight } from "lucide-react";
import type { MachineChain } from "../types";
import MachineStatusCard from "./MachineStatusCard";

export default function MachineChainRow({ chain }: { chain: MachineChain }) {
  const machines = [...chain.machines].sort(
    (a, b) => a.sequenceOrder - b.sequenceOrder,
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
        {chain.name}
      </p>
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
        {machines.map((machine, index) => (
          <div key={machine.id} className="flex items-center gap-3 flex-none">
            <MachineStatusCard machine={machine} />
            {index < machines.length - 1 && (
              <ArrowRight className="h-4 w-4 text-slate-300 flex-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
