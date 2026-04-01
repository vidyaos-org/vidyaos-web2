import type { TestSession, TestResult } from '@/types';

export interface SubmitTestPayload {
  examId: string;
  answers: Record<string, string | null>;
  markedForReview: string[];
  timeSpentPerQuestion: Record<string, number>;
  startedAt: string;
  submittedAt: string;
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

export const testsApi = {
  startSession: (examId: string) =>
    request<TestSession>('/tests/sessions', {
      method: 'POST',
      body: JSON.stringify({ examId }),
    }),

  saveProgress: (sessionId: string, data: Partial<TestSession>) =>
    request<void>(`/tests/sessions/${sessionId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  submitTest: (payload: SubmitTestPayload) =>
    request<TestResult>('/tests/submit', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getResult: (resultId: string) =>
    request<TestResult>(`/tests/results/${resultId}`),

  getUserResults: (userId: string) =>
    request<TestResult[]>(`/tests/results/user/${userId}`),

  getLeaderboard: (examId: string, period: string) =>
    request<{ rank: number; entries: unknown[] }>(`/tests/${examId}/leaderboard?period=${period}`),
};
