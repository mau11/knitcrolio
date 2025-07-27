/*
  Warnings:

  - Added the required column `userId` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Yarn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Yarn" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Inventory_userId_idx" ON "Inventory"("userId");

-- CreateIndex
CREATE INDEX "Yarn_userId_idx" ON "Yarn"("userId");

-- AddForeignKey
ALTER TABLE "Yarn" ADD CONSTRAINT "Yarn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
