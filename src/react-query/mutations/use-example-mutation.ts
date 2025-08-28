import { useMutation } from "@tanstack/react-query";

async function postExample(data: unknown) {
  const res = await fetch("/api/example", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to post example");
  return res.json();
}

export function useExampleMutation() {
  return useMutation({ mutationFn: postExample });
}
