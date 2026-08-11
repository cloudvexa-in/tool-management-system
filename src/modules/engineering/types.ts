export type BomStatus = "draft" | "in-review" | "released";

export interface Bom {
  id: string;
  partNumber: string;
  revision: string;
  description: string;
  status: BomStatus;
  cadSystem: string;
  linkedSalesOrderId: string | null;
  updatedAt: string;
}
