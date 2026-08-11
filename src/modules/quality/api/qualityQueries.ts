import { useQuery } from "@tanstack/react-query";
import type { InspectionRecord } from "../types";

const MOCK_RECORDS: InspectionRecord[] = [
  {
    id: "qc-1",
    workOrderId: "wo-502",
    inspector: "A. Khan",
    result: "pass",
    defectRate: 0.4,
    inspectedAt: "2026-07-28 15:30",
  },
  {
    id: "qc-2",
    workOrderId: "wo-501",
    inspector: "A. Khan",
    result: "pending",
    defectRate: null,
    inspectedAt: "2026-08-10 09:00",
  },
  {
    id: "qc-3",
    workOrderId: "wo-504",
    inspector: "S. Verma",
    result: "fail",
    defectRate: 6.2,
    inspectedAt: "2026-08-09 12:15",
    notes: "Surface finish out of tolerance on batch 2.",
  },
];

async function fetchInspections(): Promise<InspectionRecord[]> {
  // TODO: wire up to the real Quality module backend once available.
  return MOCK_RECORDS;
}

export function useInspectionsQuery() {
  return useQuery({
    queryKey: ["quality", "inspections"],
    queryFn: fetchInspections,
  });
}
