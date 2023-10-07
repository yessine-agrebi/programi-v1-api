/*
  Warnings:

  - You are about to drop the column `bestSetId` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "bestSetId" INTEGER;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "bestSetId";
