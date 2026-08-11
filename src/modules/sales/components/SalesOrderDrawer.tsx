"use client";

import { useState } from "react";
import { Check, X, MessageSquareWarning, Webhook, User } from "lucide-react";
import { DetailDrawer } from "@/modules/shared";
import { SALES_STAGES } from "../types";
import type { SalesOrder, SalesStageId, SalesOrderAction } from "../types";
import { formatOrderId } from "../utils/formatOrderId";

export default function SalesOrderDrawer({
  order,
  onClose,
  onTransition,
  onAction,
}: {
  order: SalesOrder | null;
  onClose: () => void;
  onTransition: (orderId: string, nextStage: SalesStageId) => void;
  onAction: (orderId: string, action: SalesOrderAction) => void;
}) {
  const [comment, setComment] = useState("");

  if (!order) return null;

  const currentIndex = SALES_STAGES.findIndex((s) => s.id === order.stage);
  const stage = SALES_STAGES[currentIndex];
  const nextStage = SALES_STAGES[currentIndex + 1];

  const handleApprove = () => {
    if (!nextStage) return;
    onTransition(order.id, nextStage.id);
    onAction(order.id, {
      type: "approved",
      by: "You",
      at: new Date().toISOString(),
      comment: comment || undefined,
    });
    setComment("");
  };

  const handleReject = () => {
    onAction(order.id, {
      type: "rejected",
      by: "You",
      at: new Date().toISOString(),
      comment: comment || undefined,
    });
    setComment("");
  };

  const handleRequestChanges = () => {
    onAction(order.id, {
      type: "changes-requested",
      by: "You",
      at: new Date().toISOString(),
      comment: comment || undefined,
    });
    setComment("");
  };

  return (
    <DetailDrawer
      open={Boolean(order)}
      onClose={onClose}
      title={order.customerName}
      subtitle={formatOrderId(order.id)}
    >
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${stage.color.header} ${stage.color.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${stage.color.dot}`} />
          {stage.name}
        </span>
        {order.source === "webhook" ? (
          <span className="inline-flex items-center gap-1 text-xs text-indigo-500">
            <Webhook className="h-3 w-3" /> via webhook
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
            <User className="h-3 w-3" /> manual entry
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Quantity</p>
          <p className="text-sm text-slate-800">{order.quantity}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">
            Order Value
          </p>
          <p className="text-sm text-slate-800">
            ${order.totalValue.toLocaleString()}
          </p>
        </div>
      </div>

      {order.lastAction && (
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
            Last Action
          </p>
          <p className="text-xs text-slate-600">
            <span className="font-medium capitalize">
              {order.lastAction.type.replace("-", " ")}
            </span>{" "}
            by {order.lastAction.by} ·{" "}
            {new Date(order.lastAction.at).toLocaleString()}
          </p>
          {order.lastAction.comment && (
            <p className="mt-1 text-xs text-slate-500 italic">
              "{order.lastAction.comment}"
            </p>
          )}
        </div>
      )}

      {nextStage && (
        <div className="space-y-2 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-500">
            {nextStage.id === "invoiced"
              ? "Manual override (normally triggered by Warehouse)"
              : `Move to ${nextStage.name}`}
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
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 text-white px-3 py-2 text-sm font-semibold hover:bg-indigo-700"
            >
              <Check className="h-4 w-4" />
              {nextStage.id === "invoiced" ? "Override" : "Approve"}
            </button>
            <button
              onClick={handleRequestChanges}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 text-slate-600 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              <MessageSquareWarning className="h-4 w-4" />
              Changes
            </button>
            <button
              onClick={handleReject}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 text-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </DetailDrawer>
  );
}
