/*
  Warnings:

  - You are about to drop the `TrashInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TrashBinStatus" AS ENUM ('ONLINE', 'FULL', 'ERROR', 'OFFLINE');

-- DropTable
DROP TABLE "TrashInfo";

-- CreateTable
CREATE TABLE "TrashBin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TrashBinStatus" NOT NULL DEFAULT 'OFFLINE',
    "location" TEXT,
    "description" TEXT,
    "latitude" DECIMAL(10,8) NOT NULL,
    "longitude" DECIMAL(10,8) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrashBin_pkey" PRIMARY KEY ("id")
);
