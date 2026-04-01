import type { User, ExamCategory } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface OnboardingPayload {
  examPreferences: ExamCategory[];
  studyGoalHours: string;
  examTimeline: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? 'Request failed');
  }
  return res.json();
}

export const authApi = {
  login: (payload: LoginPayload) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),

  signup: (payload: SignupPayload) =>
    request<AuthResponse>('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),

  loginWithGoogle: (token: string) =>
    request<AuthResponse>('/auth/google', { method: 'POST', body: JSON.stringify({ token }) }),

  completeOnboarding: (userId: string, payload: OnboardingPayload) =>
    request<User>(`/auth/onboarding/${userId}`, { method: 'PUT', body: JSON.stringify(payload) }),

  getMe: () =>
    request<User>('/auth/me'),

  logout: () =>
    request<void>('/auth/logout', { method: 'POST' }),
};
