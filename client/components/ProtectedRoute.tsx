"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProtectedRoute({
  children,
  requireSeller = false,
}: {
  children: React.ReactNode;
  requireSeller?: boolean;
}) {
  const { isAuthenticated, role } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (requireSeller && role !== "shopkeeper") {
        router.push("/");
      }
    }
  }, [mounted, isAuthenticated, role, router, requireSeller]);

  if (!mounted || !isAuthenticated || (requireSeller && role !== "shopkeeper")) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  return <>{children}</>;
}
