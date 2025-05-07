-- CreateEnum
CREATE TYPE "Craft" AS ENUM ('KNIT', 'CROCHET');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('BABY', 'TODDLER', 'ADULT', 'CUSTOM');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('BABY_HEADWEAR', 'BABY_FOOTWEAR', 'BABY_BLANKET', 'BABY_PLUSH', 'ADULT_HAT', 'ADULT_SCARF', 'MISC');

-- CreateEnum
CREATE TYPE "ShippingTier" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "InventoryStatus" AS ENUM ('AVAILABLE', 'GIFTED', 'IN_STORE', 'SOLD', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Yarn" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "qty" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "craft" "Craft" NOT NULL,
    "category" "Category" NOT NULL,
    "size" "Size" NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "qty" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "recipient" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "InventoryStatus" DEFAULT 'AVAILABLE',
    "shippingTier" "ShippingTier",

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YarnOnInventory" (
    "id" SERIAL NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "yarnId" INTEGER NOT NULL,
    "amountUsed" DOUBLE PRECISION,

    CONSTRAINT "YarnOnInventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Inventory_status_idx" ON "Inventory"("status");

-- CreateIndex
CREATE INDEX "Inventory_category_idx" ON "Inventory"("category");

-- CreateIndex
CREATE INDEX "Inventory_size_idx" ON "Inventory"("size");

-- CreateIndex
CREATE UNIQUE INDEX "YarnOnInventory_inventoryId_yarnId_key" ON "YarnOnInventory"("inventoryId", "yarnId");

-- AddForeignKey
ALTER TABLE "YarnOnInventory" ADD CONSTRAINT "YarnOnInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YarnOnInventory" ADD CONSTRAINT "YarnOnInventory_yarnId_fkey" FOREIGN KEY ("yarnId") REFERENCES "Yarn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
