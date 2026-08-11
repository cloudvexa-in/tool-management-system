-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "completedSteps" TEXT[] DEFAULT ARRAY[]::TEXT[];
