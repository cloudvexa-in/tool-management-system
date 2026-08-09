import {
  CalendarClock,
  CodeXml,
  Cpu,
  Factory,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type DashboardModuleKey =
  | "sales"
  | "engineering"
  | "ppc"
  | "tool-room"
  | "presetter"
  | "machine"
  | "production"
  | "quality"
  | "warehouse";

export interface DashboardModuleConfig {
  key: DashboardModuleKey;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const DASHBOARD_MODULES: DashboardModuleConfig[] = [
  {
    key: "sales",
    label: "Sales & CRM",
    href: "/dashboard/sales",
    icon: ShoppingCart,
  },
  {
    key: "engineering",
    label: "Engineering & PLM",
    href: "/dashboard/engineering",
    icon: CodeXml,
  },
  {
    key: "ppc",
    label: "Production Planning",
    href: "/dashboard/ppc",
    icon: CalendarClock,
  },
  {
    key: "tool-room",
    label: "Tool Room",
    href: "/dashboard/tool-room",
    icon: Wrench,
  },
  {
    key: "presetter",
    label: "Tool Presetter",
    href: "/dashboard/presetter",
    icon: Ruler,
  },
  {
    key: "machine",
    label: "Machines (IoT)",
    href: "/dashboard/machine",
    icon: Cpu,
  },
  {
    key: "production",
    label: "Production",
    href: "/dashboard/production",
    icon: Factory,
  },
  {
    key: "quality",
    label: "Quality",
    href: "/dashboard/quality",
    icon: ShieldCheck,
  },
  {
    key: "warehouse",
    label: "Warehouse",
    href: "/dashboard/warehouse",
    icon: Warehouse,
  },
];
