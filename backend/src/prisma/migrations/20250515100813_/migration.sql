/*
  Warnings:

  - You are about to drop the `WasteTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WasteType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WasteTransaction" DROP CONSTRAINT "WasteTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "WasteTransaction" DROP CONSTRAINT "WasteTransaction_wasteTypeId_fkey";

-- DropTable
DROP TABLE "WasteTransaction";

-- DropTable
DROP TABLE "WasteType";

-- CreateTable
CREATE TABLE "RedemptionHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "wasteType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedemptionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RedemptionHistory_userId_idx" ON "RedemptionHistory"("userId");

-- AddForeignKey
ALTER TABLE "RedemptionHistory" ADD CONSTRAINT "RedemptionHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
