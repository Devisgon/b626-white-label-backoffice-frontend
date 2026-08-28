import type { UserRole } from "@/types/role";

export type OnboardingStatus =
  "PENDING_EMAIL_VERIFICATION" | "EMAIL_VERIFIED" | "ONBOARDED";

export interface AuthUser {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  onboardingStatus: OnboardingStatus;
  activeLocationId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResendOtpRequest {
  email: string;
  purpose: "EMAIL_VERIFICATION" | "PASSWORD_RESET";
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  onboardingComplete?: boolean;
  message?: string;
}

export interface MessageResponse {
  message: string;
}

export interface Location {
  id: string;
  tenantId: string;
  name: string;
  address: string | null;
}

export interface CreateLocationRequest {
  name: string;
  address?: string;
}

export interface ActiveLocationRequest {
  locationId: string;
}
