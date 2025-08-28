import { useQuery } from "@tanstack/react-query";

async function fetchExample() {
  const res = await fetch("/api/example");
  if (!res.ok) throw new Error("Failed to fetch example");
  return res.json();
}

export function useExampleQuery() {
  return useQuery({ queryKey: ["example"], queryFn: fetchExample });
}
