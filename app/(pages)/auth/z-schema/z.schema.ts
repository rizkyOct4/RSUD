import { z } from "zod";
import { ForbiddenRegex, ForbiddenRegexEmail } from "@/_util/Regex";

// ! REGEX ini BERURUTAN METHODNYA !!!! PERHATIKAN URUTANNYA !
export const zRegisterFormSchema = z.object({
  name: z
    .string()
    .min(0)
    .max(30, "* Max 30 Characters")
    .refine((val) => !ForbiddenRegex().test(val), {
      message: `* Contains invalid characters`,
    }),
  address: z.string().min(0).max(50, "* Max 50 Characters"),
  phoneNumber: z
    .string()
    .min(8, "* Phone Number must be at least 8 characters"),
  sim: z
    .string()
    .min(8, "* SIM must be at least 8 characters"),
  password: z.string().min(8, "* Password must be at least 8 characters"),
  confirmPassword: z.string(),

  userModel: z.string(),
});

export type RegisterFormSchema = z.infer<typeof zRegisterFormSchema>;

export const zLoginFormSchema = z.object({
  sim: z
    .string(),
  password: z.string().min(1, "Password must be at least 1 characters"),
});
