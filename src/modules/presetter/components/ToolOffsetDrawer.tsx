import { Ruler, Cpu, User } from "lucide-react";
import { DetailDrawer } from "@/modules/shared";
import type { ToolOffset } from "../types";

const BRAND_LABEL: Record<ToolOffset["brand"], string> = {
  zoller: "Zoller",
  speroni: "Speroni",
};

export default function ToolOffsetDrawer({
  offset,
  onClose,
}: {
  offset: ToolOffset | null;
  onClose: () => void;
}) {
  if (!offset) return null;

  return (
    <DetailDrawer
      open={Boolean(offset)}
      onClose={onClose}
      title={offset.toolAssemblyId}
      subtitle="Tool Offset Record"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">X Offset</p>
          <p className="text-sm font-mono text-slate-800">
            {offset.xOffset.toFixed(3)}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Z Offset</p>
          <p className="text-sm font-mono text-slate-800">
            {offset.zOffset.toFixed(3)}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Machine</p>
          <p className="text-sm text-slate-800 inline-flex items-center gap-1">
            <Cpu className="h-3.5 w-3.5 text-zinc-400" />
            {offset.machineId}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">
            Recorded By
          </p>
          <p className="text-sm text-slate-800 inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5 text-slate-400" />
            {offset.recordedBy}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
          From org configuration
        </p>
        <p className="flex items-center gap-2 text-xs text-slate-600">
          <Ruler className="h-3.5 w-3.5 text-teal-500" />
          Presetter device — {BRAND_LABEL[offset.brand]}
        </p>
      </div>
    </DetailDrawer>
  );
}
