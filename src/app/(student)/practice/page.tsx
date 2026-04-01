'use client';
import { useState } from 'react';
import { Search, Filter, Bookmark, BookmarkCheck, ChevronDown, ChevronUp, RefreshCw, Brain } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge, DifficultyBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockQuestions } from '@/lib/utils/mock-data';
import type { Question, DifficultyLevel } from '@/types';

const subjects = ['All', 'Quantitative Aptitude', 'Reasoning Ability', 'General Awareness', 'English'];
const difficulties: DifficultyLevel[] = ['Easy', 'Medium', 'Hard', 'Exam-Level'];
const examCats = ['All', 'SSC', 'Banking', 'RRB', 'State PCS', 'UPSC'];

function QuestionItem({ question }: { question: Question }) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(question.isBookmarked ?? false);
  const answered = selected !== null;
  const correct = selected === question.correctOptionId;

  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="default">{question.subject}</Badge>
          <Badge variant="info">{question.topic}</Badge>
          <DifficultyBadge difficulty={question.difficulty} />
          {question.isPYQ && (
            <Badge variant="purple">PYQ {question.pyqYear}</Badge>
          )}
          <button
            onClick={() => setBookmarked((v) => !v)}
            className="ml-auto text-slate-400 hover:text-amber-500 transition-colors"
          >
            {bookmarked
              ? <BookmarkCheck className="w-4 h-4 text-amber-500" />
              : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Question text */}
        <p className="text-sm font-medium text-slate-900 leading-relaxed mb-4">{question.text}</p>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((opt) => {
            let optClass = 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50';
            if (answered) {
              if (opt.id === question.correctOptionId) optClass = 'border-emerald-400 bg-emerald-50';
              else if (opt.id === selected) optClass = 'border-red-400 bg-red-50';
              else optClass = 'border-slate-200 bg-white opacity-60';
            }

            return (
              <button
                key={opt.id}
                disabled={answered}
                onClick={() => setSelected(opt.id)}
                className={`option-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-left text-sm transition-all ${optClass}`}
              >
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                  answered && opt.id === question.correctOptionId ? 'border-emerald-500 text-emerald-600' :
                  answered && opt.id === selected ? 'border-red-400 text-red-500' :
                  'border-slate-300 text-slate-500'
                }`}>
                  {opt.id.toUpperCase()}
                </span>
                <span className="text-slate-800">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Result & explanation */}
        {answered && (
          <div className={`mt-4 p-4 rounded-lg ${correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`text-sm font-semibold mb-2 ${correct ? 'text-emerald-700' : 'text-red-700'}`}>
              {correct ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            {(expanded || !correct) && (
              <p className="text-sm text-slate-700 leading-relaxed">{question.explanation}</p>
            )}
            {correct && !expanded && (
              <button onClick={() => setExpanded(true)} className="text-xs text-emerald-600 hover:underline flex items-center gap-1 mt-1">
                Show explanation <ChevronDown className="w-3 h-3" />
              </button>
            )}
            {correct && expanded && (
              <button onClick={() => setExpanded(false)} className="text-xs text-emerald-600 hover:underline flex items-center gap-1 mt-1">
                Hide explanation <ChevronUp className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export default function PracticePage() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [exam, setExam] = useState('All');
  const [pyqOnly, setPyqOnly] = useState(false);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const filtered = mockQuestions.filter((q) => {
    if (search && !q.text.toLowerCase().includes(search.toLowerCase()) && !q.topic.toLowerCase().includes(search.toLowerCase())) return false;
    if (subject !== 'All' && q.subject !== subject) return false;
    if (difficulty !== 'All' && q.difficulty !== difficulty) return false;
    if (exam !== 'All' && !q.examCategory.includes(exam as never)) return false;
    if (pyqOnly && !q.isPYQ) return false;
    if (bookmarkedOnly && !q.isBookmarked) return false;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Question Bank</h1>
        <p className="text-slate-500 text-sm mt-1">50,000+ questions with AI explanations and step-by-step solutions</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardBody className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {subjects.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyLevel | 'All')}
              className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Difficulties</option>
              {difficulties.map((d) => <option key={d}>{d}</option>)}
            </select>

            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {examCats.map((e) => <option key={e}>{e}</option>)}
            </select>

            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" checked={pyqOnly} onChange={(e) => setPyqOnly(e.target.checked)} className="rounded text-indigo-600" />
              PYQ Only
            </label>

            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" checked={bookmarkedOnly} onChange={(e) => setBookmarkedOnly(e.target.checked)} className="rounded text-indigo-600" />
              Bookmarked
            </label>
          </div>
        </CardBody>
      </Card>

      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{filtered.length}</span> questions
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Brain className="w-4 h-4" />
            AI Explain All
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <RefreshCw className="w-4 h-4" />
            Shuffle
          </Button>
        </div>
      </div>

      {/* Questions */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No questions found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((q) => <QuestionItem key={q.id} question={q} />)}
        </div>
      )}
    </div>
  );
}
