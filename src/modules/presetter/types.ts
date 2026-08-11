export interface ToolOffset {
  id: string;
  toolAssemblyId: string;
  machineId: string;
  xOffset: number;
  zOffset: number;
  brand: "zoller" | "speroni";
  recordedBy: string;
  recordedAt: string;
}
