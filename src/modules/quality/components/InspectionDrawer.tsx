"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { DetailDrawer } from "@/modules/shared";
import type { InspectionRecord } from "../types";
import InspectionResultBadge from "./InspectionResultBadge";

export default function InspectionDrawer({
  record,
  onClose,
  onResult,
}: {
  record: InspectionRecord | null;
  onClose: () => void;
  onResult: (id: string, result: "pass" | "fail", defectRate: number) => void;
}) {
  const [defectRate, setDefectRate] = useState("0");

  if (!record) return null;

  return (
    <DetailDrawer
      open={Boolean(record)}
      onClose={onClose}
      title={record.workOrderId.toUpperCase()}
      subtitle={`Inspected by ${record.inspector}`}
    >
      <div className="flex items-center gap-2">
        <InspectionResultBadge result={record.result} />
        {record.defectRate !== null && (
          <span className="text-xs text-slate-500">
            {record.defectRate}% defect rate
          </span>
        )}
      </div>

      {record.notes && (
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Notes</p>
          <p className="text-sm text-slate-700">{record.notes}</p>
        </div>
      )}

      {record.result === "pending" && (
        <div className="space-y-2 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-500">
            Record inspection result
          </p>
          <input
            type="number"
            step="0.1"
            value={defectRate}
            onChange={(e) => setDefectRate(e.target.value)}
            placeholder="Defect rate %"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() =>
                onResult(record.id, "pass", Number(defectRate) || 0)
              }
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 text-white px-3 py-2 text-sm font-semibold hover:bg-emerald-700"
            >
              <Check className="h-4 w-4" /> Pass
            </button>
            <button
              onClick={() =>
                onResult(record.id, "fail", Number(defectRate) || 0)
              }
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 text-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-50"
            >
              <X className="h-4 w-4" /> Fail
            </button>
          </div>
        </div>
      )}
    </DetailDrawer>
  );
}
