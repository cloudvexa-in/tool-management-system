"use client";

import { Wrench } from "lucide-react";

export default function ToolRoomModuleShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center gap-3 flex-none">
        <Wrench className="h-6 w-6 text-red-600" />
        <h1 className="text-2xl font-semibold text-slate-900">
          Tool Room / Tool Crib
        </h1>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
