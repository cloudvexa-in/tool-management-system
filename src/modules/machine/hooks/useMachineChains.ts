import { useMachineChainsQuery } from "../api/machineQueries";

export function useMachineChains() {
  const { data: chains = [], isLoading } = useMachineChainsQuery();
  return { chains, isLoading };
}
