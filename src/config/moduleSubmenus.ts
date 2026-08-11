import type { DashboardModuleKey } from "./dashboardModules";

export interface ModuleSubmenu {
  id: string;
  label: string;
}

export const MODULE_SUBMENUS: Partial<
  Record<DashboardModuleKey, ModuleSubmenu[]>
> = {
  sales: [
    { id: "pipeline", label: "Pipeline" },
    { id: "orders", label: "Orders" },
  ],
  "tool-room": [
    { id: "inventory", label: "Inventory" },
    { id: "log", label: "Issue / Return Log" },
  ],
  warehouse: [
    { id: "stock", label: "Stock" },
    { id: "movements", label: "Movements" },
  ],
  production: [
    { id: "jobs", label: "Jobs" },
    { id: "shift-log", label: "Shift Log" },
  ],
};

export interface RoleDefinition {
  id: string;
  label: string;
  moduleKeys: DashboardModuleKey[] | "all";
}

export const ROLE_DEFINITIONS: RoleDefinition[] = [
  { id: "sales", label: "Sales", moduleKeys: ["sales"] },
  { id: "engineering", label: "Engineering", moduleKeys: ["engineering"] },
  { id: "ppc", label: "Production Planning", moduleKeys: ["ppc"] },
  { id: "tool-room", label: "Tool Room", moduleKeys: ["tool-room"] },
  { id: "presetter", label: "Tool Presetter", moduleKeys: ["presetter"] },
  { id: "machine", label: "Machine", moduleKeys: ["machine"] },
  { id: "production", label: "Production", moduleKeys: ["production"] },
  { id: "quality", label: "Quality", moduleKeys: ["quality"] },
  { id: "warehouse", label: "Warehouse", moduleKeys: ["warehouse"] },
  {
    id: "sales-engineering",
    label: "Sales & Engineering",
    moduleKeys: ["sales", "engineering"],
  },
  {
    id: "shop-floor",
    label: "Shop Floor (PPC + Machine + Production + Quality)",
    moduleKeys: ["ppc", "machine", "production", "quality"],
  },
  { id: "admin", label: "Admin (All)", moduleKeys: "all" },
];

export type RoleId = (typeof ROLE_DEFINITIONS)[number]["id"];
