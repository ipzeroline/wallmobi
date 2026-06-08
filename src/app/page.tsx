import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { pickLocaleFromHeaders } from "@/lib/locale-detection";

export default async function RootPage() {
  const requestHeaders = await headers();
  redirect(`/${pickLocaleFromHeaders(requestHeaders)}`);
}
