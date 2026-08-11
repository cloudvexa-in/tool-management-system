/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import VisualWorkflowBuilder from "@/components/VisualWorkflowBuilder";
import { NODE_TYPE_TO_MODULE_KEY } from "@/config/dashboardModules";
import {
  OnboardingStepId,
  useOnboardingStore,
} from "@/store/useOnboardingStore";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  GitMerge,
  ShieldCheck,
  UploadCloud,
  Users,
} from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const stepsConfig = [
  { id: "admin-setup", name: "Administrator Setup", icon: Users },
  { id: "org-profile", name: "Organization Profile", icon: Building2 },
  { id: "rbac-setup", name: "Role Hierarchy", icon: ShieldCheck },
  { id: "workflow-builder", name: "Process & Machine Layout", icon: GitMerge },
  { id: "employee-setup", name: "Employee Import", icon: UploadCloud },
];

function OnboardingForms() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stepId = (searchParams.get("step") ||
    "admin-setup") as OnboardingStepId;
  const { completeStep, orgData, setOrgData } = useOnboardingStore();
  const [isSubmittingStep, setIsSubmittingStep] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const handleNext = async (nextStepId?: OnboardingStepId) => {
    setStepError(null);

    if (stepId === "org-profile") {
      if (!orgData.password || orgData.password !== orgData.confirmPassword) {
        setStepError("Passwords don't match.");
        return;
      }
      if (!orgData.companyName) {
        setStepError("Company name is required.");
        return;
      }

      setIsSubmittingStep(true);
      try {
        const response = await fetch("/api/organizations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orgName: orgData.companyName,
            industry: orgData.industry,
            size: orgData.size,
            region: orgData.region,
            adminName: orgData.adminName,
            adminEmail: orgData.adminEmail,
            password: orgData.password,
          }),
        });

        if (!response.ok) {
          const responseBody = await response.json().catch(() => null);
          setStepError(responseBody?.error ?? "Could not create your account.");
          return;
        }

        const signInResult = await signIn("credentials", {
          email: orgData.adminEmail,
          password: orgData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          setStepError(
            "Account created, but sign-in failed. Please try logging in.",
          );
          return;
        }
      } finally {
        setIsSubmittingStep(false);
      }
    }

    if (stepId === "rbac-setup") {
      setIsSubmittingStep(true);
      try {
        const response = await fetch("/api/onboarding/roles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roles: (orgData.roles || []).map((r: any) => ({
              name: r.name,
              permissionKeys: r.permissions,
            })),
          }),
        });
        if (!response.ok) {
          setStepError("Could not save roles.");
          return;
        }
      } finally {
        setIsSubmittingStep(false);
      }
    }

    if (stepId === "workflow-builder") {
      const nodes: any[] = orgData.workflowNodes || [];
      const enabledModules = Array.from(
        new Set(
          nodes
            .map((n) => NODE_TYPE_TO_MODULE_KEY[n.type as string])
            .filter(Boolean),
        ),
      );

      setIsSubmittingStep(true);
      try {
        const response = await fetch("/api/onboarding/modules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enabledModules,
            graph: {
              nodes: orgData.workflowNodes,
              edges: orgData.workflowEdges,
            },
          }),
        });
        if (!response.ok) {
          setStepError("Could not save process layout.");
          return;
        }
      } finally {
        setIsSubmittingStep(false);
      }
    }

    if (stepId === "employee-setup") {
      setIsSubmittingStep(true);
      try {
        if ((orgData.employees || []).length > 0) {
          const response = await fetch("/api/onboarding/employees", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employees: orgData.employees }),
          });
          if (!response.ok) {
            setStepError("Could not import employees.");
            return;
          }
        }

        const completeResponse = await fetch("/api/onboarding/complete", {
          method: "POST",
        });
        if (!completeResponse.ok) {
          setStepError("Could not complete onboarding.");
          return;
        }
      } finally {
        setIsSubmittingStep(false);
      }
    }

    if (stepId !== "admin-setup") {
      await fetch("/api/onboarding/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId }),
      }).catch(() => {});
    }
    completeStep(stepId);
    if (nextStepId) {
      router.push(`/onboarding?step=${nextStepId}`);
    } else {
      router.push("/dashboard");
    }
  };

  const handleSaveExit = () => {
    router.push("/dashboard");
  };

  const activeStep = stepsConfig.find((s) => s.id === stepId) || stepsConfig[0];
  const currentIndex = stepsConfig.findIndex((s) => s.id === stepId);
  const nextStepId =
    currentIndex < stepsConfig.length - 1
      ? (stepsConfig[currentIndex + 1].id as OnboardingStepId)
      : undefined;
  const prevStepId =
    currentIndex > 0
      ? (stepsConfig[currentIndex - 1].id as OnboardingStepId)
      : undefined;

  const handleBack = () => {
    if (prevStepId) {
      router.push(`/onboarding?step=${prevStepId}`);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#FAFAFA] font-sans text-slate-900 overflow-hidden">
      {/* Header - No background, no border, flex-none */}
      <div className="flex-none px-8 py-5">
        <div className="flex items-center text-xs text-slate-400 mb-1 font-medium">
          <Link
            href="/dashboard"
            className="hover:text-indigo-600 transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="h-3 w-3 mx-1" />
          <span>Onboarding</span>
          <ChevronRight className="h-3 w-3 mx-1" />
          <span className="text-slate-800">{activeStep.name}</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 flex items-center gap-2">
          {activeStep.name}
        </h1>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-grow overflow-y-auto">
        {stepId === "workflow-builder" ? (
          <div className="h-full w-full">
            <VisualWorkflowBuilder data={orgData} updateData={setOrgData} />
          </div>
        ) : (
          <div className="w-full px-8 pb-12 space-y-6 max-w-none">
            {stepId === "admin-setup" && (
              <AdminSetupForm data={orgData} updateData={setOrgData} />
            )}
            {stepId === "org-profile" && (
              <OrgProfileForm data={orgData} updateData={setOrgData} />
            )}
            {stepId === "rbac-setup" && (
              <RbacSetupForm data={orgData} updateData={setOrgData} />
            )}
            {stepId === "employee-setup" && (
              <EmployeeSetupForm data={orgData} updateData={setOrgData} />
            )}
          </div>
        )}
      </div>

      {/* Footer - Fixed at bottom, just border top */}
      <div className="flex-none w-full border-t border-slate-200 px-8 py-4 bg-[#FAFAFA] flex justify-between items-center z-50">
        <button
          onClick={handleSaveExit}
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          Save & Exit
        </button>
        <div className="flex items-center gap-3">
          {stepError && (
            <p className="text-sm font-medium text-red-600">{stepError}</p>
          )}
          {prevStepId && (
            <button
              onClick={handleBack}
              className="inline-flex items-center justify-center rounded bg-white border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              Back
            </button>
          )}
          <button
            onClick={() => handleNext(nextStepId)}
            disabled={isSubmittingStep}
            className="inline-flex items-center justify-center rounded bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-all shadow-sm disabled:opacity-60"
          >
            {isSubmittingStep
              ? "Saving…"
              : nextStepId
                ? "Save & Continue"
                : "Complete Onboarding"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingClient() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-[#FAFAFA] flex items-center justify-center">
          <p className="text-sm font-medium text-slate-500">Loading...</p>
        </div>
      }
    >
      <OnboardingForms />
    </Suspense>
  );
}

// ----------------------------------------------------------------------
// FORM COMPONENTS
// ----------------------------------------------------------------------

const Input = ({ label, type = "text", placeholder, value, onChange }: any) => (
  <div>
    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all bg-white"
    />
  </div>
);

const Select = ({ label, options, value, onChange }: any) => (
  <div>
    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
      {label}
    </label>
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all bg-white"
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((o: any) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

const Card = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => (
  <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
    {title && (
      <div className="px-5 py-3 border-b border-slate-100">
        <h3 className="font-medium text-slate-800 text-sm">{title}</h3>
      </div>
    )}
    <div className="p-5">{children}</div>
  </div>
);

function OrgProfileForm({ data, updateData }: any) {
  const h = (k: string) => (v: any) => updateData({ [k]: v });
  return (
    <div className="space-y-6">
      <Card title="Company Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Input
            label="Company Name"
            placeholder="Acme Corp"
            value={data.companyName}
            onChange={h("companyName")}
          />
          <Input
            label="Tax ID / Registration No."
            placeholder="XX-XXXXXXX"
            value={data.taxId}
            onChange={h("taxId")}
          />
          <Select
            label="Industry Sector"
            value={data.industry}
            onChange={h("industry")}
            options={[
              { label: "Automotive", value: "automotive" },
              { label: "Aerospace", value: "aerospace" },
              { label: "General Manufacturing", value: "general" },
            ]}
          />
          <Select
            label="Company Size"
            value={data.size}
            onChange={h("size")}
            options={[
              { label: "1-50 Employees", value: "small" },
              { label: "51-200 Employees", value: "medium" },
              { label: "200+ Employees", value: "large" },
            ]}
          />
        </div>
      </Card>
      <Card title="Location & Contact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Input
            label="Primary Contact Phone"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={h("phone")}
          />
          <Select
            label="Operating Region"
            value={data.region}
            onChange={h("region")}
            options={[
              { label: "North America (NA)", value: "na" },
              { label: "Europe (EU)", value: "eu" },
              { label: "Asia Pacific (APAC)", value: "apac" },
            ]}
          />
          <div className="md:col-span-2">
            <Input
              label="Company Address"
              placeholder="123 Industrial Parkway, City, State, Zip"
              value={data.address}
              onChange={h("address")}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

function AdminSetupForm({ data, updateData }: any) {
  const h = (k: string) => (v: any) => updateData({ [k]: v });
  return (
    <div className="space-y-6">
      <Card title="Primary Administrator">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Input
            label="Admin Full Name"
            placeholder="John Doe"
            value={data.adminName}
            onChange={h("adminName")}
          />
          <Input
            type="email"
            label="Admin Contact Email"
            placeholder="john@example.com"
            value={data.adminEmail}
            onChange={h("adminEmail")}
          />
        </div>
      </Card>
      <Card title="Login Credentials">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Input
            type="password"
            label="Password"
            placeholder="At least 8 characters"
            value={data.password}
            onChange={h("password")}
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Re-enter password"
            value={data.confirmPassword}
            onChange={h("confirmPassword")}
          />
          {data.confirmPassword && data.password !== data.confirmPassword && (
            <p className="md:col-span-2 text-xs font-medium text-red-600">
              Passwords don&apos;t match.
            </p>
          )}
        </div>
      </Card>
      <Card title="Account Security">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <Input
            type="email"
            label="Account Recovery Email"
            placeholder="recovery@example.com"
            value={data.recoveryEmail}
            onChange={h("recoveryEmail")}
          />
          <Input
            label="Recovery Phone Number"
            placeholder="+1 (555) 000-0000"
            value={data.recoveryPhone}
            onChange={h("recoveryPhone")}
          />
        </div>
      </Card>
    </div>
  );
}

function RbacSetupForm({ data, updateData }: any) {
  const [permissions, setPermissions] = useState<
    { key: string; moduleKey: string; label: string }[]
  >([]);
  const [roles, setRoles] = useState<{ name: string; permissions: string[] }[]>(
    data.roles || [
      { name: "Manager", permissions: [] },
      { name: "Operator", permissions: [] },
    ],
  );
  const [newRole, setNewRole] = useState("");
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  useEffect(() => {
    fetch("/api/permissions")
      .then((res) => res.json())
      .then((body) => setPermissions(body.permissions || []))
      .catch(() => setPermissions([]));
  }, []);

  const addRole = () => {
    if (!newRole.trim()) return;
    const updated = [...roles, { name: newRole, permissions: [] }];
    setRoles(updated);
    updateData({ roles: updated });
    setNewRole("");
    setActiveRoleIndex(updated.length - 1);
  };

  const removeRole = (index: number) => {
    const updated = roles.filter((_, i) => i !== index);
    setRoles(updated);
    updateData({ roles: updated });
    if (activeRoleIndex >= index)
      setActiveRoleIndex(Math.max(0, activeRoleIndex - 1));
  };

  const togglePermission = (roleIndex: number, permKey: string) => {
    const role = roles[roleIndex];
    const hasPerm = role.permissions.includes(permKey);
    let newPerms = [...role.permissions];
    if (hasPerm) {
      newPerms = newPerms.filter((p) => p !== permKey);
    } else {
      newPerms.push(permKey);
    }

    const updated = [...roles];
    updated[roleIndex] = { ...role, permissions: newPerms };
    setRoles(updated);
    updateData({ roles: updated });
  };

  return (
    <div className="space-y-6">
      <Card title="Roles & Permissions">
        <p className="text-sm text-slate-500 mb-6">
          Create structural roles and assign them specific system permissions.
        </p>

        <div className="flex gap-2 mb-6 border-b border-slate-200 pb-6">
          <input
            type="text"
            placeholder="E.g. Quality Inspector"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-64 rounded border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          <button
            onClick={addRole}
            type="button"
            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-indigo-700"
          >
            Add Role
          </button>
        </div>

        {roles.length > 0 ? (
          <div className="flex gap-6">
            {/* Roles List */}
            <div className="w-1/3 border border-slate-200 rounded overflow-hidden flex flex-col h-64">
              {roles.map((r, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveRoleIndex(idx)}
                  className={`flex justify-between items-center p-3 border-b border-slate-100 last:border-0 cursor-pointer ${activeRoleIndex === idx ? "bg-indigo-50 border-l-2 border-l-indigo-600" : "hover:bg-slate-50"}`}
                >
                  <span
                    className={`text-sm ${activeRoleIndex === idx ? "font-semibold text-indigo-900" : "font-medium text-slate-700"}`}
                  >
                    {r.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRole(idx);
                    }}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Permissions View */}
            <div className="w-2/3 bg-slate-50 border border-slate-200 rounded p-4 h-64 overflow-y-auto">
              <h4 className="text-sm font-semibold text-slate-800 mb-3">
                Permissions for {roles[activeRoleIndex]?.name}
              </h4>
              <div className="space-y-2">
                {permissions.map((perm) => {
                  const isAssigned = roles[
                    activeRoleIndex
                  ]?.permissions.includes(perm.key);
                  return (
                    <div
                      key={perm.key}
                      className="flex items-start gap-3 p-2 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                      onClick={() =>
                        togglePermission(activeRoleIndex, perm.key)
                      }
                    >
                      <div
                        className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center border ${isAssigned ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-white"}`}
                      >
                        {isAssigned && (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {perm.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-slate-400 border border-dashed border-slate-300 rounded">
            No roles defined yet. Add a role to configure permissions.
          </div>
        )}
      </Card>
    </div>
  );
}

function EmployeeSetupForm({ data, updateData }: any) {
  const employees: { name: string; email: string; roleName: string }[] =
    data.employees || [];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
      const rows = lines.slice(1); // skip header row
      const parsed = rows
        .map((line) => {
          const [name, email, roleName] = line.split(",").map((v) => v.trim());
          return { name, email, roleName };
        })
        .filter((r) => r.name && r.email && r.roleName);
      updateData({ employees: parsed });
    };
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const csv = "name,email,role\nJohn Doe,john@example.com,Manager\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employee-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card title="Import Employee Roster">
        <p className="text-sm text-slate-500 mb-6">
          Upload a CSV file containing your employee roster. Please use the
          exact role names you defined in the Role Hierarchy step to ensure
          proper mapping.
        </p>

        <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-300 rounded bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer mb-6">
          <UploadCloud className="h-10 w-10 text-slate-400 mb-3" />
          <p className="text-sm font-medium text-slate-800">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Accepts .CSV format only
          </p>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFile}
          />
        </label>

        {employees.length > 0 && (
          <div className="mb-6 border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <tr>
                  <th className="text-left px-3 py-2">Name</th>
                  <th className="text-left px-3 py-2">Email</th>
                  <th className="text-left px-3 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-100">
                    <td className="px-3 py-2">{row.name}</td>
                    <td className="px-3 py-2">{row.email}</td>
                    <td className="px-3 py-2">{row.roleName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={downloadTemplate}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
          >
            Download CSV Template
          </button>
        </div>
      </Card>
    </div>
  );
}
