"use client";

import {
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { useAuthStore } from "@/store";

interface OnboardingGuardProps {
  children: ReactNode;
}

export function OnboardingGuard({
  children,
}: OnboardingGuardProps) {
  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user,
  );

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const hasHydrated = useAuthStore(
    (state) => state.hasHydrated,
  );

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (user.onboardingStatus === "ONBOARDED") {
      router.replace("/");
    }
  }, [
    hasHydrated,
    isAuthenticated,
    router,
    user,
  ]);

  if (!hasHydrated) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !user) {
    return <LoadingScreen />;
  }

  if (user.onboardingStatus === "ONBOARDED") {
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
          Checking account setup...
        </p>
      </div>
    </main>
  );
}