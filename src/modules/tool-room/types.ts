export interface Tool {
  id: string;
  name: string;
  category: string;
  stockLevel: number;
  minThreshold: number;
  location: string;
}

export interface ToolLogEntry {
  id: string;
  toolId: string;
  type: "issue" | "return";
  quantity: number;
  by: string;
  at: string;
}
