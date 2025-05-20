-- CreateEnum
CREATE TYPE "RewardRedemptionType" AS ENUM ('EWALLET');

-- CreateEnum
CREATE TYPE "RewardRedemptionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "RewardRedemption" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "RewardRedemptionType" NOT NULL,
    "provider" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "RewardRedemptionStatus" NOT NULL DEFAULT 'PENDING',
    "target" TEXT,
    "referenceCode" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "RewardRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointExchangeTemplate" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointExchangeTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PointExchangeTemplate_type_point_key" ON "PointExchangeTemplate"("type", "point");

-- AddForeignKey
ALTER TABLE "RewardRedemption" ADD CONSTRAINT "RewardRedemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
