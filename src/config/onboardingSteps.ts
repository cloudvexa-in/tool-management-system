export const ONBOARDING_STEPS = [
  "admin-setup",
  "org-profile",
  "rbac-setup",
  "workflow-builder",
  "employee-setup",
] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEPS)[number];
