'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Timer } from './Timer';
import { QuestionCard } from './QuestionCard';
import { cn } from '@/lib/utils/cn';
import type { Question, Exam } from '@/types';

interface TestPlayerProps {
  exam: Exam;
  questions: Question[];
}

export function TestPlayer({ exam, questions }: TestPlayerProps) {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const current = questions[currentIdx];
  const totalSeconds = exam.durationMinutes * 60;

  const handleSelect = useCallback((optionId: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
  }, [current.id]);

  const toggleMark = useCallback(() => {
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(current.id)) next.delete(current.id); else next.add(current.id);
      return next;
    });
  }, [current.id]);

  const clearAnswer = () => {
    setAnswers((prev) => ({ ...prev, [current.id]: null }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push(`/result/${exam.id}`);
  };

  const attempted = Object.values(answers).filter(Boolean).length;
  const notVisited = questions.length - Object.keys(answers).length;

  const getQStatus = (q: Question) => {
    if (marked.has(q.id)) return 'marked';
    if (answers[q.id]) return 'answered';
    if (q.id in answers) return 'visited';
    return 'not-visited';
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Test header */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4 shrink-0">
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-slate-900 truncate">{exam.title}</h1>
            <p className="text-xs text-slate-500">
              Q{currentIdx + 1} of {questions.length}
              {exam.negativeMarking > 0 && ` · Negative: -${exam.negativeMarking}`}
            </p>
          </div>
          <Timer totalSeconds={totalSeconds} onExpire={handleSubmit} />
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowConfirm(true)}
            className="gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            Submit Test
          </Button>
        </header>

        {/* Question area */}
        <div className="flex-1 overflow-y-auto p-6">
          <QuestionCard
            question={current}
            index={currentIdx}
            selectedOption={answers[current.id] ?? null}
            isMarked={marked.has(current.id)}
            onSelect={handleSelect}
            onToggleMark={toggleMark}
          />
        </div>

        {/* Navigation bar */}
        <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
          <Button
            variant="outline"
            size="sm"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((i) => i - 1)}
            className="gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          <div className="flex items-center gap-3">
            {answers[current.id] && (
              <button onClick={clearAnswer} className="text-xs text-red-500 hover:underline">
                Clear Response
              </button>
            )}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> {attempted} Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" /> {marked.size} Marked
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-slate-300 inline-block" /> {notVisited} Not Visited
              </span>
            </div>
          </div>

          <Button
            size="sm"
            disabled={currentIdx === questions.length - 1}
            onClick={() => setCurrentIdx((i) => i + 1)}
            className="gap-1.5"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Question palette sidebar */}
      <aside className="w-64 bg-white border-l border-slate-200 flex flex-col overflow-hidden shrink-0">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Question Palette</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-5 gap-1.5">
            {questions.map((q, idx) => {
              const status = getQStatus(q);
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={cn(
                    'w-10 h-10 rounded-lg text-xs font-bold transition-all border-2',
                    idx === currentIdx ? 'ring-2 ring-indigo-500 ring-offset-1' : '',
                    status === 'answered' ? 'bg-emerald-500 text-white border-emerald-500' :
                    status === 'marked' ? 'bg-amber-400 text-white border-amber-400' :
                    status === 'visited' ? 'bg-red-100 text-red-700 border-red-200' :
                    'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                  )}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-1.5 text-xs">
            {[
              { color: 'bg-emerald-500', label: 'Answered' },
              { color: 'bg-amber-400', label: 'Marked for review' },
              { color: 'bg-red-100 border border-red-200', label: 'Not answered' },
              { color: 'bg-white border border-slate-200', label: 'Not visited' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded shrink-0 ${color}`} />
                <span className="text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Submit confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Submit Test?</h3>
            <div className="space-y-1 text-sm text-slate-600 mb-6">
              <p>Answered: <strong className="text-emerald-600">{attempted}</strong> / {questions.length}</p>
              <p>Marked for review: <strong className="text-amber-600">{marked.size}</strong></p>
              <p>Not attempted: <strong className="text-slate-900">{questions.length - attempted}</strong></p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowConfirm(false)}>
                Continue Test
              </Button>
              <Button variant="danger" className="flex-1" onClick={handleSubmit} loading={submitting}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
