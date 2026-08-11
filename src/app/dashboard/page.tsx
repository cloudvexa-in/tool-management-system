import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const organization = session?.user?.organizationId
    ? await prisma.organization.findUnique({
        where: { id: session.user.organizationId },
        select: { completedSteps: true, onboardingCompletedAt: true },
      })
    : null;

  const completedSteps = organization?.completedSteps ?? [];
  const isFullyCompleted = Boolean(organization?.onboardingCompletedAt);

  const steps = [
    { id: "org-profile", name: "Organization Profile", required: true },
    { id: "admin-setup", name: "Admin Setup", required: true },
    { id: "rbac-setup", name: "Role Hierarchy (RBAC)", required: true },
    {
      id: "workflow-builder",
      name: "Department & Machine Layout",
      required: true,
    },
    { id: "employee-setup", name: "Employee Setup", required: true },
  ];

  if (!isFullyCompleted) {
    const requiredDone = steps.filter(
      (s) => s.required && completedSteps.includes(s.id),
    ).length;
    const totalRequired = steps.filter((s) => s.required).length;

    return (
      <div className="p-8 font-sans text-slate-900">
        <div className="mx-auto max-w-4xl mt-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to OneScreen
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Let&apos;s finish setting up your organization before you dive in.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">Onboarding Progress</h2>
                <p className="text-sm text-slate-500">
                  {requiredDone} of {totalRequired} required steps completed
                </p>
              </div>
              <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${(requiredDone / totalRequired) * 100}%` }}
                />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {steps.map((step) => {
                const isCompleted = completedSteps.includes(step.id);
                return (
                  <div
                    key={step.id}
                    className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-slate-300" />
                      )}
                      <div>
                        <h3
                          className={`font-medium ${isCompleted ? "text-slate-600 line-through" : "text-slate-900"}`}
                        >
                          {step.name}
                          {!step.required && (
                            <span className="ml-2 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full no-underline inline-block">
                              Optional
                            </span>
                          )}
                        </h3>
                      </div>
                    </div>
                    <div>
                      {!isCompleted ? (
                        <Link
                          href={`/onboarding?step=${step.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                        >
                          {completedSteps.length === 0 &&
                          step.id === "org-profile"
                            ? "Start"
                            : "Resume"}{" "}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <span className="text-sm font-medium text-slate-400 px-4 py-2">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard content if onboarding is complete
  return (
    <div className="p-8 font-sans text-slate-900">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Organization Setup Complete!
            </h2>
            <p className="text-slate-500">
              Your OneScreen workspace is ready for production. Pick a module
              from the sidebar to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
