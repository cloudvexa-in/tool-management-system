import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { ONBOARDING_STEPS, OnboardingStepId } from "@/config/onboardingSteps";
import OnboardingClient from "./OnboardingClient";

const PRE_AUTH_STEPS: OnboardingStepId[] = ["admin-setup", "org-profile"];

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const { step } = await searchParams;
  const requestedStep = (ONBOARDING_STEPS as readonly string[]).includes(
    step ?? "",
  )
    ? (step as OnboardingStepId)
    : "admin-setup";

  const session = await getServerSession(authOptions);

  if (PRE_AUTH_STEPS.includes(requestedStep)) {
    if (session?.user?.organizationId) {
      const organization = await prisma.organization.findUnique({
        where: { id: session.user.organizationId },
        select: { onboardingCompletedAt: true },
      });
      if (organization?.onboardingCompletedAt) redirect("/dashboard");
    }
  } else {
    if (!session?.user?.organizationId) redirect("/login");

    const organization = await prisma.organization.findUnique({
      where: { id: session.user.organizationId },
      select: { onboardingStep: true, onboardingCompletedAt: true },
    });

    if (organization?.onboardingCompletedAt) redirect("/dashboard");

    const allowedStep = (organization?.onboardingStep ??
      "admin-setup") as OnboardingStepId;
    const allowedIndex = ONBOARDING_STEPS.indexOf(allowedStep);
    const requestedIndex = ONBOARDING_STEPS.indexOf(requestedStep);

    if (requestedIndex > allowedIndex) {
      redirect(`/onboarding?step=${allowedStep}`);
    }
  }

  return <OnboardingClient />;
}
