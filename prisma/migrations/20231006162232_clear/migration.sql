/*
  Warnings:

  - Added the required column `setNum` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Made the column `date` on table `Workout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "setNum" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "date" SET NOT NULL;
