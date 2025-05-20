/*
  Warnings:

  - You are about to drop the `RedeemToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RedeemToken" DROP CONSTRAINT "RedeemToken_userId_fkey";

-- DropTable
DROP TABLE "RedeemToken";

-- CreateTable
CREATE TABLE "TrashCode" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "type" TEXT,
    "redeemAt" TIMESTAMP(3),
    "merchantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrashCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardToken" (
    "id" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "rewardHash" TEXT NOT NULL,
    "userId" TEXT,
    "trashBinId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "redeemedAt" TIMESTAMP(3),

    CONSTRAINT "RewardToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrashCode_token_key" ON "TrashCode"("token");

-- AddForeignKey
ALTER TABLE "RewardToken" ADD CONSTRAINT "RewardToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardToken" ADD CONSTRAINT "RewardToken_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "TrashCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardToken" ADD CONSTRAINT "RewardToken_trashBinId_fkey" FOREIGN KEY ("trashBinId") REFERENCES "TrashBin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
