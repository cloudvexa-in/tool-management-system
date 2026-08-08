/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OnboardingStepId =
  | "org-profile"
  | "admin-setup"
  | "rbac-setup"
  | "workflow-builder"
  | "employee-setup";

export interface OnboardingState {
  completedSteps: OnboardingStepId[];
  isFullyCompleted: boolean;
  completeStep: (stepId: OnboardingStepId) => void;
  resetOnboarding: () => void;
  orgData: any;
  setOrgData: (data: any) => void;
}

const REQUIRED_STEPS: OnboardingStepId[] = [
  "org-profile",
  "admin-setup",
  "rbac-setup",
  "workflow-builder",
  "employee-setup",
];

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      completedSteps: [],
      isFullyCompleted: false,
      orgData: {},
      completeStep: (stepId) =>
        set((state) => {
          const newCompleted = state.completedSteps.includes(stepId)
            ? state.completedSteps
            : [...state.completedSteps, stepId];

          const allRequiredDone = REQUIRED_STEPS.every((req) =>
            newCompleted.includes(req),
          );

          return {
            completedSteps: newCompleted,
            isFullyCompleted: allRequiredDone,
          };
        }),
      setOrgData: (data) =>
        set((state) => ({ orgData: { ...state.orgData, ...data } })),
      resetOnboarding: () =>
        set({ completedSteps: [], isFullyCompleted: false, orgData: {} }),
    }),
    {
      name: "onescreen-onboarding-storage",
    },
  ),
);
