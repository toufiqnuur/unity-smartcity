/*
  Warnings:

  - Added the required column `type` to the `PointTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PointTransaction" ADD COLUMN     "type" "TransactionType" NOT NULL;
