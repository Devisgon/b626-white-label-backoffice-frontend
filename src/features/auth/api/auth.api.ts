import { apiClient } from "@/lib/api";

import type {
  ActiveLocationRequest,
  AuthResponse,
  AuthUser,
  CreateLocationRequest,
  ForgotPasswordRequest,
  Location,
  LoginRequest,
  MessageResponse,
  RegisterRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "../types";

interface RegisterResponse {
  message: string;
  userId: string;
  onboardingStatus: string;
}

interface TokenResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

interface CreateLocationResponse extends TokenResponse {
  location: Location;
}

const AUTH_ENDPOINT = "/api/auth";

export async function registerUser(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(
    `${AUTH_ENDPOINT}/register`,
    data,
  );

  return response.data;
}

export async function verifyEmail(
  data: VerifyEmailRequest,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    `${AUTH_ENDPOINT}/verify-email`,
    data,
  );

  return response.data;
}

export async function resendOtp(
  data: ResendOtpRequest,
): Promise<MessageResponse> {
  const response = await apiClient.post<MessageResponse>(
    `${AUTH_ENDPOINT}/resend-otp`,
    data,
  );

  return response.data;
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    `${AUTH_ENDPOINT}/login`,
    data,
  );

  return response.data;
}

export async function logoutUser(): Promise<MessageResponse> {
  const response = await apiClient.post<MessageResponse>(
    `${AUTH_ENDPOINT}/logout`,
  );

  return response.data;
}

export async function forgotPassword(
  data: ForgotPasswordRequest,
): Promise<MessageResponse> {
  const response = await apiClient.post<MessageResponse>(
    `${AUTH_ENDPOINT}/forgot-password`,
    data,
  );

  return response.data;
}

export async function resetPassword(
  data: ResetPasswordRequest,
): Promise<MessageResponse> {
  const response = await apiClient.post<MessageResponse>(
    `${AUTH_ENDPOINT}/reset-password`,
    data,
  );

  return response.data;
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await apiClient.get<AuthUser>(`${AUTH_ENDPOINT}/me`);

  return response.data;
}

export async function getMyLocations(): Promise<Location[]> {
  const response = await apiClient.get<Location[]>(
    `${AUTH_ENDPOINT}/locations`,
  );

  return response.data;
}

export async function createOnboardingLocation(
  data: CreateLocationRequest,
): Promise<CreateLocationResponse> {
  const response = await apiClient.post<CreateLocationResponse>(
    `${AUTH_ENDPOINT}/onboarding/location`,
    data,
  );

  return response.data;
}

export async function setActiveLocation(
  data: ActiveLocationRequest,
): Promise<TokenResponse> {
  const response = await apiClient.post<TokenResponse>(
    `${AUTH_ENDPOINT}/active-location`,
    data,
  );

  return response.data;
}
