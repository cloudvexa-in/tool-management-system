"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <DashboardTopbar
        orgName={orgName}
        userName={userName}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <div className="flex flex-1 min-h-0">
        <DashboardSidebar
          open={sidebarOpen}
          isAdmin={isAdmin}
          setupCompleted={setupCompleted}
        />
        <main className="flex-1 overflow-y-auto px-8 pt-4 pb-8 min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
}
