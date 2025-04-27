import { Yarn } from "@prisma/client";

export type YarnFormFields = Omit<Yarn, "id">;
