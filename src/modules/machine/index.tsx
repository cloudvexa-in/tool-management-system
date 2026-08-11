"use client";

import { Cpu } from "lucide-react";
import { useMachineChains } from "./hooks/useMachineChains";
import MachineChainRow from "./components/MachineChainRow";

export default function MachineModule() {
  const { chains, isLoading } = useMachineChains();

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center gap-3 flex-none">
        <Cpu className="h-6 w-6 text-zinc-700" />
        <h1 className="text-2xl font-semibold text-slate-900">
          Machines (IoT)
        </h1>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading machines…</p>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4">
          {chains.map((chain) => (
            <MachineChainRow key={chain.id} chain={chain} />
          ))}
        </div>
      )}
    </div>
  );
}
