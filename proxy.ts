import type { NextRequest } from "next/server";
import { proxy as srcProxy } from "./src/proxy";

export function proxy(req: NextRequest) {
  return srcProxy(req);
}

export const config = {
  matcher: [
    "/((?!_next|api|static|favicon.ico).*)",
    "/wallpapers/:path*",
  ],
};
