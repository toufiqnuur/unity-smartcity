-- DropForeignKey
ALTER TABLE "RedeemToken" DROP CONSTRAINT "RedeemToken_userId_fkey";

-- AlterTable
ALTER TABLE "RedeemToken" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RedeemToken" ADD CONSTRAINT "RedeemToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
