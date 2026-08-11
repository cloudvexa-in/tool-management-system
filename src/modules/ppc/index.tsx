"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { useWorkOrders } from "./hooks/useWorkOrders";
import WorkOrderTable from "./components/WorkOrderTable";
import WorkOrderDrawer from "./components/WorkOrderDrawer";
import type { WorkOrder, WorkOrderStatus } from "./types";

export default function PpcModule() {
  const { workOrders: fetched, isLoading } = useWorkOrders();
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (fetched.length > 0) setWorkOrders(fetched);
  }, [fetched]);

  const handleStatusChange = (id: string, status: WorkOrderStatus) => {
    setWorkOrders((prev) =>
      prev.map((wo) => (wo.id === id ? { ...wo, status } : wo)),
    );
  };

  const selected = workOrders.find((wo) => wo.id === selectedId) ?? null;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center gap-3 flex-none">
        <CalendarClock className="h-6 w-6 text-pink-600" />
        <h1 className="text-2xl font-semibold text-slate-900">
          Production Planning
        </h1>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading work orders…</p>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <WorkOrderTable workOrders={workOrders} onSelect={setSelectedId} />
        </div>
      )}

      <WorkOrderDrawer
        workOrder={selected}
        onClose={() => setSelectedId(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
