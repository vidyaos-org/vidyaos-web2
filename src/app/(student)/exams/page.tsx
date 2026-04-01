'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, Clock, Users, ArrowRight, Lock, Play,
  Filter, Zap, Calendar, BarChart2
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockExams } from '@/lib/utils/mock-data';
import type { Exam } from '@/types';

const typeLabels = {
  mock: 'Full Mock',
  sectional: 'Sectional',
  topic: 'Topic Test',
  daily_quiz: 'Daily Quiz',
  weekly: 'Weekly Grand',
};

const categories = ['All', 'SSC', 'Banking', 'RRB', 'State PCS', 'UPSC'];
const types = ['All', 'mock', 'sectional', 'daily_quiz'];

function ExamCard({ exam }: { exam: Exam }) {
  return (
    <Card hover className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="primary">{exam.category}</Badge>
            <Badge variant="default">{typeLabels[exam.type]}</Badge>
            {exam.isFree ? (
              <Badge variant="success">Free</Badge>
            ) : (
              <Badge variant="warning">
                <Lock className="w-2.5 h-2.5 mr-0.5" /> Pro
              </Badge>
            )}
          </div>
        </div>

        <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2">{exam.title}</h3>

        {/* Sections */}
        {exam.sections.length > 1 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {exam.sections.map((s) => (
              <span key={s.name} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                {s.subject} ({s.questionCount}Q)
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> {exam.totalQuestions} Questions
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {exam.durationMinutes} min
          </span>
          {exam.negativeMarking > 0 && (
            <span className="text-red-500">-{exam.negativeMarking} neg.</span>
          )}
        </div>

        {exam.attemptedCount && (
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {exam.attemptedCount.toLocaleString()} attempts
            </span>
            {exam.averageScore && (
              <span className="flex items-center gap-1">
                <BarChart2 className="w-3.5 h-3.5" /> Avg: {exam.averageScore}%
              </span>
            )}
          </div>
        )}

        <Link
          href={`/test/${exam.id}`}
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            exam.isFree
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'border border-indigo-200 text-indigo-600 hover:bg-indigo-50'
          }`}
        >
          <Play className="w-4 h-4" />
          {exam.isFree ? 'Start Test' : 'Unlock with Pro'}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
}

export default function ExamsPage() {
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');

  const filtered = mockExams.filter((e) => {
    if (category !== 'All' && e.category !== category) return false;
    if (type !== 'All' && e.type !== type) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Exams & Mock Tests</h1>
        <p className="text-slate-500 text-sm mt-0.5">Full-length and sectional tests for all major government exams</p>
      </div>

      {/* Daily Quiz CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 mb-6 flex items-center gap-6 text-white">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold text-indigo-200">Today&apos;s Challenge</span>
          </div>
          <h2 className="text-xl font-bold">Daily Quiz — Quantitative Aptitude</h2>
          <p className="text-indigo-200 text-sm mt-1">10 Questions · 12 Minutes · Resets at midnight</p>
        </div>
        <div className="text-center shrink-0">
          <p className="text-3xl font-extrabold">+100 XP</p>
          <p className="text-xs text-indigo-200">on completion</p>
        </div>
        <Link
          href="/test/e4"
          className="flex items-center gap-2 px-5 py-3 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors shrink-0"
        >
          <Play className="w-4 h-4" />
          Start Now
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Filter className="w-4 h-4 text-slate-400" />
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                category === c ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:border-indigo-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="h-5 w-px bg-slate-200 mx-1" />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Types</option>
          <option value="mock">Full Mock</option>
          <option value="sectional">Sectional</option>
          <option value="daily_quiz">Daily Quiz</option>
        </select>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Calendar, label: 'Daily Quiz', sub: 'Reset daily', href: '/test/e4', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
          { icon: Zap, label: 'Weekly Grand Test', sub: 'Sunday special', href: '/test/e1', color: 'bg-purple-50 text-purple-700 border-purple-200' },
          { icon: BarChart2, label: 'Previous Tests', sub: 'Review answers', href: '/analytics', color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { icon: BookOpen, label: 'Practice Mode', sub: 'No time limit', href: '/practice', color: 'bg-amber-50 text-amber-700 border-amber-200' },
        ].map(({ icon: Icon, label, sub, href, color }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 p-3 rounded-xl border ${color} hover:opacity-80 transition-opacity`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs font-semibold">{label}</p>
              <p className="text-[10px] opacity-70">{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Exam grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((exam) => <ExamCard key={exam.id} exam={exam} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No exams found</p>
          <p className="text-sm">Try a different category filter</p>
        </div>
      )}
    </div>
  );
}
