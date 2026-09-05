import GetSession from "@/_util/session";
import type { TUserCarProviderParam } from "@/app/(pages)/user-provider/api/route";
import {
  GETStatistics,
  GETFilterBrand,
  GETFilterModel,
  GETFilterBrandAndModel,
  GETCarList,
} from "@/_lib/services/user-provider/GET.user-provider.service";

export const GETUserCarProviderDAL = async (params: TUserCarProviderParam) => {
  const { key } = params;

  const session = await GetSession();

  if (!session.verified) {
    throw new Error("Unauthorized");
  }

  const { publicId } = session;

  switch (key) {
    case "statistics": {
      return await GETStatistics({ publicId });
    }
    case "carFilterBrand": {
      const { brand, limit, offset } = params;

      return await GETFilterBrand({ publicId, brand, limit, offset });
    }
    // case "carFilterModel": {
    //   const { model, limit, offset } = params;

    //   return await GETFilterModel({ publicId, model, limit, offset });
    // }
    // case "carFilterBrandAndModel": {
    //   const { brand, model, limit, offset } = params;

    //   return await GETFilterBrandAndModel({
    //     publicId,
    //     brand,
    //     model,
    //     limit,
    //     offset,
    //   });
    // }

    case "car": {
      const { limit, offset } = params;

      return await GETCarList({ publicId, limit, offset });
    }
    default:
      throw new Error("Invalid key");
  }
};
