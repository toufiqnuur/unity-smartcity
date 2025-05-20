/*
  Warnings:

  - You are about to drop the column `collectedAt` on the `TrashInfo` table. All the data in the column will be lost.
  - Added the required column `name` to the `TrashInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrashInfo" DROP COLUMN "collectedAt",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
