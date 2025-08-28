"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useExampleStore } from "@/state/zustand/exampleStore";

export default function Counter() {
  const { count, increment, decrement, reset } = useExampleStore();
  const value = useDebounce(count, 200);

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md w-60">
      <h2 className="text-lg font-semibold">Debounced Counter</h2>
      <p className="text-2xl font-mono">{value}</p>

      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        >
          -1
        </button>
        <button
          onClick={increment}
          className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
        >
          +1
        </button>
      </div>

      <button
        onClick={reset}
        className="px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
      >
        Reset
      </button>
    </div>
  );
}
