-- CreateTable
CREATE TABLE "RedeemToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedeemToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RedeemToken_token_key" ON "RedeemToken"("token");

-- AddForeignKey
ALTER TABLE "RedeemToken" ADD CONSTRAINT "RedeemToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
