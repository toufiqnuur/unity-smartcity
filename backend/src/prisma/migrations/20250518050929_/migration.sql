/*
  Warnings:

  - You are about to drop the `RedemptionHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('IN', 'OUT', 'ADJUST');

-- DropForeignKey
ALTER TABLE "RedemptionHistory" DROP CONSTRAINT "RedemptionHistory_userId_fkey";

-- DropTable
DROP TABLE "RedemptionHistory";

-- CreateTable
CREATE TABLE "PointTransaction" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "rewardId" INTEGER NOT NULL,
    "trashBinId" TEXT NOT NULL,
    "trashCodeId" INTEGER,
    "type" "TransactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PointTransaction_userId_idx" ON "PointTransaction"("userId");

-- AddForeignKey
ALTER TABLE "PointTransaction" ADD CONSTRAINT "PointTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointTransaction" ADD CONSTRAINT "PointTransaction_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "RewardToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointTransaction" ADD CONSTRAINT "PointTransaction_trashBinId_fkey" FOREIGN KEY ("trashBinId") REFERENCES "TrashBin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointTransaction" ADD CONSTRAINT "PointTransaction_trashCodeId_fkey" FOREIGN KEY ("trashCodeId") REFERENCES "TrashCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
