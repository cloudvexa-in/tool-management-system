/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import {
  Building2,
  Users,
  Route,
  PenTool,
  Wrench,
  Settings,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Globe2,
  Cpu,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Organization Setup",
      description:
        "Register and configure your organization with tenant-specific, isolated settings.",
      icon: <Building2 className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Employee & RBAC",
      description:
        "Manage departments, employees, and enforce granular role-based access controls.",
      icon: <Users className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Workflow Builder",
      description:
        "Design intricate manufacturing workflows using an interactive visual node builder.",
      icon: <Route className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "CAD/CAM Integration",
      description:
        "Seamlessly connect CAD/CAM software to streamline your production planning pipeline.",
      icon: <PenTool className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Hardware Calibration",
      description:
        "Configure machines, industrial devices, and robust communication protocols (OPC UA, MQTT).",
      icon: <Wrench className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Tool Configuration",
      description:
        "Manage tooling inventories, define production steps, and execute machine mappings.",
      icon: <Settings className="h-6 w-6 text-indigo-600" />,
    },
  ];

  const onboardingSteps = [
    {
      number: "01",
      title: "Profile & Identity",
      description: "Define organization details and tenant workspace.",
    },
    {
      number: "02",
      title: "Access Management",
      description: "Provision users and strict role permissions.",
    },
    {
      number: "03",
      title: "System Integration",
      description: "Connect hardware, CAD/CAM, and build workflows.",
    },
    {
      number: "04",
      title: "Validation",
      description: "Verify configurations and deploy the environment.",
    },
  ];

  const metrics = [
    {
      label: "Uptime SLA",
      value: "99.99%",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      label: "Global Edge Nodes",
      value: "45+",
      icon: <Globe2 className="h-5 w-5" />,
    },
    {
      label: "Operations / Sec",
      value: "10M+",
      icon: <Cpu className="h-5 w-5" />,
    },
    {
      label: "Data Processed",
      value: "PB Scale",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
              <span className="font-bold text-lg leading-none">O</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              OneScreen
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link
              href="#features"
              className="hover:text-slate-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#platform"
              className="hover:text-slate-900 transition-colors"
            >
              Platform
            </Link>
            <Link
              href="#security"
              className="hover:text-slate-900 transition-colors"
            >
              Security
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Onboarding
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-indigo-600 ring-1 ring-indigo-600/20 hover:ring-indigo-600/40 bg-indigo-50/50 backdrop-blur-sm transition-all">
                Announcing OneScreen Platform v2.0{" "}
                <Link href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Read more <span aria-hidden="true">&rarr;</span>
                </Link>
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
              Intelligent end-to-end manufacturing.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Digitize your shop floor. OneScreen unifies organization
              onboarding, RBAC, CAD/CAM integration, and hardware calibration
              into a single, high-performance platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
              >
                Request Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="text-sm font-semibold leading-6 text-slate-900 hover:text-slate-600 transition-colors"
              >
                View Documentation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= METRICS ================= */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-3">
                  {metric.icon}
                </div>
                <dd className="text-3xl font-bold tracking-tight text-slate-900">
                  {metric.value}
                </dd>
                <dt className="text-sm font-medium leading-6 text-slate-500 mt-1">
                  {metric.label}
                </dt>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 sm:py-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Platform Capabilities
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to scale production
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              OneScreen provides a robust suite of modules designed for modern
              manufacturing environments, replacing disjointed legacy systems.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 hover:ring-indigo-200 hover:shadow-md transition-all"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 flex-auto text-base leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ONBOARDING PIPELINE ================= */}
      <section
        id="platform"
        className="py-24 bg-white border-t border-slate-200"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Streamlined Deployment Pipeline
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Go from zero to fully operational in hours, not weeks.
            </p>
          </div>

          <div className="relative mx-auto mt-12 max-w-5xl">
            {/* Connecting line */}
            <div
              className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden md:block"
              aria-hidden="true"
            ></div>

            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
              {onboardingSteps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white border-2 border-indigo-600 text-indigo-600 shadow-sm font-bold text-lg">
                    {step.number}
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 max-w-xs">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-500 text-white">
                <span className="font-bold text-xs leading-none">O</span>
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                OneScreen
              </span>
            </div>
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} OneScreen Inc. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Status
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
