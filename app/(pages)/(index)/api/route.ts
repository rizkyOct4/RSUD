import { NextRequest, NextResponse } from "next/server";
import { ErrorTypes } from "@/_util/types.error";
import { GETDashboardDAL } from "@/_lib/dal/(index)/GET.dal";

type TDashboardKey = "dashboardCar";
export type TDashboardParam = {
  key: "dashboardCar";
  limit: number;
  offset: number;
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const key = searchParams.get("key") as TDashboardKey;

    let params: TDashboardParam;

    switch (key) {
      case "dashboardCar": {
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

    const result = await GETDashboardDAL(params);

    return NextResponse.json(result);
  } catch (err: unknown) {
    return ErrorTypes(err);
  }
}
