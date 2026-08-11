"use client";

import SalesPipelineBoard from "../components/SalesPipelineBoard";
import { useSalesModuleStore } from "../store/useSalesModuleStore";

export default function PipelineView() {
  const { orders, transition, selectOrder } = useSalesModuleStore();

  return (
    <SalesPipelineBoard
      orders={orders}
      onTransition={transition}
      onSelect={selectOrder}
    />
  );
}
