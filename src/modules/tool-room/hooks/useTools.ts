import { useToolLogQuery, useToolsQuery } from "../api/toolRoomQueries";

export function useTools() {
  const { data: tools = [], isLoading } = useToolsQuery();
  return { tools, isLoading };
}

export function useToolLog() {
  const { data: log = [], isLoading } = useToolLogQuery();
  return { log, isLoading };
}
