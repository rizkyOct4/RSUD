import { zPostCarParseSchema } from "@/app/(pages)/user-provider/z-schema/z-parse.schema";
import GetSession from "@/_util/session";
import type { TUserProviderParam } from "@/app/(pages)/user-provider/api/action/route";
import { POSTUserProviderCar } from "@/_lib/services/user-provider/POST.user-provider.service";

export const POSTUserProviderDAL = async ({
  key,
  body,
}: TUserProviderParam) => {
  const session = await GetSession();

  if (!session.verified) {
    throw new Error("Unauthorized");
  }

  const { publicId } = session;

  switch (key) {
    case "postCar": {
      const parsed = zPostCarParseSchema.safeParse(body);

      if (!parsed.success) {
        throw new Error("Invalid request");
      }

      const post = parsed.data;

      await POSTUserProviderCar({
        publicId,
        pbId: post.pbId,
        brand: post.brand,
        model: post.model,
        plateNumber: post.plateNumber,
        dailyRate: post.dailyRate,
        createdAt: post.createdAt,
      });

      return {
        message: "Add New Car Rental Success",
      };
    }
    default:
      throw new Error("Invalid key");
  }
};
