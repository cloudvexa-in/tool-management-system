export interface StockItem {
  id: string;
  sku: string;
  description: string;
  quantity: number;
  reorderPoint: number;
  location: string;
  trackingMethod: "barcode" | "rfid";
}

export interface StockMovement {
  id: string;
  stockItemId: string;
  type: "inbound" | "outbound";
  quantity: number;
  reference: string;
  at: string;
}
