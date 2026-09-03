import { NextRequest, NextResponse } from "next/server";
import { ErrorTypes } from "@/_util/types.error";
import { POSTUserProviderDAL } from "@/_lib/dal/user-provider/POST.dal";

type TKey = "postCar";
export type TUserProviderParam = {
  key: TKey;
  body: {
    pbId: string;
    brand: string;
    model: string;
    plateNumber: string;
    dailyRate: string;
    createdAt: Date;
  };
};

export async function POST(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key") as TKey;
    const body = await req.json();

    const result = await POSTUserProviderDAL({ key, body });

    return NextResponse.json(result);
  } catch (err: unknown) {
    return ErrorTypes(err);
  }
}
