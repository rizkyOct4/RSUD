import GetSession from "@/_util/session";
import { TPostDashboardParam } from "@/app/(pages)/(index)/api/action/route";
import { POSTRentCar } from "@/_lib/services/(index)/POST-dashboard.service";

export const POSTDashboardDAL = async ({ key, body }: TPostDashboardParam) => {
  const session = await GetSession();

  if (!session.verified) {
    throw new Error("Unauthorized");
  }

  const { publicId } = session;

  switch (key) {
    case "postRentCar": {
      const { pbId, startDate, endDate, createdAt, totalDays, totalRent } = body;

      await POSTRentCar({
        publicId,
        pbId,
        startDate,
        endDate,
        createdAt,
        totalDays, totalRent
      });

      return {
        message: "Car Rental Success",
      };
    }
    default:
      throw new Error("Invalid key");
  }
};
