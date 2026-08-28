"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { useAuthStore } from "@/store";

interface AuthGuardProps {
  children: ReactNode;
  requireOnboarding?: boolean;
}

export function AuthGuard({
  children,
  requireOnboarding = true,
}: AuthGuardProps) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (requireOnboarding && user.onboardingStatus !== "ONBOARDED") {
      router.replace("/onboarding/location");
    }
  }, [hasHydrated, isAuthenticated, requireOnboarding, router, user]);

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !user) {
    return <LoadingScreen />;
  }

  if (requireOnboarding && user.onboardingStatus !== "ONBOARDED") {
    return <LoadingScreen />;
  }

  return children;
}

function LoadingScreen() {
  return (
    <main
      className="
        flex min-h-screen items-center justify-center
        bg-background
      "
    >
      <div className="text-center">
        <LoaderCircle
          className="
            mx-auto size-7 animate-spin text-primary
          "
        />

        <p className="mt-3 text-xs font-medium text-muted">
          Loading your workspace...
        </p>
      </div>
    </main>
  );
}
