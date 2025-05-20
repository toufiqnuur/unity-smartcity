/*
  Warnings:

  - You are about to drop the column `rewardId` on the `PointTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `trashBinId` on the `PointTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `trashCodeId` on the `PointTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `PointTransaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PointTransaction" DROP CONSTRAINT "PointTransaction_rewardId_fkey";

-- DropForeignKey
ALTER TABLE "PointTransaction" DROP CONSTRAINT "PointTransaction_trashBinId_fkey";

-- DropForeignKey
ALTER TABLE "PointTransaction" DROP CONSTRAINT "PointTransaction_trashCodeId_fkey";

-- AlterTable
ALTER TABLE "PointTransaction" DROP COLUMN "rewardId",
DROP COLUMN "trashBinId",
DROP COLUMN "trashCodeId",
DROP COLUMN "type";

-- CreateTable
CREATE TABLE "PointTransactionDetail" (
    "id" SERIAL NOT NULL,
    "pointTransactionId" INTEGER NOT NULL,
    "rewardTokenId" INTEGER,
    "trashBinId" TEXT NOT NULL,
    "trashCodeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointTransactionDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PointTransactionDetail" ADD CONSTRAINT "PointTransactionDetail_pointTransactionId_fkey" FOREIGN KEY ("pointTransactionId") REFERENCES "PointTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointTransactionDetail" ADD CONSTRAINT "PointTransactionDetail_trashBinId_fkey" FOREIGN KEY ("trashBinId") REFERENCES "TrashBin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointTransactionDetail" ADD CONSTRAINT "PointTransactionDetail_trashCodeId_fkey" FOREIGN KEY ("trashCodeId") REFERENCES "TrashCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointTransactionDetail" ADD CONSTRAINT "PointTransactionDetail_rewardTokenId_fkey" FOREIGN KEY ("rewardTokenId") REFERENCES "RewardToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;
