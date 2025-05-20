/*
  Warnings:

  - The primary key for the `RewardToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `RewardToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TrashBin` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "RewardToken" DROP CONSTRAINT "RewardToken_trashBinId_fkey";

-- AlterTable
ALTER TABLE "RewardToken" DROP CONSTRAINT "RewardToken_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "trashBinId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RewardToken_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TrashBin" DROP CONSTRAINT "TrashBin_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TrashBin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TrashBin_id_seq";

-- AddForeignKey
ALTER TABLE "RewardToken" ADD CONSTRAINT "RewardToken_trashBinId_fkey" FOREIGN KEY ("trashBinId") REFERENCES "TrashBin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
