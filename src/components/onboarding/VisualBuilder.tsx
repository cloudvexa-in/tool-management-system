interface VisualBuilderProps {
  onNext: () => void;
  onBack: () => void;
}

const modules = [
  {
    title: "Workflow Builder",
    description: "Design the manufacturing process workflow.",
    button: "Open Builder",
  },
  {
    title: "CAD Integration",
    description: "Connect CAD software like AutoCAD, SolidWorks or CATIA.",
    button: "Configure",
  },
  {
    title: "CAM Integration",
    description: "Configure CAM software for manufacturing execution.",
    button: "Configure",
  },
  {
    title: "Hardware Calibration",
    description: "Setup CNC Machines, PLCs and IoT Devices.",
    button: "Configure",
  },
  {
    title: "Tool Configuration",
    description: "Manage cutting tools, tool library and machining steps.",
    button: "Configure",
  },
  {
    title: "Quality Rules",
    description: "Configure inspection points and quality validation.",
    button: "Configure",
  },
];

export default function VisualBuilder({ onNext, onBack }: VisualBuilderProps) {
  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
      <h2 className="text-3xl font-bold text-gray-900">Visual Builder</h2>

      <p className="mt-2 text-gray-500">
        Configure your manufacturing workflow, CAD/CAM integration and
        production setup.
      </p>

      {/* Workflow Canvas Placeholder */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-10 text-center">
        <h3 className="text-xl font-semibold text-blue-700">
          Workflow Builder Canvas
        </h3>

        <p className="mt-3 text-gray-600">
          React Flow canvas will be integrated here in the next phase.
        </p>

        <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          Launch Workflow Builder
        </button>
      </div>

      {/* Configuration Modules */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <div
            key={module.title}
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold">{module.title}</h3>

            <p className="mt-3 text-sm text-gray-600">{module.description}</p>

            <button className="mt-6 w-full rounded-lg bg-slate-800 py-2 text-white hover:bg-black">
              {module.button}
            </button>
          </div>
        ))}
      </div>

      {/* Hardware Calibration Hub */}

      <div className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900">
          Hardware Calibration Hub
        </h3>

        <p className="mt-2 text-gray-500">
          Register manufacturing hardware, configure communication protocols and
          validate device connectivity.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Device Name</label>

            <input
              type="text"
              placeholder="CNC Machine 01"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Machine ID</label>

            <input
              type="text"
              placeholder="MC-001"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Device Type</label>

            <select className="w-full rounded-lg border p-3">
              <option>CNC Machine</option>
              <option>PLC</option>
              <option>Robot Arm</option>
              <option>IoT Sensor</option>
              <option>Conveyor</option>
              <option>3D Printer</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Communication Protocol
            </label>

            <select className="w-full rounded-lg border p-3">
              <option>OPC UA</option>
              <option>MQTT</option>
              <option>Modbus</option>
              <option>EtherNet/IP</option>
              <option>Profinet</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <label className="mb-2 block font-medium">Telemetry Mapping</label>

          <textarea
            rows={5}
            placeholder={`Temperature → temp_sensor
Pressure → pressure_sensor
RPM → spindle_speed
Power → power_usage`}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Calibration Status</label>

            <select className="w-full rounded-lg border p-3">
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
              Test Device Connection
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="rounded-lg bg-green-600 px-8 py-3 text-white hover:bg-green-700">
            Save Configuration
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button onClick={onBack} className="rounded-lg border px-8 py-3">
          ← Previous
        </button>

        <button
          onClick={onNext}
          className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
