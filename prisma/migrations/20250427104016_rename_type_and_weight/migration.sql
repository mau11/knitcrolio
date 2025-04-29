/*
  Warnings:

  - You are about to drop the column `lot` on the `Yarn` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Yarn` table. All the data in the column will be lost.
  - Added the required column `yarnType` to the `Yarn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Yarn" DROP COLUMN "lot",
DROP COLUMN "type",
ADD COLUMN     "skeinWeight" TEXT,
ADD COLUMN     "yarnType" TEXT NOT NULL;
