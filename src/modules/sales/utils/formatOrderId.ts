export function formatOrderId(id: string): string {
  return `SO-${id.padStart(5, "0")}`;
}
