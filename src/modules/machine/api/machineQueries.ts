import { useQuery } from "@tanstack/react-query";
import type { MachineChain } from "../types";

const MOCK_CHAINS: MachineChain[] = [
  {
    id: "chain-1",
    name: "Line A — Gearbox Housing",
    machines: [
      {
        id: "mach-1",
        chainId: "chain-1",
        sequenceOrder: 1,
        label: "Haas VF-2 (Rough Mill)",
        type: "cnc",
        status: "running",
        ip: "192.168.1.100",
        currentWorkOrderId: "wo-501",
      },
      {
        id: "mach-2",
        chainId: "chain-1",
        sequenceOrder: 2,
        label: "Haas ST-20 (Finish Turn)",
        type: "lathe",
        status: "idle",
        ip: "192.168.1.101",
        currentWorkOrderId: null,
      },
    ],
  },
  {
    id: "chain-2",
    name: "Line B — Shaft Coupling",
    machines: [
      {
        id: "mach-3",
        chainId: "chain-2",
        sequenceOrder: 1,
        label: "DMG Mori NLX (Turn/Mill)",
        type: "cnc",
        status: "down",
        ip: "192.168.1.110",
        currentWorkOrderId: null,
      },
    ],
  },
];

async function fetchMachineChains(): Promise<MachineChain[]> {
  // TODO: wire up to the real Machine module backend once available.
  return MOCK_CHAINS;
}

export function useMachineChainsQuery() {
  return useQuery({
    queryKey: ["machine", "chains"],
    queryFn: fetchMachineChains,
  });
}
