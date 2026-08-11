"use client";

import { PanelLeft, Settings } from "lucide-react";

export default function DashboardTopbar({
  orgName,
  userName,
  onToggleSidebar,
}: {
  orgName: string;
  userName: string;
  onToggleSidebar: () => void;
}) {
  return (
    <header className="flex-none h-12 border-b border-slate-200 bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-4.5 w-4.5" />
        </button>
        <span className="text-sm font-semibold text-slate-900">{orgName}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-600 truncate max-w-[160px]">
          Hi {userName}!
        </span>
        <button
          className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Settings"
        >
          <Settings className="h-4.5 w-4.5" />
        </button>
      </div>
    </header>
  );
}
