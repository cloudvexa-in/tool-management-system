import type { InspectionResult } from "../types";

const STYLES: Record<InspectionResult, string> = {
  pending: "bg-slate-100 text-slate-600",
  pass: "bg-emerald-50 text-emerald-700",
  fail: "bg-red-50 text-red-700",
};

export default function InspectionResultBadge({
  result,
}: {
  result: InspectionResult;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STYLES[result]}`}
    >
      {result}
    </span>
  );
}
