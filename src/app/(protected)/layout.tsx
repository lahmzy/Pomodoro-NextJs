import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  if (!cookieHeader.includes("access_token=")) {
    redirect("/login");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not set");
    redirect("/login");
  }

  let res: Response | undefined;
  try {
    res = await fetch(`${apiUrl}/auth/profile`, {
      headers: {
        Cookie: cookieHeader,
      },
      credentials: "include",
      cache: "no-store",
    });
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    redirect("/login");
  }

  if (!res || !res.ok) {
    redirect("/login");
  }

  return <>{children}</>;
}
