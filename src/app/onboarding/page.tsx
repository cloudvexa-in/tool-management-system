"use client";

import { useState } from "react";

import Stepper from "@/components/onboarding/Stepper";
import OrganizationDetails from "@/components/onboarding/OrganizationDetails";
import EmployeesRoles from "@/components/onboarding/EmployeesRoles";
import VisualBuilder from "@/components/onboarding/VisualBuilder";
import Review from "@/components/onboarding/Review";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              Tool Management System
            </h1>
            <p className="text-sm text-gray-500">
              Tenant Setup & Calibration (Admin Portal)
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-12">
        <h2 className="text-4xl font-bold text-gray-900">
          Organization Onboarding
        </h2>

        <p className="mt-3 text-gray-600">
          Complete the onboarding process to configure your manufacturing
          organization.
        </p>

        {/* Stepper */}
        <div className="mt-10">
          <Stepper currentStep={currentStep} />
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <OrganizationDetails onNext={() => setCurrentStep(2)} />
        )}

        {currentStep === 2 && (
          <EmployeesRoles
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <VisualBuilder
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 4 && <Review onBack={() => setCurrentStep(3)} />}
      </div>
    </main>
  );
}
