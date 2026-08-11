import { useQuery } from "@tanstack/react-query";
import type { Tool, ToolLogEntry } from "../types";

const MOCK_TOOLS: Tool[] = [
  {
    id: "tool-01",
    name: "12mm Carbide End Mill",
    category: "Cutting Tool",
    stockLevel: 6,
    minThreshold: 10,
    location: "Rack A-3",
  },
  {
    id: "tool-02",
    name: "CNC Collet Chuck ER32",
    category: "Toolholder",
    stockLevel: 24,
    minThreshold: 8,
    location: "Rack B-1",
  },
  {
    id: "tool-03",
    name: "Insert Grade CNMG120408",
    category: "Insert",
    stockLevel: 3,
    minThreshold: 15,
    location: "Rack A-1",
  },
  {
    id: "tool-04",
    name: "6mm HSS Drill Bit",
    category: "Cutting Tool",
    stockLevel: 40,
    minThreshold: 12,
    location: "Rack A-2",
  },
];

const MOCK_LOG: ToolLogEntry[] = [
  {
    id: "log-1",
    toolId: "tool-01",
    type: "issue",
    quantity: 4,
    by: "R. Mehta",
    at: "2026-08-10 09:12",
  },
  {
    id: "log-2",
    toolId: "tool-03",
    type: "issue",
    quantity: 12,
    by: "S. Verma",
    at: "2026-08-09 14:40",
  },
  {
    id: "log-3",
    toolId: "tool-02",
    type: "return",
    quantity: 6,
    by: "R. Mehta",
    at: "2026-08-08 17:05",
  },
];

async function fetchTools(): Promise<Tool[]> {
  // TODO: wire up to the real Tool Room module backend once available.
  return MOCK_TOOLS;
}

async function fetchToolLog(): Promise<ToolLogEntry[]> {
  return MOCK_LOG;
}

export function useToolsQuery() {
  return useQuery({ queryKey: ["tool-room", "tools"], queryFn: fetchTools });
}

export function useToolLogQuery() {
  return useQuery({ queryKey: ["tool-room", "log"], queryFn: fetchToolLog });
}
