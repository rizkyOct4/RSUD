import { zPostCarParseSchema } from "@/app/(pages)/user-provider/z-schema/z-parse.schema";
import GetSession from "@/_util/session";
import type { TUserProviderPutParam } from "@/app/(pages)/user-provider/api/action/route";
import { PUTCarReturnService } from "@/_lib/services/user-provider/PUT.service";

export const PUTUserProviderDAL = async ({
  key,
  body,
}: TUserProviderPutParam) => {
  const session = await GetSession();

  if (!session.verified) {
    throw new Error("Unauthorized");
  }

  const { publicId } = session;

  switch (key) {
    case "confirmCarReturn": {
      const { pbId, status, confirmReturnDate } = body;
      const convD = new Date(confirmReturnDate)
      //   const parsed = zPostCarParseSchema.safeParse(body);

      //   if (!parsed.success) {
      //     throw new Error("Invalid request");
      //   }

      //   const put = parsed.data;

      await PUTCarReturnService({
        publicId,
        pbId,
        status,
        confirmReturnDate: convD,
      });

      return {
        message: "Car Return Confirm Success",
      };
    }
    default:
      throw new Error("Invalid key");
  }
};
