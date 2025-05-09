import {
  Craft,
  Size,
  Category,
  ShippingTier,
  InventoryStatus,
} from "@prisma/client";

type LabeledEnum<T> = { value: T; label: string };

export const craftOptions: LabeledEnum<Craft>[] = [
  { value: "KNIT", label: "Knit" },
  { value: "CROCHET", label: "Crochet" },
];

export const sizeOptions: LabeledEnum<Size>[] = [
  { value: "BABY", label: "Baby" },
  { value: "TODDLER", label: "Toddler" },
  { value: "ADULT", label: "Adult" },
  { value: "CUSTOM", label: "Custom" },
];

export const categoryOptions: LabeledEnum<Category>[] = [
  { value: "BABY_HEADWEAR", label: "Baby Headwear" },
  { value: "BABY_FOOTWEAR", label: "Baby Footwear" },
  { value: "BABY_BLANKET", label: "Baby Blanket" },
  { value: "BABY_PLUSH", label: "Baby Plush" },
  { value: "ADULT_HAT", label: "Adult Hat" },
  { value: "ADULT_SCARF", label: "Adult Scarf" },
  { value: "MISC", label: "Miscellaneous" },
];

export const shippingTierOptions: LabeledEnum<ShippingTier>[] = [
  { value: "SMALL", label: "Small" },
  { value: "MEDIUM", label: "Medium" },
  { value: "LARGE", label: "Large" },
];

export const inventoryStatusOptions: LabeledEnum<InventoryStatus>[] = [
  { value: "AVAILABLE", label: "Available" },
  { value: "GIFTED", label: "Gifted" },
  { value: "IN_STORE", label: "In Store" },
  { value: "SOLD", label: "Sold" },
  { value: "ARCHIVED", label: "Archived" },
];
