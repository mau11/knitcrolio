import { z } from "zod";

export const yarnSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  yarnType: z.string().min(1, "Yarn type is required"),
  color: z.string().min(1, "Color is required"),
  colorFamily: z.string().min(1, "Color family is required"),
  weight: z.string().min(1, "Weight is required"),
  material: z.string().min(1, "Material is required"),
  care: z.string().optional(),
  skeinWeight: z.string().optional(),
  qty: z.preprocess(
    // Prevent default "Expected number, received nan" error when field is manually cleared
    (val) => (typeof val === "number" && !isNaN(val) ? val : undefined),
    z
      .number({ required_error: "Quantity is required" })
      .min(0.5, "Minimum quantity is 0.5")
  ),
  notes: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type YarnSchemaType = z.infer<typeof yarnSchema>;
