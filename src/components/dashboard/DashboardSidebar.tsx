"use client";

import { DASHBOARD_MODULES } from "@/config/dashboardModules";
import {
  MODULE_SUBMENUS,
  ROLE_DEFINITIONS,
  type RoleId,
} from "@/config/moduleSubmenus";
import { LayoutDashboard, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar({
  panelOpen,
  isAdmin,
  setupCompleted,
  role,
}: {
  panelOpen: boolean;
  isAdmin: boolean;
  setupCompleted: boolean;
  role: RoleId;
}) {
  const pathname = usePathname();
  const showOverview = isAdmin || !setupCompleted;

  const roleDef = ROLE_DEFINITIONS.find((r) => r.id === role);
  const visibleModules = setupCompleted
    ? DASHBOARD_MODULES.filter(
        (mod) =>
          roleDef?.moduleKeys === "all" ||
          roleDef?.moduleKeys.includes(mod.key),
      )
    : [];

  const activeModule = visibleModules.find((mod) =>
    pathname.startsWith(mod.href),
  );
  const submenus = activeModule ? MODULE_SUBMENUS[activeModule.key] : undefined;
  const showPanel = Boolean(submenus && submenus.length > 0 && panelOpen);

  return (
    <div className="flex h-full flex-none">
      <aside className="flex h-full w-16 flex-none flex-col border-r border-slate-200 bg-white">
        <nav className="flex-1 flex flex-col items-center gap-1 overflow-y-auto py-4">
          {showOverview && (
            <IconLink
              href="/dashboard"
              label="Overview"
              icon={LayoutDashboard}
              active={pathname === "/dashboard"}
            />
          )}

          {visibleModules.map((mod) => {
            const modSubmenus = MODULE_SUBMENUS[mod.key];
            const href = modSubmenus
              ? `${mod.href}/${modSubmenus[0].id}`
              : mod.href;
            return (
              <IconLink
                key={mod.key}
                href={href}
                label={mod.label}
                icon={mod.icon}
                active={pathname.startsWith(mod.href)}
              />
            );
          })}
        </nav>

        <div className="flex-none py-3">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Log out"
            className="flex items-center justify-center w-10 h-10 mx-auto rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {showPanel && activeModule && submenus && (
        <div className="w-[260px] flex-none border-r border-slate-200 bg-white overflow-y-auto py-4 px-3">
          <p className="px-1 pb-2 text-sm font-semibold text-slate-700">
            {activeModule.label}
          </p>
          <div className="space-y-0.5">
            {submenus.map((submenu) => {
              const isActive =
                pathname === `${activeModule.href}/${submenu.id}`;
              return (
                <Link
                  key={submenu.id}
                  href={`${activeModule.href}/${submenu.id}`}
                  className={`block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {submenu.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function IconLink({
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
      title={label}
      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon className="h-4.5 w-4.5" />
    </Link>
  );
}
