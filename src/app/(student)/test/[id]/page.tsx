import { TestPlayer } from '@/components/modules/test/TestPlayer';
import { mockExams, mockQuestions } from '@/lib/utils/mock-data';
import { notFound } from 'next/navigation';

// Override the student layout for this page (full-screen test mode)
export const metadata = { title: 'Mock Test — ExamOS' };

export default function TestPage({ params }: { params: { id: string } }) {
  const exam = mockExams.find((e) => e.id === params.id) ?? mockExams[0];
  if (!exam) notFound();

  // For demo: use all available mock questions (repeat to fill totalQuestions)
  const needed = Math.min(exam.totalQuestions, mockQuestions.length * 4);
  const questions = Array.from({ length: needed }, (_, i) => ({
    ...mockQuestions[i % mockQuestions.length],
    id: `${mockQuestions[i % mockQuestions.length].id}_${i}`,
  }));

  return <TestPlayer exam={exam} questions={questions} />;
}
