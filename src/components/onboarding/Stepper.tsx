interface StepperProps {
  currentStep: number;
}

const steps = [
  "Organization Details",
  "Employees & Roles",
  "Visual Builder",
  "Review & Finish",
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="grid gap-6 md:grid-cols-4">
      {steps.map((step, index) => {
        const active = currentStep === index + 1;
        const completed = currentStep > index + 1;

        return (
          <div
            key={step}
            className={`rounded-xl border p-6 text-center transition-all ${
              active
                ? "border-blue-600 bg-blue-50 shadow-md"
                : completed
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full font-bold text-white ${
                completed
                  ? "bg-green-600"
                  : active
                    ? "bg-blue-600"
                    : "bg-gray-400"
              }`}
            >
              {completed ? "✓" : index + 1}
            </div>

            <h3 className="mt-4 font-semibold">{step}</h3>
          </div>
        );
      })}
    </div>
  );
}
