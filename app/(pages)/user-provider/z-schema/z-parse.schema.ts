import { z } from "zod";

export const zPostCarParseSchema = z.object({
  brand: z
    .string()
    .trim()
    .min(1, "* Brand is required")
    .max(50, "* Max 50 Characters"),

  model: z
    .string()
    .trim()
    .min(1, "* Model is required")
    .max(50, "* Max 50 Characters"),

  plateNumber: z
    .string()
    .trim()
    .min(1, "* Plate Number is required")
    .max(15, "* Max 15 Characters"),

  dailyRate: z.coerce.number().int().positive(),
  createdAt: z.coerce.date(),
  pbId: z.string(),
});
