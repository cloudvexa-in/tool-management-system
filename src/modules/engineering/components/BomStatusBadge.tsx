import type { BomStatus } from "../types";

const STYLES: Record<BomStatus, string> = {
  draft: "bg-slate-100 text-slate-600",
  "in-review": "bg-amber-50 text-amber-700",
  released: "bg-emerald-50 text-emerald-700",
};

const LABELS: Record<BomStatus, string> = {
  draft: "Draft",
  "in-review": "In Review",
  released: "Released",
};

export default function BomStatusBadge({ status }: { status: BomStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
