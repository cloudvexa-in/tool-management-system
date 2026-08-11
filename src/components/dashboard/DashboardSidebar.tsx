"use client";

import { DASHBOARD_MODULES } from "@/config/dashboardModules";
import { LayoutDashboard, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar({
  open,
  isAdmin,
  setupCompleted,
}: {
  open: boolean;
  isAdmin: boolean;
  setupCompleted: boolean;
}) {
  const pathname = usePathname();
  const showOverview = isAdmin || !setupCompleted;
  const showModules = setupCompleted;

  return (
    <aside
      className={`flex h-full flex-none flex-col border-r border-slate-200 bg-white overflow-hidden transition-[width] duration-200 ${
        open ? "w-64" : "w-16"
      }`}
    >
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {showOverview && (
          <SidebarLink
            href="/dashboard"
            label="Overview"
            icon={LayoutDashboard}
            active={pathname === "/dashboard"}
            collapsed={!open}
          />
        )}

        {showModules &&
          DASHBOARD_MODULES.map((mod) => (
            <SidebarLink
              key={mod.key}
              href={mod.href}
              label={mod.label}
              icon={mod.icon}
              active={pathname.startsWith(mod.href)}
              collapsed={!open}
            />
          ))}
      </nav>

      <div className="flex-none border-t border-slate-100 px-3 py-3 space-y-2">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          title="Log out"
          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors ${
            !open ? "justify-center px-0" : ""
          }`}
        >
          <LogOut className="h-4 w-4 flex-none" />
          {open && "Log out"}
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      } ${collapsed ? "justify-center px-0" : ""}`}
    >
      <Icon className="h-4 w-4 flex-none" />
      {!collapsed && label}
    </Link>
  );
}
