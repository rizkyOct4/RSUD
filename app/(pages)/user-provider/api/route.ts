import { NextRequest, NextResponse } from "next/server";
// import { GETAuthDAL } from "@/_lib/dal/auth/GET.dal";
import { ErrorTypes } from "@/_util/types.error";
import { GETUserCarProviderDAL } from "@/_lib/dal/user-provider/GET.dal";


type TUserCarProviderKey =
  | "car"
  | "statistics"
  | "carFilterBrand"
  | "carFilterModel"
  | "carFilterBrandAndModel";
export type TUserCarProviderParam =
  | {
      key: "statistics";
    }
  | {
      key: "carFilterBrand";
      brand: string;
      limit: number;
      offset: number;
    }
  // | {
  //     key: "carFilterModel";
  //     model: string;
  //     limit: number;
  //     offset: number;
  //   }
  // | {
  //     key: "carFilterBrandAndModel";
  //     brand: string;
  //     model: string;
  //     limit: number;
  //     offset: number;
  //   }
  | {
      key: "car";
      limit: number;
      offset: number;
    };

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const key = searchParams.get("key") as TUserCarProviderKey;

    let params: TUserCarProviderParam;

    switch (key) {
      case "statistics": {
        params = {
          key,
        };

        break;
      }
      case "carFilterBrand": {
        const brand = searchParams.get("brand") ?? "";
        const pageParam = Number(searchParams.get("page-param"));
        const limit = Number(searchParams.get("limit"));
        const offset = (pageParam - 1) * limit;

        params = {
          key,
          brand,
          limit,
          offset,
        };

        break;
      }
      // case "carFilterModel": {
      //   const model = searchParams.get("model") ?? "";
      //   const pageParam = Number(searchParams.get("page-param"));
      //   const limit = Number(searchParams.get("limit"));
      //   const offset = (pageParam - 1) * limit;

      //   params = {
      //     key,
      //     model,
      //     limit,
      //     offset,
      //   };

      //   break;
      // }
      // case "carFilterBrandAndModel": {
      //   const brand = searchParams.get("brand") ?? "";
      //   const model = searchParams.get("model") ?? "";
      //   const pageParam = Number(searchParams.get("page-param"));
      //   const limit = Number(searchParams.get("limit"));
      //   const offset = (pageParam - 1) * limit;

      //   params = {
      //     key,
      //     brand,
      //     model,
      //     limit,
      //     offset,
      //   };

      //   break;
      // }
      case "car": {
        const pageParam = Number(searchParams.get("page-param"));
        const limit = Number(searchParams.get("limit"));
        const offset = (pageParam - 1) * limit;

        params = {
          key,
          limit,
          offset,
        };

        break;
      }
      default:
        throw new Error("Invalid key");
    }

    const result = await GETUserCarProviderDAL(params);

    return NextResponse.json(result);
  } catch (err: unknown) {
    return ErrorTypes(err);
  }
}
