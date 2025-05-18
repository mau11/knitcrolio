import { Inventory } from "@prisma/index";

type InventoryWithoutId = Omit<Inventory, "id" | "createdAt" | "updatedAt">;

export type InventoryExportRow = Omit<InventoryWithoutId, "value" | "price"> & {
  value: number;
  price: number;
};
