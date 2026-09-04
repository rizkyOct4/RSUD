import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

export const AnonymousId = async (clientId: string | undefined) => {
  const cookieStore = await cookies();

  if (!clientId) {
    clientId = nanoid();

    return cookieStore.set("register-client-id", clientId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
};

export const Authentication = (
  req: NextRequest,
  pathname: string,
  publicId: string | null | undefined,
) => {
  if (!publicId) {
    return NextResponse.redirect(
      new URL(`/auth?redirect=${encodeURIComponent(pathname)}`, req.url),
    );
  }
  return null;
};

export const UserModelAccess = (
  req: NextRequest,
  pathname: string,
  publicId: string | null | undefined,
  userModel: string | null | undefined,
) => {
  const PROVIDER_ACCESS = new Set(["/user-provider"]);

  const CUSTOMER_ACCESS = new Set(["/user-customer"]);

  let userAccess: Set<string>;

  switch (userModel) {
    case "PROVIDER":
      userAccess = PROVIDER_ACCESS;
      break;

    case "CUSTOMER":
      userAccess = CUSTOMER_ACCESS;
      break;

    default:
      return NextResponse.redirect(new URL("/not-found", req.url));
  }

  const hasAccess = [...userAccess].some((path) => pathname.startsWith(path));

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  return null;
};

export const Forbidden = (
  req: NextRequest,
  clientId: string | undefined,
  publicId: string | null | undefined,
) => {
  const ALLOWED_ORIGINS = new Set([process.env.NEXT_PUBLIC_APP_URL]);
  const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
  const origin = req.headers.get("origin"); // ? HOST SAAT INI !!!

  if (!SAFE_METHODS.has(req.method) && !publicId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  if (origin !== null && !ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  return null;
};
