/*
  Warnings:

  - Made the column `status` on table `Inventory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "status" SET NOT NULL;
