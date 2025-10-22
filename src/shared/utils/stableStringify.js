export function stableStringify(obj) {
  const allKeys = new Set();
  JSON.stringify(obj, (k, v) => (allKeys.add(k), v));
  return JSON.stringify(obj, Array.from(allKeys).sort());
}
