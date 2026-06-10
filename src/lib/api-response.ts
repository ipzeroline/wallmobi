import { NextResponse } from "next/server";

export function serverErrorResponse(message = "Internal server error") {
  return NextResponse.json(
    { error: process.env.NODE_ENV === "production" ? "Internal server error" : message },
    { status: 500 }
  );
}

export function isSafeSlug(slug: string) {
  return /^[a-z0-9][a-z0-9-]{0,180}$/i.test(slug);
}
