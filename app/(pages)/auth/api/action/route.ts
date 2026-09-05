import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { ErrorTypes } from "@/_util/types.error";
import { POSTAuthDAL } from "@/_lib/dal/auth/POST.dal";

type TKey = "register";
export type TRegisterParam = {
  key: TKey;
  body: {
    name: string;
    address: string;
    phoneNumber: string;
    sim: string;
    password: string;
    confirmPassword: string;
    userModel: string;
    createdAt: Date;
  };
};

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    let clientId: string | undefined =
      cookieStore.get("register-client-id")?.value;

    const isNewClient = !clientId;

    if (!clientId) {
      clientId = nanoid();
    }

    const key = req.nextUrl.searchParams.get("key") as TKey;
    const body = await req.json();

    const result = await POSTAuthDAL({ key, body });

    const response = NextResponse.json(result);

    if (isNewClient) {
      response.cookies.set("register-client-id", clientId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return response;
  } catch (err: unknown) {
    return ErrorTypes(err);
  }
}
