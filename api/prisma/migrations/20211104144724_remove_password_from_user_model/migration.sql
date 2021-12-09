/*
  Warnings:

  - The `confidenceLevel` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `applicationStage` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ConfidenceLevel" AS ENUM ('UNSELECTED', 'FAIR_ATTEMPT', 'OPTIMISTIC', 'FAIRLY_CONFIDENT', 'CONFIDENT', 'HIGHLY_CONFIDENT');

-- CreateEnum
CREATE TYPE "ApplicationStage" AS ENUM ('SAVED', 'PREPARING', 'APPLIED', 'INTERVIEWING', 'REJECTED', 'ARCHIVED', 'NEGOTIATING', 'OFFER_ACCEPTED', 'OFFER_REJECTED');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "confidenceLevel",
ADD COLUMN     "confidenceLevel" "ConfidenceLevel",
DROP COLUMN "applicationStage",
ADD COLUMN     "applicationStage" "ApplicationStage";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";
