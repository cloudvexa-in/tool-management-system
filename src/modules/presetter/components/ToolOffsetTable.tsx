import type { ToolOffset } from "../types";

const BRAND_LABEL: Record<ToolOffset["brand"], string> = {
  zoller: "Zoller",
  speroni: "Speroni",
};

export default function ToolOffsetTable({
  offsets,
  onSelect,
}: {
  offsets: ToolOffset[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">Tool</th>
            <th className="text-left px-4 py-2.5">Machine</th>
            <th className="text-left px-4 py-2.5">X Offset</th>
            <th className="text-left px-4 py-2.5">Z Offset</th>
            <th className="text-left px-4 py-2.5">Device</th>
            <th className="text-left px-4 py-2.5">Recorded</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {offsets.map((offset) => (
            <tr
              key={offset.id}
              onClick={() => onSelect(offset.id)}
              className="cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-slate-900">
                {offset.toolAssemblyId}
              </td>
              <td className="px-4 py-3 text-slate-600">{offset.machineId}</td>
              <td className="px-4 py-3 text-slate-500 font-mono">
                {offset.xOffset.toFixed(3)}
              </td>
              <td className="px-4 py-3 text-slate-500 font-mono">
                {offset.zOffset.toFixed(3)}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center rounded-full bg-teal-50 text-teal-700 px-2 py-0.5 text-xs font-medium">
                  {BRAND_LABEL[offset.brand]}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-400">{offset.recordedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
