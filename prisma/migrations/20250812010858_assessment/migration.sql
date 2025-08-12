/*
  Warnings:

  - You are about to drop the column `description` on the `Symptom` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Symptom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Symptom" DROP COLUMN "description",
DROP COLUMN "notes";

-- CreateTable
CREATE TABLE "public"."PcosAssessment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pcos" TEXT,
    "follicleR" DOUBLE PRECISION,
    "follicleL" DOUBLE PRECISION,
    "skinDarkening" TEXT,
    "hairGrowth" TEXT,
    "weightGain" TEXT,
    "cycle" TEXT,
    "fastFood" TEXT,
    "pimples" TEXT,
    "amh" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "score" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PcosAssessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PcosAssessment" ADD CONSTRAINT "PcosAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
