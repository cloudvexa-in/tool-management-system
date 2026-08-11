import type { InspectionRecord } from "../types";
import InspectionResultBadge from "./InspectionResultBadge";

export default function InspectionTable({
  inspections,
  onSelect,
}: {
  inspections: InspectionRecord[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">Work Order</th>
            <th className="text-left px-4 py-2.5">Inspector</th>
            <th className="text-left px-4 py-2.5">Result</th>
            <th className="text-left px-4 py-2.5">Defect Rate</th>
            <th className="text-left px-4 py-2.5">Inspected</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {inspections.map((record) => (
            <tr
              key={record.id}
              onClick={() => onSelect(record.id)}
              className="cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-slate-900">
                {record.workOrderId.toUpperCase()}
              </td>
              <td className="px-4 py-3 text-slate-600">{record.inspector}</td>
              <td className="px-4 py-3">
                <InspectionResultBadge result={record.result} />
              </td>
              <td className="px-4 py-3 text-slate-500">
                {record.defectRate !== null ? `${record.defectRate}%` : "—"}
              </td>
              <td className="px-4 py-3 text-slate-400">{record.inspectedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
