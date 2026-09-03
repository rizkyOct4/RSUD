import { z } from "zod";
import { ForbiddenRegex } from "@/_util/Regex";

export const zPostCarSchema = z.object({
  brand: z
    .string()
    .trim()
    .min(1, "Merek mobil wajib diisi")
    .max(50, "Merek mobil maksimal 50 karakter")
    .refine((val) => !ForbiddenRegex().test(val), {
      message: `* Contains invalid characters`,
    }),

  model: z
    .string()
    .trim()
    .min(1, "Model mobil wajib diisi")
    .max(50, "Model mobil maksimal 50 karakter")
    .refine((val) => !ForbiddenRegex().test(val), {
      message: `* Contains invalid characters`,
    }),

  plateNumber: z
    .string()
    .trim()
    .min(1, "Nomor plat wajib diisi")
    .max(15, "Nomor plat maksimal 15 karakter")
    .regex(
      /^[A-Z]{1,2}\s?\d{1,4}\s?[A-Z]{0,3}$/i,
      "Format nomor plat tidak valid",
    ),

  dailyRate: z
    .string(),
    // .int("Tarif harus berupa angka bulat")
    // .positive("Tarif sewa harus lebih dari 0"),
});

export type PostCarSchema = z.infer<typeof zPostCarSchema>;
