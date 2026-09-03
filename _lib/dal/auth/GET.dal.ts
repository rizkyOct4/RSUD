import GetSession from "@/_util/session";
import { GETAuthProfile } from "@/_lib/services/auth/get-auth.service";
import { TAuthParam } from "@/app/(pages)/auth/api/route";

export const GETAuthDAL = async ({ key, params }: TAuthParam) => {
  const session = await GetSession();
  const publicId = session?.publicId;

  if (!publicId) {
    throw new Error("Unauthorized");
  }

  switch (key) {
    case "profile": {
      return await GETAuthProfile({ publicId });
    }
    default:
      throw new Error("Invalid key");
  }
};
