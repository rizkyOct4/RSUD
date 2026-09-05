import { z } from "zod";

// ! REGEX ini BERURUTAN METHODNYA !!!! PERHATIKAN URUTANNYA !
export const zRegisterFormParseSchema = z.object({
  name: z.string().trim().max(1000),
  address: z.string().min(0).max(50, "* Max 50 Characters"),
  phoneNumber: z.string().max(50),
  sim: z.string().max(50),
  password: z.string().min(8, "* Password must be at least 8 characters"),
  confirmPassword: z.string(),
  userModel: z.string(),
  createdAt: z.coerce.date(),
});
