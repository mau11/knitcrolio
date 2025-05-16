import { Yarn } from "@prisma/index";

export type YarnWithoutId = Omit<Yarn, "id" | "createdAt" | "updatedAt">;
