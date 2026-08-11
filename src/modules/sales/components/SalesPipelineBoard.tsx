"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { Zap } from "lucide-react";
import { SALES_STAGES } from "../types";
import type { SalesOrder, SalesStageId } from "../types";
import SalesOverviewCard from "./SalesOverviewCard";

export default function SalesPipelineBoard({
  orders,
  onTransition,
}: {
  orders: SalesOrder[];
  onTransition: (orderId: string, nextStage: SalesStageId) => void;
}) {
  const handleDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;
    onTransition(draggableId, destination.droppableId as SalesStageId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 h-full overflow-x-auto scrollbar-hide">
        {SALES_STAGES.map((stage) => {
          const stageOrders = orders.filter((o) => o.stage === stage.id);
          return (
            <div
              key={stage.id}
              className="w-[280px] flex-none flex flex-col rounded-xl bg-slate-50 border border-slate-200 overflow-hidden"
            >
              <div
                className={`px-3 py-2.5 border-b flex items-center justify-between flex-none ${stage.color.header}`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${stage.color.dot}`}
                  />
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide ${stage.color.text}`}
                  >
                    {stage.name}
                  </span>
                  {stage.auto && (
                    <span
                      title="Automatically updated by a connected module — not manually moved by sales"
                      className="inline-flex items-center gap-0.5 text-[10px] font-medium text-slate-500 bg-white/70 px-1.5 py-0.5 rounded-full"
                    >
                      <Zap className="h-2.5 w-2.5" /> auto
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-slate-400">
                  {stageOrders.length}
                </span>
              </div>

              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 p-2 space-y-2 overflow-y-auto scrollbar-hide transition-colors ${
                      snapshot.isDraggingOver ? "bg-slate-100" : ""
                    }`}
                  >
                    {stageOrders.map((order, index) => (
                      <Draggable
                        key={order.id}
                        draggableId={order.id}
                        index={index}
                      >
                        {(dragProvided, dragSnapshot) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={
                              dragSnapshot.isDragging ? "rotate-1" : ""
                            }
                          >
                            <SalesOverviewCard
                              order={order}
                              onTransition={onTransition}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {stageOrders.length === 0 && (
                      <p className="text-xs text-slate-400 text-center py-4">
                        No orders
                      </p>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
