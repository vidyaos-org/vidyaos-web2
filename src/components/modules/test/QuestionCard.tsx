'use client';
import { Flag } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedOption: string | null;
  isMarked: boolean;
  onSelect: (optionId: string) => void;
  onToggleMark: () => void;
}

export function QuestionCard({
  question, index, selectedOption, isMarked, onSelect, onToggleMark
}: QuestionCardProps) {
  return (
    <div className="flex-1">
      {/* Question header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
            Q{index + 1}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-500">{question.subject}</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">{question.topic}</span>
          </div>
        </div>
        <button
          onClick={onToggleMark}
          title={isMarked ? 'Unmark for review' : 'Mark for review'}
          className={cn(
            'flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors',
            isMarked
              ? 'bg-amber-100 text-amber-700'
              : 'bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-600'
          )}
        >
          <Flag className="w-3.5 h-3.5" />
          {isMarked ? 'Marked' : 'Mark'}
        </button>
      </div>

      {/* Question text */}
      <p className="text-base text-slate-900 font-medium leading-relaxed mb-6">{question.text}</p>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={cn(
              'option-btn w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 text-left text-sm transition-all',
              selectedOption === opt.id
                ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50'
            )}
          >
            <span className={cn(
              'w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0',
              selectedOption === opt.id
                ? 'border-indigo-500 bg-indigo-500 text-white'
                : 'border-slate-300 text-slate-500'
            )}>
              {opt.id.toUpperCase()}
            </span>
            <span className={selectedOption === opt.id ? 'text-indigo-900 font-medium' : 'text-slate-700'}>
              {opt.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
