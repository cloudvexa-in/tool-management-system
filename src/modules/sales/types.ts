export interface SalesOrder {
  id: string;
  customerName: string;
  quantity: number;
  totalValue: number;
  status: "draft" | "quoted" | "approved" | "in-production";
}
