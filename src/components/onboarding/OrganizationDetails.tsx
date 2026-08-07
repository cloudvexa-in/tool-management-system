interface OrganizationDetailsProps {
  onNext: () => void;
}

export default function OrganizationDetails({
  onNext,
}: OrganizationDetailsProps) {
  return (
    <div className="mt-10 rounded-2xl bg-white p-8 shadow-md">
      <h2 className="text-3xl font-bold text-gray-900">Organization Details</h2>

      <p className="mt-2 text-gray-500">
        Configure your organization information to begin the onboarding process.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">Organization Name *</label>

          <input
            type="text"
            placeholder="CloudVexa Pvt Ltd"
            className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Industry</label>

          <select className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none">
            <option>Select Industry</option>
            <option>Manufacturing</option>
            <option>Automotive</option>
            <option>Aerospace</option>
            <option>Medical</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Organization Email</label>

          <input
            type="email"
            placeholder="admin@company.com"
            className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Phone Number</label>

          <input
            type="text"
            placeholder="+91 XXXXX XXXXX"
            className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">Organization Address</label>

          <textarea
            rows={4}
            placeholder="Enter complete address..."
            className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={onNext}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
