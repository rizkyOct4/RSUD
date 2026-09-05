import GetSession from "@/_util/session";
import type { TDashboardParam } from "@/app/(pages)/(index)/api/route";
import { GETDashboardCarList } from "@/_lib/services/(index)/GET-dashboard.service";
import { GETFilterPublicBrand } from "@/_lib/services/user-provider/GET.user-provider.service";

export const GETDashboardDAL = async (params: TDashboardParam) => {
  const { key } = params;

  // const session = await GetSession();

  // if (!session.verified) {
  //   throw new Error("Unauthorized");
  // }

  //   const { publicId } = session;

  switch (key) {
    case "dashboardCar": {
      const { limit, offset } = params;

      return await GETDashboardCarList({ limit, offset });
    }
    case "carFilterBrand": {
      const { brand, limit, offset } = params;

      return await GETFilterPublicBrand({ brand, limit, offset });
    }
    default:
      throw new Error("Invalid key");
  }
};
