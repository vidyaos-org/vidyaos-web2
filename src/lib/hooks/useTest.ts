import { useTestStore, selectAttemptedCount, selectQuestionStatus } from '@/lib/store/test.store';
import type { Exam, Question } from '@/types';

export function useTest() {
  const store = useTestStore();

  const currentQuestion = store.questions[store.currentIndex] ?? null;
  const attemptedCount = selectAttemptedCount(store);
  const totalQuestions = store.questions.length;
  const isLastQuestion = store.currentIndex === totalQuestions - 1;
  const isFirstQuestion = store.currentIndex === 0;

  const getQuestionStatus = (questionId: string) => selectQuestionStatus(store, questionId);

  const startTest = (exam: Exam, questions: Question[]) => {
    store.initTest(exam, questions);
  };

  return {
    // State
    exam: store.exam,
    questions: store.questions,
    currentIndex: store.currentIndex,
    currentQuestion,
    answers: store.answers,
    markedForReview: store.markedForReview,
    status: store.status,

    // Derived
    attemptedCount,
    totalQuestions,
    isLastQuestion,
    isFirstQuestion,
    notAttempted: totalQuestions - attemptedCount,

    // Actions
    startTest,
    setAnswer: store.setAnswer,
    toggleMarkForReview: store.toggleMarkForReview,
    goToQuestion: store.goToQuestion,
    nextQuestion: store.nextQuestion,
    prevQuestion: store.prevQuestion,
    submitTest: store.submitTest,
    resetTest: store.resetTest,
    getQuestionStatus,
  };
}
