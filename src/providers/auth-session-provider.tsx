"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

import { getCurrentUser, getMyLocations } from "@/features/auth/api";
import { useAuthStore } from "@/store";

const PUBLIC_ROUTES = new Set([
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
]);

export function AuthSessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userId = useAuthStore((state) => state.user?.id);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setUser = useAuthStore((state) => state.setUser);
  const setActiveLocation = useAuthStore((state) => state.setActiveLocation);
  const checkedTokenRef = useRef<string | null>(null);

  useEffect(() => {
    function handleUnauthorized() {
      clearAuth();

      if (!PUBLIC_ROUTES.has(pathname)) {
        router.replace("/login?sessionExpired=true");
      }
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [clearAuth, pathname, router]);

  useEffect(() => {
    if (!hasHydrated) return;

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      checkedTokenRef.current = null;
      if (isAuthenticated) clearAuth();
      return;
    }

    if (checkedTokenRef.current === accessToken) return;
    checkedTokenRef.current = accessToken;

    async function restoreSession() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        if (currentUser.activeLocationId) {
          const locations = await getMyLocations();
          const selectedLocation = locations.find(
            (location) => location.id === currentUser.activeLocationId,
          );

          if (selectedLocation) setActiveLocation(selectedLocation);
        }
      } catch {
        // The API interceptor handles an expired or invalid token.
      }
    }

    void restoreSession();
  }, [
    clearAuth,
    hasHydrated,
    isAuthenticated,
    setActiveLocation,
    setUser,
    userId,
  ]);

  return children;
}
