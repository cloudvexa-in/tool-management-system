import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth/authOptions";
import { prisma } from "@/lib/prisma";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.organizationId) redirect("/login");

  const organization = await prisma.organization.findUnique({
    where: { id: session.user.organizationId },
    select: { name: true, onboardingCompletedAt: true, onboardingStep: true },
  });

  if (!organization?.onboardingCompletedAt) {
    redirect(
      `/onboarding?step=${organization?.onboardingStep ?? "admin-setup"}`,
    );
  }

  return (
    <DashboardShell
      orgName={organization?.name ?? "Organization"}
      userName={session.user.name ?? session.user.email ?? "Account"}
      isAdmin={session.user.isAdmin}
      setupCompleted={Boolean(organization?.onboardingCompletedAt)}
    >
      {children}
    </DashboardShell>
  );
}
