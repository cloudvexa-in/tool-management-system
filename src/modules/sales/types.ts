export const SALES_STAGES = [
  {
    id: "pre-sale",
    name: "Pre-Sale",
    auto: false,
    color: {
      header: "bg-slate-100 border-slate-200",
      text: "text-slate-700",
      dot: "bg-slate-400",
    },
  },
  {
    id: "quoted",
    name: "Quoted",
    auto: false,
    color: {
      header: "bg-blue-50 border-blue-100",
      text: "text-blue-700",
      dot: "bg-blue-400",
    },
  },
  {
    id: "order-confirmed",
    name: "Order Confirmed",
    auto: false,
    color: {
      header: "bg-amber-50 border-amber-100",
      text: "text-amber-700",
      dot: "bg-amber-400",
    },
  },
  {
    id: "delivered",
    name: "Delivered",
    auto: true,
    color: {
      header: "bg-violet-50 border-violet-100",
      text: "text-violet-700",
      dot: "bg-violet-400",
    },
  },
  {
    id: "invoiced",
    name: "Invoiced",
    auto: true,
    color: {
      header: "bg-emerald-50 border-emerald-100",
      text: "text-emerald-700",
      dot: "bg-emerald-400",
    },
  },
] as const;

export type SalesStageId = (typeof SALES_STAGES)[number]["id"];

export interface SalesOrderAction {
  type: "approved" | "rejected" | "changes-requested";
  by: string;
  at: string;
  comment?: string;
}

export interface SalesOrder {
  id: string;
  customerName: string;
  quantity: number;
  totalValue: number;
  stage: SalesStageId;
  source: "manual" | "webhook";
  lastAction?: SalesOrderAction;
}
