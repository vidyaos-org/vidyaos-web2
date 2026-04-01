import type { Exam, Question, ExamCategory, TestType } from '@/types';

export interface ExamsFilter {
  category?: ExamCategory;
  type?: TestType;
  isFree?: boolean;
  page?: number;
  limit?: number;
}

export interface QuestionsFilter {
  subject?: string;
  topic?: string;
  difficulty?: string;
  examCategory?: ExamCategory;
  isPYQ?: boolean;
  isBookmarked?: boolean;
  search?: string;
  page?: number;
  limit?: number;
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

function buildQuery(params: Record<string, unknown>): string {
  const filtered = Object.entries(params).filter(([, v]) => v !== undefined && v !== null);
  if (!filtered.length) return '';
  return '?' + filtered.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
}

export const examsApi = {
  getExams: (filter: ExamsFilter = {}) =>
    request<{ data: Exam[]; total: number }>(`/exams${buildQuery(filter)}`),

  getExamById: (id: string) =>
    request<Exam>(`/exams/${id}`),

  getExamQuestions: (examId: string) =>
    request<Question[]>(`/exams/${examId}/questions`),

  getDailyQuiz: () =>
    request<Exam>('/exams/daily-quiz'),

  getWeeklyTest: () =>
    request<Exam>('/exams/weekly-grand'),
};

export const questionsApi = {
  getQuestions: (filter: QuestionsFilter = {}) =>
    request<{ data: Question[]; total: number }>(`/questions${buildQuery(filter)}`),

  getQuestionById: (id: string) =>
    request<Question>(`/questions/${id}`),

  bookmarkQuestion: (questionId: string) =>
    request<void>(`/questions/${questionId}/bookmark`, { method: 'POST' }),

  unbookmarkQuestion: (questionId: string) =>
    request<void>(`/questions/${questionId}/bookmark`, { method: 'DELETE' }),

  getBookmarkedQuestions: () =>
    request<Question[]>('/questions/bookmarked'),

  getAIExplanation: (questionId: string, style: string) =>
    request<{ explanation: string }>(`/questions/${questionId}/ai-explain`, {
      method: 'POST',
      body: JSON.stringify({ style }),
    }),
};
