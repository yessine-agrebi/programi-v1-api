/*
  Warnings:

  - Added the required column `date` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "startDate" SET DATA TYPE DATE,
ALTER COLUMN "endDate" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN "date" DATE NOT NULL;
ALTER TABLE "Workout" ALTER COLUMN "date" DROP NOT NULL;
ALTER TABLE "Program" ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL;


