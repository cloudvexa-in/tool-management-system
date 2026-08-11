import { ArrowDownCircle, ArrowUpCircle, ScanBarcode } from "lucide-react";
import { DetailDrawer } from "@/modules/shared";
import type { StockItem, StockMovement } from "../types";

export default function StockDetailDrawer({
  item,
  movements,
  onClose,
}: {
  item: StockItem | null;
  movements: StockMovement[];
  onClose: () => void;
}) {
  if (!item) return null;

  const isLow = item.quantity < item.reorderPoint;
  const itemMovements = movements.filter((m) => m.stockItemId === item.id);

  return (
    <DetailDrawer
      open={Boolean(item)}
      onClose={onClose}
      title={item.sku}
      subtitle={item.description}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Quantity</p>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              isLow
                ? "bg-red-50 text-red-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {item.quantity} / reorder {item.reorderPoint}
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1">Location</p>
          <p className="text-sm text-slate-800">{item.location}</p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
          From org configuration
        </p>
        <p className="flex items-center gap-2 text-xs text-slate-600">
          <ScanBarcode className="h-3.5 w-3.5 text-orange-500" />
          Tracking method —{" "}
          {item.trackingMethod === "rfid" ? "RFID" : "Barcode"}
        </p>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold text-slate-500 mb-2">Movements</p>
        <div className="space-y-2">
          {itemMovements.length === 0 && (
            <p className="text-xs text-slate-400">No movements recorded.</p>
          )}
          {itemMovements.map((mv) => (
            <div
              key={mv.id}
              className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2.5"
            >
              {mv.type === "inbound" ? (
                <ArrowDownCircle className="h-4 w-4 text-emerald-500 flex-none" />
              ) : (
                <ArrowUpCircle className="h-4 w-4 text-amber-500 flex-none" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-700">
                  <span className="font-medium capitalize">{mv.type}</span> ·
                  qty {mv.quantity} · ref {mv.reference}
                </p>
                <p className="text-[10px] text-slate-400">{mv.at}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DetailDrawer>
  );
}
