import GetSession from "@/_util/session";
import type { TUserCarRentalParam } from "@/app/(pages)/user-rental/api/route";
import { GETUserCarReturn } from "@/_lib/services/user-rental/GET.user-rental.service";

export const GETUserCarRentalDAL = async (params: TUserCarRentalParam) => {
  const { key } = params;

  const session = await GetSession();

  if (!session.verified) {
    throw new Error("Unauthorized");
  }

  const { publicId } = session;

  switch (key) {
    case "carRental": {
        const {limit, offset} = params
      return await GETUserCarReturn({ publicId, limit, offset });
    }
    default:
      throw new Error("Invalid key");
  }
};
