"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { DASHBOARD_MODULES } from "@/config/dashboardModules";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-none flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 flex-none items-center gap-2 border-b border-slate-100 px-6">
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          OneScreen
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <SidebarLink
          href="/dashboard"
          label="Overview"
          icon={LayoutDashboard}
          active={pathname === "/dashboard"}
        />

        <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Modules
        </p>
        {DASHBOARD_MODULES.map((mod) => (
          <SidebarLink
            key={mod.key}
            href={mod.href}
            label={mod.label}
            icon={mod.icon}
            active={pathname.startsWith(mod.href)}
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
