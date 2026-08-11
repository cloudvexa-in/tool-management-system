import { useQuery } from "@tanstack/react-query";
import type { ToolOffset } from "../types";

const MOCK_OFFSETS: ToolOffset[] = [
  {
    id: "off-1",
    toolAssemblyId: "tool-01",
    machineId: "mach-1",
    xOffset: 125.402,
    zOffset: -42.118,
    brand: "zoller",
    recordedBy: "S. Verma",
    recordedAt: "2026-08-09 08:20",
  },
  {
    id: "off-2",
    toolAssemblyId: "tool-04",
    machineId: "mach-1",
    xOffset: 98.775,
    zOffset: -12.004,
    brand: "zoller",
    recordedBy: "R. Mehta",
    recordedAt: "2026-08-08 16:05",
  },
  {
    id: "off-3",
    toolAssemblyId: "tool-02",
    machineId: "mach-3",
    xOffset: 60.221,
    zOffset: -8.552,
    brand: "speroni",
    recordedBy: "S. Verma",
    recordedAt: "2026-08-07 11:41",
  },
];

async function fetchOffsets(): Promise<ToolOffset[]> {
  // TODO: wire up to the real Tool Presetter module backend once available.
  return MOCK_OFFSETS;
}

export function useToolOffsetsQuery() {
  return useQuery({
    queryKey: ["presetter", "offsets"],
    queryFn: fetchOffsets,
  });
}
