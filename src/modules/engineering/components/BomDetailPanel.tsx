"use client";

import { useState } from "react";
import { Check, X, GitMerge, Lock, Cpu } from "lucide-react";
import { DetailDrawer } from "@/modules/shared";
import type { Bom, BomStatus } from "../types";
import BomStatusBadge from "./BomStatusBadge";

const CAD_LABELS: Record<string, string> = {
  solidworks: "SolidWorks PDM",
  teamcenter: "Teamcenter",
};

const NEXT_STATUS: Record<BomStatus, BomStatus | null> = {
  draft: "in-review",
  "in-review": "released",
  released: null,
};

export default function BomDetailPanel({
  bom,
  onClose,
  onStatusChange,
}: {
  bom: Bom | null;
  onClose: () => void;
  onStatusChange: (bomId: string, status: BomStatus) => void;
}) {
  const [comment, setComment] = useState("");

  if (!bom) return null;

  const nextStatus = NEXT_STATUS[bom.status];

  const handleApprove = () => {
    if (!nextStatus) return;
    onStatusChange(bom.id, nextStatus);
    setComment("");
  };

  const handleReject = () => {
    onStatusChange(bom.id, "draft");
    setComment("");
  };

  return (
    <DetailDrawer
      open={Boolean(bom)}
      onClose={onClose}
      title={`Rev ${bom.revision}`}
      subtitle={bom.partNumber}
    >
      <div>
        <p className="text-xs font-semibold text-slate-500 mb-1">Description</p>
        <p className="text-sm text-slate-700">{bom.description}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 mb-1">Status</p>
        <BomStatusBadge status={bom.status} />
      </div>

      {bom.linkedSalesOrderId && (
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">
            Linked Sales Order
          </p>
          <span className="inline-flex items-center gap-1 text-sm text-indigo-600 font-medium">
            <GitMerge className="h-3.5 w-3.5" />
            {bom.linkedSalesOrderId}
          </span>
        </div>
      )}

      <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          From org configuration
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Cpu className="h-3.5 w-3.5 text-purple-500" />
          CAD/PLM System —{" "}
          <span className="font-medium text-slate-800">
            {CAD_LABELS[bom.cadSystem] ?? bom.cadSystem}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Lock className="h-3.5 w-3.5 text-purple-500" />
          Revision control — locked after release
        </div>
      </div>

      {nextStatus && (
        <div className="space-y-2 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-500">
            {bom.status === "in-review"
              ? "Release this revision"
              : "Send for review"}
          </p>
          <textarea
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Optional comment…"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleApprove}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-purple-600 text-white px-3 py-2 text-sm font-semibold hover:bg-purple-700"
            >
              <Check className="h-4 w-4" />
              {bom.status === "in-review" ? "Release" : "Submit for Review"}
            </button>
            {bom.status === "in-review" && (
              <button
                onClick={handleReject}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 text-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-50"
              >
                <X className="h-4 w-4" /> Send Back
              </button>
            )}
          </div>
        </div>
      )}
    </DetailDrawer>
  );
}
