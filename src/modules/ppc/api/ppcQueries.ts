import { useQuery } from "@tanstack/react-query";
import type { WorkOrder } from "../types";

const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    id: "wo-501",
    partNumber: "PN-48213-A",
    linkedBomId: "bom-2001",
    quantity: 500,
    status: "in-progress",
    scheduledStart: "2026-08-05",
    dueDate: "2026-08-14",
    schedulingMethod: "jit",
  },
  {
    id: "wo-502",
    partNumber: "PN-11390-C",
    linkedBomId: "bom-2004",
    quantity: 150,
    status: "completed",
    scheduledStart: "2026-07-20",
    dueDate: "2026-07-28",
    schedulingMethod: "kanban",
  },
  {
    id: "wo-503",
    partNumber: "PN-77120-B",
    linkedBomId: "bom-2002",
    quantity: 1200,
    status: "scheduled",
    scheduledStart: "2026-08-12",
    dueDate: "2026-08-22",
    schedulingMethod: "jit",
  },
  {
    id: "wo-504",
    partNumber: "PN-90045-A",
    linkedBomId: "bom-2003",
    quantity: 80,
    status: "delayed",
    scheduledStart: "2026-08-01",
    dueDate: "2026-08-09",
    schedulingMethod: "kanban",
  },
];

async function fetchWorkOrders(): Promise<WorkOrder[]> {
  // TODO: wire up to the real PPC module backend once available.
  return MOCK_WORK_ORDERS;
}

export function useWorkOrdersQuery() {
  return useQuery({
    queryKey: ["ppc", "workOrders"],
    queryFn: fetchWorkOrders,
  });
}
