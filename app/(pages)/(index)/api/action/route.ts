import { NextRequest, NextResponse } from "next/server";
import { ErrorTypes } from "@/_util/types.error";
import { POSTDashboardDAL } from "@/_lib/dal/(index)/POST.dal";

type TKey = "postRentCar";
export type TPostDashboardParam = {
  key: TKey;
  body: {
    pbId: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    totalDays: number;
    totalRent: number;
  };
};

export async function POST(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key") as TKey;
    const body = await req.json();

    const result = await POSTDashboardDAL({ key, body });

    return NextResponse.json(result);
  } catch (err: unknown) {
    return ErrorTypes(err);
  }
}
