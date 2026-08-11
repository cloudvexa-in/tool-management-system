"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import { type RoleId } from "@/config/moduleSubmenus";

export default function DashboardShell({
  orgName,
  userName,
  isAdmin,
  setupCompleted,
  children,
}: {
  orgName: string;
  userName: string;
  isAdmin: boolean;
  setupCompleted: boolean;
  children: React.ReactNode;
}) {
  const [panelOpen, setPanelOpen] = useState(true);
  const [role, setRole] = useState<RoleId>("admin");

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <DashboardTopbar
        orgName={orgName}
        userName={userName}
        role={role}
        onRoleChange={setRole}
        onTogglePanel={() => setPanelOpen((v) => !v)}
      />
      <div className="flex flex-1 min-h-0">
        <DashboardSidebar
          panelOpen={panelOpen}
          isAdmin={isAdmin}
          setupCompleted={setupCompleted}
          role={role}
        />
        <main className="flex-1 overflow-y-auto px-8 pt-4 pb-8 min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
}
