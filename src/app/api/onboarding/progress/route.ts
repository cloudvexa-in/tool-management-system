import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";
import { ONBOARDING_STEPS, OnboardingStepId } from "@/config/onboardingSteps";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organization = await prisma.organization.findUnique({
    where: { id: session.user.organizationId },
    select: { completedSteps: true, onboardingCompletedAt: true },
  });

  return NextResponse.json({
    completedSteps: organization?.completedSteps ?? [],
    isFullyCompleted: Boolean(organization?.onboardingCompletedAt),
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const stepId = body?.stepId as OnboardingStepId | undefined;
  if (!stepId || !ONBOARDING_STEPS.includes(stepId)) {
    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  }

  const organization = await prisma.organization.findUnique({
    where: { id: session.user.organizationId },
    select: { completedSteps: true },
  });

  const completedSteps = organization?.completedSteps.includes(stepId)
    ? organization.completedSteps
    : [...(organization?.completedSteps ?? []), stepId];

  await prisma.organization.update({
    where: { id: session.user.organizationId },
    data: { completedSteps, onboardingStep: stepId },
  });

  const isFullyCompleted = ONBOARDING_STEPS.every((req) =>
    completedSteps.includes(req),
  );

  return NextResponse.json({ completedSteps, isFullyCompleted });
}
