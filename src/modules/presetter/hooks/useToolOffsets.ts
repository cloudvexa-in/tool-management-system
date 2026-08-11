import { useToolOffsetsQuery } from "../api/presetterQueries";

export function useToolOffsets() {
  const { data: offsets = [], isLoading } = useToolOffsetsQuery();
  return { offsets, isLoading };
}
