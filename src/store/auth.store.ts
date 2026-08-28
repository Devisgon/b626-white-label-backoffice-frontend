import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthUser, Location } from "@/features/auth/types";

interface SetSessionData {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

interface AuthStore {
  user: AuthUser | null;
  activeLocation: Location | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  setSession: (data: SetSessionData) => void;

  updateTokens: (accessToken: string, refreshToken: string) => void;

  setUser: (user: AuthUser) => void;

  setActiveLocation: (location: Location) => void;

  clearAuth: () => void;

  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      activeLocation: null,
      isAuthenticated: false,
      hasHydrated: false,

      setSession: ({ user, accessToken, refreshToken }) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);

          localStorage.setItem("refreshToken", refreshToken);
        }

        set({
          user,
          isAuthenticated: true,
        });
      },

      updateTokens: (accessToken, refreshToken) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);

          localStorage.setItem("refreshToken", refreshToken);
        }
      },

      setUser: (user) => {
        set({
          user,
          isAuthenticated: true,
        });
      },

      setActiveLocation: (location) => {
        set((state) => ({
          activeLocation: location,

          user: state.user
            ? {
                ...state.user,
                activeLocationId: location.id,
                onboardingStatus: "ONBOARDED",
              }
            : null,
        }));
      },

      clearAuth: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }

        set({
          user: null,
          activeLocation: null,
          isAuthenticated: false,
        });
      },

      setHasHydrated: (value) => {
        set({
          hasHydrated: value,
        });
      },
    }),
    {
      name: "total-store-auth",

      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        user: state.user,
        activeLocation: state.activeLocation,
        isAuthenticated: state.isAuthenticated,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
