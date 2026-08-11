-- AlterTable
ALTER TABLE "Organization"
  ADD COLUMN "onboardingStep" TEXT NOT NULL DEFAULT 'admin-setup',
  ADD COLUMN "onboardingCompletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User"
  ADD COLUMN "mustResetPassword" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Role_organizationId_name_key" ON "Role"("organizationId", "name");
