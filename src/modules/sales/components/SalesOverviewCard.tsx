"use client";

import { useState } from "react";
import { Webhook, User, MoreVertical } from "lucide-react";
import { formatOrderId } from "../utils/formatOrderId";
import { SALES_STAGES } from "../types";
import type { SalesOrder, SalesStageId } from "../types";

export default function SalesOverviewCard({
  order,
  onTransition,
}: {
  order: SalesOrder;
  onTransition: (orderId: string, nextStage: SalesStageId) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const currentIndex = SALES_STAGES.findIndex((s) => s.id === order.stage);
  const nextStage = SALES_STAGES[currentIndex + 1];

  return (
    <div className="relative rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:border-indigo-300 transition-colors">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-400">
          {formatOrderId(order.id)}
        </p>
        <div className="flex items-center gap-1.5">
          {order.source === "webhook" ? (
            <Webhook className="h-3.5 w-3.5 text-indigo-400" />
          ) : (
            <User className="h-3.5 w-3.5 text-slate-300" />
          )}
          {nextStage && (
            <button
              onClick={() => setMenuOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
              className="text-slate-300 hover:text-slate-600 transition-colors"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
      <p className="mt-1 font-semibold text-sm text-slate-900">
        {order.customerName}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Qty {order.quantity} · ${order.totalValue.toLocaleString()}
      </p>

      {menuOpen && nextStage && (
        <div className="absolute right-2 top-8 z-20 w-48 rounded-lg border border-slate-200 bg-white shadow-lg py-1">
          <button
            onClick={() => {
              onTransition(order.id, nextStage.id);
              setMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            {nextStage.id === "invoiced"
              ? `Override to ${nextStage.name}`
              : `Approve to ${nextStage.name}`}
          </button>
          {nextStage.id === "invoiced" && (
            <p className="px-3 pb-1.5 text-[10px] text-slate-400 leading-snug">
              Normally triggered automatically from Warehouse dispatch.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
