# Project Status & Handoff Document

This document summarizes the progress made on the Tool Management System (ERP), specifically focusing on the Onboarding Flow and the Visual Workflow Builder. Use this to quickly resume development in future sessions.

## 1. Architectural Overhaul

- **Full-Screen Layout:** The onboarding UI (`src/app/onboarding/page.tsx`) was refactored from a constrained, boxed layout to a dynamic, full-width, full-height application interface with a fixed bottom action bar.
- **Visual Builder Replaces Forms:** We abandoned a rigid 16-step form wizard in favor of a dynamic, node-based visual scripting interface (`src/components/VisualWorkflowBuilder.tsx`) powered by `@xyflow/react`. This allows companies to physically draw their manufacturing flow.

## 2. The Blueprint Data-Flow System (Blender-Style)

The visual builder was heavily customized to act like a strict Blueprint engine (similar to Unreal Engine or Blender) rather than a simple flowchart tool:

- **Strict Data Payloads:** Generic snapping was disabled. Nodes feature specific, labeled **Input Ports** (left side) and **Output Ports** (right side).
- **Example Data Routing:** The _Sales Node_ explicitly outputs a "Sales Order", which connects to the _Engineering Node_ input, which in turn outputs a "BOM & Routing" payload.
- **Custom UI Adjustments:**
  - Connection dots (handles) were resized to a crisp 6px and moved inside the node border.
  - Edges (wires) use a custom `DeletableEdge` component. The 'x' delete button is hidden by default and only appears when the edge is hovered or clicked.

## 3. Implemented Manufacturing Nodes

We fully aligned the available nodes with the industry standards defined in `REQUIREMENT.md`. The following custom nodes were built, each featuring specific configuration dropdowns and unique data ports:

1. **Sales & CRM Node** (Integrations, Order Outputs)
2. **Engineering & PLM Node** (CAD/PDM Integrations, BOM generation)
3. **PPC (Production Planning) Node** (Scheduling methods, ERP syncs)
4. **Tool Room / Tool Crib Node** (Inventory tracking, Min stock alerts)
5. **Tool Presetter Node** (Zoller/Speroni integration, Offset data)
6. **Machine Node (IoT)** (CNC/Lathe selection, Telemetry outputs)
7. **Production Node** (Shift management)
8. **Quality Node** (Inspection frequencies)
9. **Warehouse Node** (Barcode/RFID tracking)

## 4. Advanced Node Settings Modals

To keep the main canvas clean while demonstrating a dense ERP interface, we added a **Settings (Cog)** icon to every node header.

- Clicking the Cog opens a large `AdvancedSettingsModal`.
- **Node-Specific Logic:** The modal renders different fields depending on the node type selected (e.g., _Approval Overrides_ for Sales, _Revision Control_ for Engineering, _Cost Center Tracking_ for others).

## 5. Current State & Next Steps

- **Branch:** Changes are force-pushed to the `main` branch.
- **Next Logical Feature:** The onboarding data (the generated JSON from the React Flow graph) needs to be parsed by the backend to actually generate the user's **Dashboard**. Future work should focus on mapping these configured nodes into physical modules/tabs on the main platform dashboard (`src/app/dashboard/page.tsx`).
