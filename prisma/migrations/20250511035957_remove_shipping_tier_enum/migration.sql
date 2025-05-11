/*
  Warnings:

  - The `shippingTier` column on the `Inventory` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "shippingTier",
ADD COLUMN     "shippingTier" TEXT;

-- DropEnum
DROP TYPE "ShippingTier";
