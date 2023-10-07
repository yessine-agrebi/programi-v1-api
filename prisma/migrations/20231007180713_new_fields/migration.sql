-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "isBestSet" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "bestSetId" INTEGER;
