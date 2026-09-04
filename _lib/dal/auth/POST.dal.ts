import { CredentialRegister } from "@/_lib/services/auth/auth-index.service";
import type { TRegisterParam } from "@/app/(pages)/auth/api/action/route";
import { zRegisterFormParseSchema } from "@/app/(pages)/auth/z-schema/z-parse.schema";

export const POSTAuthDAL = async ({ key, body }: TRegisterParam) => {
  switch (key) {
    case "register": {
      const parsed = zRegisterFormParseSchema.safeParse(body);

      if (!parsed.success) {
        throw new Error("Invalid request");
      }

      const post = parsed.data;

      return await CredentialRegister({
        name: post.name,
        address: post.address,
        phoneNumber: post.phoneNumber,
        sim: post.sim,
        password: post.password,
        userModel: post.userModel,
        createdAt: post.createdAt,
      });
    }
     default:
      throw new Error("Invalid key");
  }
};
