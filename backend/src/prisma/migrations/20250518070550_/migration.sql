/*
  Warnings:

  - Added the required column `title` to the `PointExchangeTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PointExchangeTemplate" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
