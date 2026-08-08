/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  addEdge,
  Background,
  BackgroundVariant,
  BaseEdge,
  Controls,
  Edge,
  EdgeLabelRenderer,
  getBezierPath,
  Handle,
  MarkerType,
  Node,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Activity,
  Box,
  Briefcase,
  Building,
  Cpu,
  Layers,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";

// --- Custom Deletable Edge ---
function DeletableEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  selected,
}: any) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: selected ? 3 : 2,
          stroke: selected ? "#6366f1" : style.stroke,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan z-50"
        >
          <button
            onClick={() => data?.onDelete(id)}
            className={`w-5 h-5 bg-white border border-slate-300 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500 shadow-sm transition-opacity cursor-pointer ${selected ? "opacity-100" : "opacity-0 hover:opacity-100"}`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

// --- Blender Style Ports (4px/6px handles inside node) ---
const InputPort = ({ id, label }: { id: string; label: string }) => (
  <div className="relative flex items-center py-1.5 px-5 w-full">
    <Handle
      type="target"
      position={Position.Left}
      id={id}
      className="w-[6px] h-[6px] bg-slate-400 border-none rounded-full left-2 z-10 hover:scale-150 transition-transform hover:bg-indigo-500"
    />
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

const OutputPort = ({ id, label }: { id: string; label: string }) => (
  <div className="relative flex items-center py-1.5 px-5 w-full justify-end">
    <Handle
      type="source"
      position={Position.Right}
      id={id}
      className="w-[6px] h-[6px] bg-slate-400 border-none rounded-full right-2 z-10 hover:scale-150 transition-transform hover:bg-amber-500"
    />
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

// --- Header Buttons ---
const NodeActions = ({ id, data }: any) => (
  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
    <button
      onClick={() => data.onOpenSettings(id)}
      className="text-slate-400 hover:text-indigo-600 transition-colors"
    >
      <Settings className="h-4 w-4" />
    </button>
    <button
      onClick={() => data.onDelete(id)}
      className="text-slate-400 hover:text-red-500 transition-colors"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  </div>
);

// --- 1. Sales & CRM Node ---
function SalesNode({ data, id }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm w-72 font-sans group hover:border-blue-400 transition-colors">
      <div className="bg-blue-50 border-b border-blue-100 p-3 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-blue-600" />
          <span className="font-semibold text-sm text-blue-900 truncate">
            {data.label || "Sales & CRM"}
          </span>
        </div>
        <NodeActions id={id} data={data} />
      </div>
      <div className="flex w-full py-1 bg-slate-50/50 border-b border-slate-100">
        <div className="flex-1 flex flex-col">{/* No Inputs */}</div>
        <div className="flex-1 flex flex-col">
          <OutputPort id="out_sales" label="Sales Order" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            CRM Integration
          </label>
          <select
            value={data.crm || "salesforce"}
            onChange={(e) => data.onChange(id, "crm", e.target.value)}
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-700 bg-white focus:border-blue-500 focus:outline-none"
          >
            <option value="salesforce">Salesforce</option>
            <option value="hubspot">HubSpot</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// --- 2. Engineering & PLM Node ---
function EngineeringNode({ data, id }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm w-72 font-sans group hover:border-purple-400 transition-colors">
      <div className="bg-purple-50 border-b border-purple-100 p-3 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-purple-600" />
          <span className="font-semibold text-sm text-purple-900 truncate">
            {data.label || "Engineering"}
          </span>
        </div>
        <NodeActions id={id} data={data} />
      </div>
      <div className="flex w-full py-1 bg-slate-50/50 border-b border-slate-100">
        <div className="flex-1 flex flex-col">
          <InputPort id="in_order" label="Sales Order" />
        </div>
        <div className="flex-1 flex flex-col">
          <OutputPort id="out_bom" label="BOM & Routing" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            CAD/PLM System
          </label>
          <select
            value={data.cad || "solidworks"}
            onChange={(e) => data.onChange(id, "cad", e.target.value)}
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-700 bg-white focus:border-purple-500 focus:outline-none"
          >
            <option value="solidworks">SolidWorks PDM</option>
            <option value="teamcenter">Teamcenter</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// --- 3. PPC (Production Planning) Node ---
function PPCNode({ data, id }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm w-72 font-sans group hover:border-pink-400 transition-colors">
      <div className="bg-pink-50 border-b border-pink-100 p-3 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-pink-600" />
          <span className="font-semibold text-sm text-pink-900 truncate">
            {data.label || "PPC Department"}
          </span>
        </div>
        <NodeActions id={id} data={data} />
      </div>
      <div className="flex w-full py-1 bg-slate-50/50 border-b border-slate-100">
        <div className="flex-1 flex flex-col">
          <InputPort id="in_bom" label="BOM & Routing" />
        </div>
        <div className="flex-1 flex flex-col">
          <OutputPort id="out_wo" label="Work Order" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Scheduling Method
          </label>
          <select
            value={data.scheduling || "jit"}
            onChange={(e) => data.onChange(id, "scheduling", e.target.value)}
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-700 bg-white focus:border-pink-500 focus:outline-none"
          >
            <option value="jit">Just-in-Time (JIT)</option>
            <option value="kanban">Kanban Pull</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// --- 4. Tool Room Node ---
function ToolRoomNode({ data, id }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm w-72 font-sans group hover:border-red-400 transition-colors">
      <div className="bg-red-50 border-b border-red-100 p-3 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          <Box className="h-4 w-4 text-red-600" />
          <span className="font-semibold text-sm text-red-900 truncate">
            {data.label || "Tool Crib"}
          </span>
        </div>
        <NodeActions id={id} data={data} />
      </div>
      <div className="flex w-full py-1 bg-slate-50/50 border-b border-slate-100">
        <div className="flex-1 flex flex-col">{/* No inputs */}</div>
        <div className="flex-1 flex flex-col">
          <OutputPort id="out_tool" label="Tool Assembly" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Min Stock Alert Threshold
          </label>
          <input
            type="number"
            placeholder="e.g. 10"
            value={data.minThreshold || ""}
            onChange={(e) => data.onChange(id, "minThreshold", e.target.value)}
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-700 bg-white focus:border-red-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// --- 5. Tool Presetter Node ---
function ToolPresetterNode({ data, id }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm w-72 font-sans group hover:border-teal-400 transition-colors">
      <div className="bg-teal-50 border-b border-teal-100 p-3 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-teal-600" />
          <span className="font-semibold text-sm text-teal-900 truncate">
            {data.label || "Tool Presetter"}
          </span>
        </div>
        <NodeActions id={id} data={data} />
      </div>
      <div className="flex w-full py-1 bg-slate-50/50 border-b border-slate-100">
        <div className="flex-1 flex flex-col">
          <InputPort id="in_tool" label="Tool Assembly" />
        </div>
        <div className="flex-1 flex flex-col">
          <OutputPort id="out_offsets" label="Tool Offsets" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Device Brand
          </label>
          <select
            value={data.brand || "zoller"}
            onChange={(e) => data.onChange(id, "brand", e.target.value)}
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-700 bg-white focus:border-teal-500 focus:outline-none"
          >
            <option value="zoller">Zoller</option>
            <option value="speroni">Speroni</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// --- 6. Machine / IoT Node ---
function MachineNode({ data, id }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm w-72 font-sans group hover:border-zinc-500 transition-colors">
      <div className="bg-zinc-100 border-b border-zinc-200 p-3 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-zinc-700" />
          <span className="font-semibold text-sm text-zinc-900 truncate">
            {data.label || "Machine IoT"}
          </span>
        </div>
        <NodeActions id={id} data={data} />
      </div>
      <div className="flex w-full py-1 bg-slate-50/50 border-b border-slate-100">
        <div className="flex-1 flex flex-col">
          <InputPort id="in_wo" label="Work Order" />
          <InputPort id="in_offsets" label="Tool Offsets" />
        </div>
        <div className="flex-1 flex flex-col">
          <OutputPort id="out_part" label="Finished Part" />
          <OutputPort id="out_telemetry" label="Telemetry" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Type
            </label>
            <select
              value={data.type || "cnc"}
              onChange={(e) => data.onChange(id, "type", e.target.value)}
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-700 bg-white focus:border-zinc-500 focus:outline-none"
            >
              <option value="cnc">CNC</option>
              <option value="lathe">Lathe</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              IP Address
            </label>
            <input
              type="text"
              placeholder="192.168.1.50"
              value={data.ip || ""}
              onChange={(e) => data.onChange(id, "ip", e.target.value)}
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs font-mono text-slate-700 bg-white focus:border-zinc-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 7. Production Node ---
function ProductionNode({ data, id }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm w-72 font-sans group hover:border-amber-400 transition-colors">
      <div className="bg-amber-50 border-b border-amber-100 p-3 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-amber-600" />
          <span className="font-semibold text-sm text-amber-900 truncate">
            {data.label || "Production Floor"}
          </span>
        </div>
        <NodeActions id={id} data={data} />
      </div>
      <div className="flex w-full py-1 bg-slate-50/50 border-b border-slate-100">
        <div className="flex-1 flex flex-col">
          <InputPort id="in_wo" label="Work Order" />
        </div>
        <div className="flex-1 flex flex-col">
          <OutputPort id="out_part" label="Finished Part" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Operating Shifts
          </label>
          <select
            value={data.shifts || "1"}
            onChange={(e) => data.onChange(id, "shifts", e.target.value)}
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-700 bg-white focus:border-amber-500 focus:outline-none"
          >
            <option value="1">1 Shift</option>
            <option value="3">3 Shifts</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// --- 8. Quality Node ---
function QualityNode({ data, id }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm w-72 font-sans group hover:border-emerald-400 transition-colors">
      <div className="bg-emerald-50 border-b border-emerald-100 p-3 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-600" />
          <span className="font-semibold text-sm text-emerald-900 truncate">
            {data.label || "Quality Control"}
          </span>
        </div>
        <NodeActions id={id} data={data} />
      </div>
      <div className="flex w-full py-1 bg-slate-50/50 border-b border-slate-100">
        <div className="flex-1 flex flex-col">
          <InputPort id="in_part" label="Finished Part" />
        </div>
        <div className="flex-1 flex flex-col">
          <OutputPort id="out_qa" label="QA Approved" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Inspection Frequency
          </label>
          <select
            value={data.frequency || "every_batch"}
            onChange={(e) => data.onChange(id, "frequency", e.target.value)}
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-700 bg-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="100">100% Inspection</option>
            <option value="every_batch">Every Batch</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// --- 9. Warehouse Node ---
function WarehouseNode({ data, id }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm w-72 font-sans group hover:border-orange-400 transition-colors">
      <div className="bg-orange-50 border-b border-orange-100 p-3 flex justify-between items-center rounded-t-lg">
        <div className="flex items-center gap-2">
          <Box className="h-4 w-4 text-orange-600" />
          <span className="font-semibold text-sm text-orange-900 truncate">
            {data.label || "Warehouse"}
          </span>
        </div>
        <NodeActions id={id} data={data} />
      </div>
      <div className="flex w-full py-1 bg-slate-50/50 border-b border-slate-100">
        <div className="flex-1 flex flex-col">
          <InputPort id="in_qa" label="QA Approved" />
        </div>
        <div className="flex-1 flex flex-col">
          <OutputPort id="out_dispatch" label="Dispatched" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Tracking Method
          </label>
          <select
            value={data.tracking || "barcode"}
            onChange={(e) => data.onChange(id, "tracking", e.target.value)}
            className="w-full border border-slate-300 rounded px-2 py-1.5 text-xs text-slate-700 bg-white focus:border-orange-500 focus:outline-none"
          >
            <option value="barcode">Barcode</option>
            <option value="rfid">RFID</option>
          </select>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = {
  salesNode: SalesNode,
  engineeringNode: EngineeringNode,
  productionNode: ProductionNode,
  qualityNode: QualityNode,
  warehouseNode: WarehouseNode,
  machineNode: MachineNode,
  toolRoomNode: ToolRoomNode,
  toolPresetterNode: ToolPresetterNode,
  ppcNode: PPCNode,
};

const edgeTypes = {
  deletableEdge: DeletableEdge,
};

// --- Default Industry Layout ---
const initialNodes: Node[] = [
  {
    id: "n-sales",
    type: "salesNode",
    position: { x: 50, y: 50 },
    data: { label: "Sales & Orders", crm: "salesforce", enablePortal: true },
  },
  {
    id: "n-eng",
    type: "engineeringNode",
    position: { x: 450, y: 50 },
    data: { label: "R&D / Engineering", cad: "solidworks", strictBom: true },
  },
  {
    id: "n-ppc",
    type: "ppcNode",
    position: { x: 850, y: 50 },
    data: {
      label: "Production Planning",
      scheduling: "jit",
      erpSync: "realtime",
    },
  },

  {
    id: "n-toolroom",
    type: "toolRoomNode",
    position: { x: 50, y: 350 },
    data: {
      label: "Central Tool Crib",
      minThreshold: "15",
      restockMethod: "auto_erp",
    },
  },
  {
    id: "n-presetter",
    type: "toolPresetterNode",
    position: { x: 450, y: 350 },
    data: { label: "Zoller Presetter", brand: "zoller", protocol: "rfid" },
  },
  {
    id: "n-mach1",
    type: "machineNode",
    position: { x: 850, y: 350 },
    data: {
      label: "Haas VF-2 (CNC)",
      type: "cnc",
      protocol: "opcua",
      ip: "192.168.1.100",
    },
  },

  {
    id: "n-qual",
    type: "qualityNode",
    position: { x: 850, y: 650 },
    data: {
      label: "Final Quality Check",
      frequency: "every_batch",
      tolerance: "ISO 9001",
    },
  },
  {
    id: "n-ware",
    type: "warehouseNode",
    position: { x: 1250, y: 650 },
    data: { label: "Finished Goods", tracking: "barcode", restockAlert: false },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    type: "deletableEdge",
    source: "n-sales",
    target: "n-eng",
    sourceHandle: "out_sales",
    targetHandle: "in_order",
    animated: true,
    style: { stroke: "#94a3b8", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
  },
  {
    id: "e2",
    type: "deletableEdge",
    source: "n-eng",
    target: "n-ppc",
    sourceHandle: "out_bom",
    targetHandle: "in_bom",
    animated: true,
    style: { stroke: "#94a3b8", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
  },
  {
    id: "e3",
    type: "deletableEdge",
    source: "n-toolroom",
    target: "n-presetter",
    sourceHandle: "out_tool",
    targetHandle: "in_tool",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
  },
  {
    id: "e4",
    type: "deletableEdge",
    source: "n-presetter",
    target: "n-mach1",
    sourceHandle: "out_offsets",
    targetHandle: "in_offsets",
    animated: true,
    style: { stroke: "#ef4444", strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ef4444" },
  },
  {
    id: "e5",
    type: "deletableEdge",
    source: "n-ppc",
    target: "n-mach1",
    sourceHandle: "out_wo",
    targetHandle: "in_wo",
    animated: true,
    style: { stroke: "#94a3b8", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
  },
  {
    id: "e6",
    type: "deletableEdge",
    source: "n-mach1",
    target: "n-qual",
    sourceHandle: "out_part",
    targetHandle: "in_part",
    animated: true,
    style: { stroke: "#94a3b8", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
  },
  {
    id: "e7",
    type: "deletableEdge",
    source: "n-qual",
    target: "n-ware",
    sourceHandle: "out_qa",
    targetHandle: "in_qa",
    animated: true,
    style: { stroke: "#94a3b8", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
  },
];

export default function VisualWorkflowBuilder({
  data,
  updateData,
}: {
  data: any;
  updateData: any;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNodeForm, setNewNodeForm] = useState({
    type: "salesNode",
    label: "",
  });

  const [activeSettingsNodeId, setActiveSettingsNodeId] = useState<
    string | null
  >(null);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "deletableEdge",
            animated: true,
            style: { stroke: "#94a3b8", strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const handleNodeDataChange = useCallback(
    (id: string, field: string, value: any) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === id) {
            return { ...n, data: { ...n.data, [field]: value } };
          }
          return n;
        }),
      );
    },
    [setNodes],
  );

  const handleDeleteNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    },
    [setNodes, setEdges],
  );

  const handleDeleteEdge = useCallback(
    (id: string) => {
      setEdges((eds) => eds.filter((e) => e.id !== id));
    },
    [setEdges],
  );

  const handleOpenSettings = useCallback((id: string) => {
    setActiveSettingsNodeId(id);
  }, []);

  const handleAddNode = () => {
    if (!newNodeForm.label.trim()) return;

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: newNodeForm.type,
      position: { x: 300, y: 100 },
      data: { label: newNodeForm.label },
    };

    setNodes((nds) => nds.concat(newNode));
    setIsAddModalOpen(false);
    setNewNodeForm({ type: "salesNode", label: "" });
  };

  const nodesWithCallbacks = nodes.map((n) => ({
    ...n,
    data: {
      ...n.data,
      onChange: handleNodeDataChange,
      onDelete: handleDeleteNode,
      onOpenSettings: handleOpenSettings,
    },
  }));

  const edgesWithCallbacks = edges.map((e) => ({
    ...e,
    data: { ...e.data, onDelete: handleDeleteEdge },
  }));

  const activeSettingsNode = nodes.find((n) => n.id === activeSettingsNodeId);

  return (
    <div className="w-full h-full bg-[#f8fafc] relative flex flex-col font-sans">
      {/* Floating Toolbar */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Standard Module
        </button>
      </div>

      <ReactFlow
        nodes={nodesWithCallbacks}
        edges={edgesWithCallbacks}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Controls />
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#cbd5e1"
        />
      </ReactFlow>

      {/* --- Add Node Modal --- */}
      {isAddModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">
                Add Operational Module
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                  Module Type
                </label>
                <select
                  value={newNodeForm.type}
                  onChange={(e) =>
                    setNewNodeForm({ ...newNodeForm, type: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none bg-white"
                >
                  <option value="salesNode">Sales & CRM</option>
                  <option value="engineeringNode">Engineering / PLM</option>
                  <option value="ppcNode">Production Planning (PPC)</option>
                  <option value="toolRoomNode">Tool Crib / Tool Room</option>
                  <option value="toolPresetterNode">Tool Presetter</option>
                  <option value="machineNode">Machine Integration</option>
                  <option value="productionNode">
                    Production / Shop Floor
                  </option>
                  <option value="qualityNode">Quality Control</option>
                  <option value="warehouseNode">Warehouse / Inventory</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                  Module Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. European Sales Team"
                  value={newNodeForm.label}
                  onChange={(e) =>
                    setNewNodeForm({ ...newNodeForm, label: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none bg-white"
                />
              </div>
            </div>
            <div className="px-5 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button
                onClick={handleAddNode}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 w-full"
              >
                Deploy Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Advanced Settings Modal --- */}
      {activeSettingsNode && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-500" />
                  Advanced Configuration
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Editing {String(activeSettingsNode.data.label)}
                </p>
              </div>
              <button
                onClick={() => setActiveSettingsNodeId(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {/* Common Fields */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                  Description
                </label>
                <textarea
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
                  placeholder="Module specific notes..."
                />
              </div>

              {/* Node Specific Fields */}
              {activeSettingsNode.type === "salesNode" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                      Allowed Order Statuses
                    </label>
                    <input
                      type="text"
                      defaultValue="Draft, Pending Review, Approved"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                      Approval Workflow Overrides
                    </label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none">
                      <option>Requires Manager Approval</option>
                      <option>Auto-Approve $10k</option>
                    </select>
                  </div>
                </>
              )}

              {activeSettingsNode.type === "engineeringNode" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                      BOM Export Format
                    </label>
                    <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none">
                      <option>XML (Teamcenter)</option>
                      <option>CSV (Generic ERP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                      Revision Control Lock
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded text-indigo-600"
                      />
                      <span className="text-sm text-slate-600">
                        Lock BOM after initial release
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Generic fallback for others to show density */}
              {activeSettingsNode.type !== "salesNode" &&
                activeSettingsNode.type !== "engineeringNode" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                        Cost Center Assignment
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. CC-4091"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                        Supervisor Notification Emails
                      </label>
                      <input
                        type="text"
                        placeholder="admin@org.com, manager@org.com"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">
                        Access Control (RBAC)
                      </label>
                      <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none">
                        <option>Inherit from Department</option>
                        <option>Strict (Managers Only)</option>
                      </select>
                    </div>
                  </>
                )}
            </div>

            <div className="px-5 py-4 border-t border-slate-100 flex justify-end bg-slate-50 gap-2">
              <button
                onClick={() => setActiveSettingsNodeId(null)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setActiveSettingsNodeId(null)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
              >
                Save Config
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
