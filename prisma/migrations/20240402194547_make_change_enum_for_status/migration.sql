/*
  Warnings:

  - Changed the type of `status` on the `AdoptionRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AdoptionRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "AdoptionRequest" DROP COLUMN "status",
ADD COLUMN     "status" "AdoptionRequestStatus" NOT NULL;
