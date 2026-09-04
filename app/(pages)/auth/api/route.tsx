import { NextRequest, NextResponse } from "next/server";
import { GETAuthDAL } from "@/_lib/dal/auth/GET.dal";
import { ErrorTypes } from "@/_util/types.error";

type TAuthKey = "profile";
export type TAuthParam = {
  key: TAuthKey;
  params: URLSearchParams;
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const key = searchParams.get("key") as TAuthKey;

    const result = await GETAuthDAL({ key, params: searchParams });

    return NextResponse.json(result);
  } catch (err: unknown) {
    return ErrorTypes(err);
  }
}
