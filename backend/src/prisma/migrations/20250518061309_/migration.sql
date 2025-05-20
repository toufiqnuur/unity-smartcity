/*
  Warnings:

  - You are about to drop the column `redeemAt` on the `TrashCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TrashCode" DROP COLUMN "redeemAt",
ADD COLUMN     "redeemedAt" TIMESTAMP(3);
