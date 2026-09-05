import GetSession from "@/_util/session";
import type { TUserCarReturnParam } from "@/app/(pages)/user-rental/api/action/route";
import { PUTCarReturnService } from "@/_lib/services/user-rental/PUT.service";

export const PUTCarReturnDAL = async ({ key, body }: TUserCarReturnParam) => {
  const session = await GetSession();

  if (!session.verified) {
    throw new Error("Unauthorized");
  }

  const { publicId } = session;

  switch (key) {
    case "putReturnCarRental": {
      const { carId, id, plateNumber, returnDate } = body;

      const convD = new Date(returnDate);
      
      await PUTCarReturnService({
        publicId,
        carId,
        id,
        plateNumber,
        returnDate: convD,
      });

      return {
        message: "Return Car Rental Success",
      };
    }
    default:
      throw new Error("Invalid key");
  }
};
