export type InspectionResult = "pending" | "pass" | "fail";

export interface InspectionRecord {
  id: string;
  workOrderId: string;
  inspector: string;
  result: InspectionResult;
  defectRate: number | null;
  inspectedAt: string;
  notes?: string;
}
