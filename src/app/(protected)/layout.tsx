"use client"; // 👈 Mark this as a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      try {
        // We let the Browser handle the cookie sending with credentials: 'include'
        const res = await fetch(`${apiUrl}/auth/profile`, {
          method: 'GET',
          credentials: "include", // 👈 Critical: sends the cookie to the backend
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          setIsAuthorized(true);
        } else {
          // Token is invalid or expired
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth check failed", error);
        router.push("/login");
      }
    };

    verifyUser();
  }, [router]);

  // Show a loading state while checking (prevents flashing protected content)
  if (!isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Verifying session...</p>
      </div>
    );
  }

  return <>{children}</>;
}