export type MachineStatus = "idle" | "running" | "down";

export interface MachineInstance {
  id: string;
  chainId: string;
  sequenceOrder: number;
  label: string;
  type: "cnc" | "lathe";
  status: MachineStatus;
  ip: string;
  currentWorkOrderId: string | null;
}

export interface MachineChain {
  id: string;
  name: string;
  machines: MachineInstance[];
}
