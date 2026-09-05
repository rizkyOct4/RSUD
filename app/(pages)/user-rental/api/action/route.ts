import { NextRequest, NextResponse } from "next/server";
import { ErrorTypes } from "@/_util/types.error";
import { PUTCarReturnDAL } from "@/_lib/dal/user-rental/PUT.dal";

type TKey = "putReturnCarRental";
export type TUserCarReturnParam = {
  key: TKey;
  body: {
    carId: string;
    id: string;
    plateNumber: string;
    returnDate: Date;
  };
};

export async function PUT(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key") as TKey;
    const body = await req.json();

    const result = await PUTCarReturnDAL({ key, body });

    return NextResponse.json(result);
  } catch (err: unknown) {
    return ErrorTypes(err);
  }
}
