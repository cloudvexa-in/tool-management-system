"use client";

import { Warehouse } from "lucide-react";

export default function WarehouseModuleShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center gap-3 flex-none">
        <Warehouse className="h-6 w-6 text-orange-600" />
        <h1 className="text-2xl font-semibold text-slate-900">Warehouse</h1>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
