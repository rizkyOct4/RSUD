import { NextRequest, NextResponse } from "next/server";
import GetSession from "./_util/session";
import { cookies } from "next/headers";
import { Authentication, Forbidden } from "./_lib/proxy";

const proxy = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const pathname = req.nextUrl.pathname;

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const clientId = cookieStore.get("register-client-id")?.value;

  const publicPaths = ["/auth", "/api/auth", "/_next/"];

  const publicUrl =
    (pathname === "/" ||
      publicPaths.some((path) => pathname.startsWith(path))) &&
    req.method === "GET";

  if (publicUrl) {
    return NextResponse.next();
  }

  // const { publicId } = await GetSession();
  const session = await GetSession();
  const publicId = session?.publicId;

  // ? CHECK AUTH =====
  const auth = Authentication(req, pathname, publicId);
  if (auth) return auth;

  // ? FORBIDDEN =====
  const forb = Forbidden(req, clientId, publicId);
  if (forb) return forb;

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob:
      https://res.cloudinary.com
      https://lh3.googleusercontent.com
      https://avatars.githubusercontent.com
      https://images.unsplash.com;
    connect-src 'self'
      https://api.cloudinary.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${!isDev ? "upgrade-insecure-requests;" : ""}
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce); // ! membuatnya di proxy agar bisa digunakan di server !!!

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  response.headers.set("X-Content-Type-Options", "nosniff");

  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  response.headers.set("X-Frame-Options", "DENY");

  return response;
};

export default proxy;

export const config = {
  matcher: [
    {
      source:
        "/((?!auth|api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
