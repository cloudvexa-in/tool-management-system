import type { ProductionJob } from "../types";
import ProductionJobStatusBadge from "./ProductionJobStatusBadge";

export default function ProductionJobTable({
  jobs,
  onSelect,
}: {
  jobs: ProductionJob[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
          <tr>
            <th className="text-left px-4 py-2.5">Work Order</th>
            <th className="text-left px-4 py-2.5">Machine</th>
            <th className="text-left px-4 py-2.5">Operator</th>
            <th className="text-left px-4 py-2.5">Shift</th>
            <th className="text-left px-4 py-2.5">Status</th>
            <th className="text-left px-4 py-2.5">Started</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {jobs.map((job) => (
            <tr
              key={job.id}
              onClick={() => onSelect(job.id)}
              className="cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-slate-900">
                {job.workOrderId.toUpperCase()}
              </td>
              <td className="px-4 py-3 text-slate-600">{job.machineId}</td>
              <td className="px-4 py-3 text-slate-500">{job.operator}</td>
              <td className="px-4 py-3 text-slate-500">Shift {job.shift}</td>
              <td className="px-4 py-3">
                <ProductionJobStatusBadge status={job.status} />
              </td>
              <td className="px-4 py-3 text-slate-400">{job.startedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
