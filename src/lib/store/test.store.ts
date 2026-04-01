import { create } from 'zustand';
import type { Question, Exam, TestStatus } from '@/types';

interface TestState {
  exam: Exam | null;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string | null>;
  markedForReview: Set<string>;
  status: TestStatus;
  startedAt: string | null;
  timeSpentPerQuestion: Record<string, number>;

  // Actions
  initTest: (exam: Exam, questions: Question[]) => void;
  setAnswer: (questionId: string, optionId: string | null) => void;
  toggleMarkForReview: (questionId: string) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitTest: () => void;
  resetTest: () => void;
}

export const useTestStore = create<TestState>()((set, get) => ({
  exam: null,
  questions: [],
  currentIndex: 0,
  answers: {},
  markedForReview: new Set(),
  status: 'not_started',
  startedAt: null,
  timeSpentPerQuestion: {},

  initTest: (exam, questions) => {
    set({
      exam,
      questions,
      currentIndex: 0,
      answers: {},
      markedForReview: new Set(),
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      timeSpentPerQuestion: {},
    });
  },

  setAnswer: (questionId, optionId) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionId },
    }));
  },

  toggleMarkForReview: (questionId) => {
    set((state) => {
      const next = new Set(state.markedForReview);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return { markedForReview: next };
    });
  },

  goToQuestion: (index) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) {
      set({ currentIndex: index });
    }
  },

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  prevQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  submitTest: () => {
    set({ status: 'completed' });
  },

  resetTest: () => {
    set({
      exam: null,
      questions: [],
      currentIndex: 0,
      answers: {},
      markedForReview: new Set(),
      status: 'not_started',
      startedAt: null,
      timeSpentPerQuestion: {},
    });
  },
}));

// Selectors
export const selectAttemptedCount = (state: TestState) =>
  Object.values(state.answers).filter(Boolean).length;

export const selectQuestionStatus = (state: TestState, questionId: string) => {
  if (state.markedForReview.has(questionId)) return 'marked' as const;
  if (state.answers[questionId]) return 'answered' as const;
  if (questionId in state.answers) return 'visited' as const;
  return 'not_visited' as const;
};
