-- DropIndex
DROP INDEX "RefreshToken_token_key";

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "token" DROP NOT NULL;
