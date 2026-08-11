"use client";

import { PanelLeft, Settings } from "lucide-react";
import { RoleSelect } from "@/modules/shared";
import { ROLE_DEFINITIONS, type RoleId } from "@/config/moduleSubmenus";

export default function DashboardTopbar({
  orgName,
  userName,
  role,
  onRoleChange,
  onTogglePanel,
}: {
  orgName: string;
  userName: string;
  role: RoleId;
  onRoleChange: (role: RoleId) => void;
  onTogglePanel: () => void;
}) {
  return (
    <header className="flex-none h-12 border-b border-slate-200 bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onTogglePanel}
          className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Toggle submenu panel"
        >
          <PanelLeft className="h-4.5 w-4.5" />
        </button>
        <span className="text-sm font-semibold text-slate-900">{orgName}</span>
      </div>

      <div className="flex items-center gap-3">
        <RoleSelect
          roles={ROLE_DEFINITIONS}
          value={role}
          onChange={(r) => onRoleChange(r as RoleId)}
        />
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
