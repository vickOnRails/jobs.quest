/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "confidenceLevel" TEXT,
    "applicationStage" TEXT,
    "postedAt" TIMESTAMP(3) NOT NULL,
    "expiringAt" TIMESTAMP(3),
    "appliedAt" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "companyWebsite" TEXT,
    "jobLocation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
