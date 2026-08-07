interface ReviewProps {
  onBack: () => void;
}

export default function Review({ onBack }: ReviewProps) {
  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
      <h2 className="text-3xl font-bold text-gray-900">Review & Finish</h2>

      <p className="mt-2 text-gray-500">
        Review your tenant setup before completing the onboarding process.
      </p>

      <div className="mt-8 space-y-5">
        <div className="rounded-xl border p-5">
          <h3 className="font-semibold text-lg">Organization Details</h3>

          <p className="mt-2 text-gray-600">
            ✔ Organization Information Configured
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="font-semibold text-lg">Employees & Roles</h3>

          <p className="mt-2 text-gray-600">✔ Employees Added Successfully</p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="font-semibold text-lg">Workflow Builder</h3>

          <p className="mt-2 text-gray-600">✔ Manufacturing Workflow Ready</p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="font-semibold text-lg">CAD/CAM Integration</h3>

          <p className="mt-2 text-gray-600">✔ Integration Configured</p>
        </div>

        <div className="rounded-xl border p-5">
          <h3 className="font-semibold text-lg">Hardware Calibration</h3>

          <p className="mt-2 text-gray-600">✔ Machines Ready</p>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button onClick={onBack} className="rounded-lg border px-8 py-3">
          ← Previous
        </button>

        <button className="rounded-lg bg-green-600 px-8 py-3 text-white hover:bg-green-700">
          Complete Setup
        </button>
      </div>
    </div>
  );
}
