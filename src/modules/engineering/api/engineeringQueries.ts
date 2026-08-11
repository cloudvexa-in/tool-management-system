import { useQuery } from "@tanstack/react-query";
import type { Bom } from "../types";

const MOCK_BOMS: Bom[] = [
  {
    id: "bom-2001",
    partNumber: "PN-48213-A",
    revision: "C",
    description: "Gearbox housing, machined aluminum",
    status: "released",
    cadSystem: "solidworks",
    linkedSalesOrderId: "so-1004",
    updatedAt: "2026-08-04",
  },
  {
    id: "bom-2002",
    partNumber: "PN-77120-B",
    revision: "A",
    description: "Bracket assembly, 6mm steel",
    status: "in-review",
    cadSystem: "solidworks",
    linkedSalesOrderId: "so-1003",
    updatedAt: "2026-08-07",
  },
  {
    id: "bom-2003",
    partNumber: "PN-90045-A",
    revision: "B",
    description: "Turbine blade — investment cast",
    status: "draft",
    cadSystem: "teamcenter",
    linkedSalesOrderId: null,
    updatedAt: "2026-08-09",
  },
  {
    id: "bom-2004",
    partNumber: "PN-11390-C",
    revision: "D",
    description: "Shaft coupling, splined",
    status: "released",
    cadSystem: "teamcenter",
    linkedSalesOrderId: "so-1006",
    updatedAt: "2026-07-28",
  },
];

async function fetchBoms(): Promise<Bom[]> {
  // TODO: wire up to the real Engineering module backend once available.
  return MOCK_BOMS;
}

export function useBomsQuery() {
  return useQuery({
    queryKey: ["engineering", "boms"],
    queryFn: fetchBoms,
  });
}
