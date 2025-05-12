import { Craft, InventoryStatus } from "@prisma/client";
import { z } from "zod";

export const inventorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  craft: z
    .nativeEnum(Craft)
    .refine((val) => val !== undefined, { message: "Craft is required" }),
  category: z.string().min(1, "Category is required"),
  size: z.string().min(1, "Size is required"),
  qty: z.preprocess(
    // Prevent default "Expected number, received nan" error when field is manually cleared
    (val) => (typeof val === "number" && !isNaN(val) ? val : undefined),
    z
      .number({ required_error: "Quantity is required" })
      .min(0.5, "Minimum quantity is 0.5")
  ),
  yarnUsed: z.array(z.string()),
  notes: z.string().optional(),
  status: z.nativeEnum(InventoryStatus).refine((val) => val !== undefined, {
    message: "Status is required",
  }),
  recipient: z.string().optional(),
  value: z.number().min(1, "Minimum value is $1"),
  price: z.number().min(1, "Minimum price is $1"),
  shippingTier: z.string().optional(),
});

export type InventorySchemaType = z.infer<typeof inventorySchema>;
