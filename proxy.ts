import type { NextRequest } from "next/server";
import { proxy as srcProxy } from "./src/proxy";

export default function proxy(req: NextRequest) {
  return srcProxy(req);
}

export { proxy };

export const config = {
  matcher: [
    "/((?!_next|api|static|favicon.ico).*)",
    "/wallpapers/:path*",
  ],
};
