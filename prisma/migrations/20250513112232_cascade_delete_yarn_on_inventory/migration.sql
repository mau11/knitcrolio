-- DropForeignKey
ALTER TABLE "YarnOnInventory" DROP CONSTRAINT "YarnOnInventory_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "YarnOnInventory" DROP CONSTRAINT "YarnOnInventory_yarnId_fkey";

-- AddForeignKey
ALTER TABLE "YarnOnInventory" ADD CONSTRAINT "YarnOnInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YarnOnInventory" ADD CONSTRAINT "YarnOnInventory_yarnId_fkey" FOREIGN KEY ("yarnId") REFERENCES "Yarn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
