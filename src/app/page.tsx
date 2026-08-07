import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Organization Setup",
      description:
        "Register and configure your organization with tenant-specific settings.",
      icon: "🏢",
    },
    {
      title: "Employee & RBAC",
      description:
        "Manage departments, employees, roles and permissions securely.",
      icon: "👥",
    },
    {
      title: "Workflow Builder",
      description:
        "Design manufacturing workflows using an interactive visual builder.",
      icon: "🔄",
    },
    {
      title: "CAD/CAM Integration",
      description:
        "Connect CAD/CAM software for streamlined production planning.",
      icon: "📐",
    },
    {
      title: "Hardware Calibration",
      description:
        "Configure machines, industrial devices and communication protocols.",
      icon: "🛠️",
    },
    {
      title: "Tool Configuration",
      description:
        "Manage tools, production steps and machine mappings efficiently.",
      icon: "⚙️",
    },
  ];

  const onboardingSteps = [
    {
      number: "01",
      title: "Organization Details",
      description:
        "Configure organization profile, tenant information and company details.",
    },
    {
      number: "02",
      title: "Employees & Roles",
      description:
        "Create departments, add employees and assign roles & permissions.",
    },
    {
      number: "03",
      title: "Visual Builder",
      description:
        "Configure workflow, CAD/CAM integration, calibration and tool setup.",
    },
    {
      number: "04",
      title: "Review & Finish",
      description: "Verify all configurations and complete tenant onboarding.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">CloudVexa</h1>

            <p className="text-sm text-gray-500">
              Smart Manufacturing Platform
            </p>
          </div>

          <Link
            href="/onboarding"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Start Onboarding
          </Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section className="mx-auto flex max-w-7xl flex-col items-center px-8 py-24 text-center">
        <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold tracking-wide text-blue-700">
          Smart Manufacturing Platform
        </span>

        <h1 className="mt-6 text-6xl font-extrabold leading-tight text-gray-900">
          Tool Management
          <br />
          System
        </h1>

        <p className="mt-5 text-xl font-medium text-blue-600">
          Tenant Setup & Calibration (Admin Portal)
        </p>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
          Digitize your manufacturing environment by onboarding organizations,
          configuring employees, creating production workflows, integrating
          CAD/CAM systems, calibrating hardware and managing tools—all through
          one intelligent platform.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <Link
            href="/onboarding"
            className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-blue-700"
          >
            🚀 Start Tenant Onboarding
          </Link>

          <button className="rounded-xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold transition hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="mx-auto max-w-7xl px-8 pb-24">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Core Platform Features
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Everything required to onboard and configure your manufacturing
            organization.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ONBOARDING JOURNEY ================= */}

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Tenant Onboarding Journey
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              Complete your organization setup in four guided steps.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-6 lg:flex-row">
            {onboardingSteps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="w-72 rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                    {step.number}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {step.description}
                  </p>
                </div>

                {index !== onboardingSteps.length - 1 && (
                  <div className="mx-5 hidden h-1 w-16 rounded-full bg-blue-300 lg:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t bg-gray-100 py-8">
        <div className="mx-auto max-w-7xl text-center text-gray-600">
          © 2026 CloudVexa • Tool Management System
        </div>
      </footer>
    </main>
  );
}
