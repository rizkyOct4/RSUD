import { NextRequest, NextResponse } from "next/server";
import { ErrorTypes } from "@/_util/types.error";
import { GETUserCarRentalDAL } from "@/_lib/dal/user-rental/GET.dal";


type TUserCarRentalKey =
  | "carRental"
export type TUserCarRentalParam =
  | {
      key: "carRental";
      limit: number;
      offset: number;
    };

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const key = searchParams.get("key") as TUserCarRentalKey;

    let params: TUserCarRentalParam;

    switch (key) {
      case "carRental": {
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

    const result = await GETUserCarRentalDAL(params);

    return NextResponse.json(result);
  } catch (err: unknown) {
    return ErrorTypes(err);
  }
}
