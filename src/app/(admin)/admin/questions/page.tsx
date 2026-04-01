'use client';
import { useState } from 'react';
import {
  Plus, Search, Filter, Edit2, Trash2, Eye, Upload,
  BookOpen, CheckCircle2, Tag, ChevronDown
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge, DifficultyBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockQuestions } from '@/lib/utils/mock-data';
import type { Question } from '@/types';

function QuestionRow({ q, onEdit }: { q: Question; onEdit: (q: Question) => void }) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3">
        <input type="checkbox" className="rounded text-indigo-600" />
      </td>
      <td className="px-4 py-3 max-w-xs">
        <p className="text-sm text-slate-900 line-clamp-2">{q.text}</p>
        <div className="flex gap-1 mt-1 flex-wrap">
          {q.tags.slice(0, 2).map((t) => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">#{t}</span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{q.subject}</td>
      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{q.topic}</td>
      <td className="px-4 py-3">
        <DifficultyBadge difficulty={q.difficulty} />
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {q.examCategory.map((c) => (
            <Badge key={c} variant="primary" className="text-[10px]">{c}</Badge>
          ))}
        </div>
      </td>
      <td className="px-4 py-3">
        {q.isPYQ ? (
          <Badge variant="purple">PYQ {q.pyqYear}</Badge>
        ) : (
          <Badge variant="default">Practice</Badge>
        )}
      </td>
      <td className="px-4 py-3">
        <Badge variant="success">Published</Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button onClick={() => onEdit(q)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function AddQuestionModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Add New Question</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Question Text</label>
            <textarea rows={3} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Enter question text..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['Option A', 'Option B', 'Option C', 'Option D'].map((opt) => (
              <div key={opt}>
                <label className="block text-xs font-medium text-slate-600 mb-1">{opt}</label>
                <input type="text" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder={opt} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Correct Option</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {['A', 'B', 'C', 'D'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Difficulty</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {['Easy', 'Medium', 'Hard', 'Exam-Level'].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Subject</label>
              <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {['Quantitative Aptitude', 'Reasoning Ability', 'General Awareness', 'English'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Explanation</label>
            <textarea rows={2} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Step-by-step solution..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
            <input type="text" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="ratio, age, maths" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Save Question</Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminQuestionsPage() {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const filtered = mockQuestions.filter((q) =>
    !search || q.text.toLowerCase().includes(search.toLowerCase()) || q.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Question Bank</h1>
          <p className="text-slate-500 text-sm mt-0.5">{mockQuestions.length} questions · Manage, add and tag questions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" /> Bulk Import CSV
          </Button>
          <Button className="gap-2" onClick={() => setShowAdd(true)}>
            <Plus className="w-4 h-4" /> Add Question
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Questions', value: '50,284', icon: BookOpen, color: 'bg-indigo-600' },
          { label: 'Published', value: '48,120', icon: CheckCircle2, color: 'bg-emerald-500' },
          { label: 'PYQ Questions', value: '12,450', icon: Tag, color: 'bg-purple-500' },
          { label: 'Pending Review', value: '2,164', icon: Eye, color: 'bg-amber-500' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${color}`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{label}</p>
              <p className="text-xl font-bold text-slate-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Subjects</option>
            {['Quantitative Aptitude', 'Reasoning Ability', 'General Awareness', 'English'].map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Difficulties</option>
            {['Easy', 'Medium', 'Hard', 'Exam-Level'].map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Exams</option>
            {['SSC', 'Banking', 'RRB', 'UPSC'].map((e) => <option key={e}>{e}</option>)}
          </select>
          <Button variant="outline" size="sm" className="gap-1.5 ml-auto">
            <Filter className="w-4 h-4" /> More Filters <ChevronDown className="w-3 h-3" />
          </Button>
        </CardBody>
      </Card>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <input type="checkbox" className="rounded text-indigo-600" />
          <span className="text-xs text-slate-500">{filtered.length} questions</span>
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              <Tag className="w-3.5 h-3.5" /> Bulk Tag
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-red-500 hover:text-red-600">
              <Trash2 className="w-3.5 h-3.5" /> Delete Selected
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-2 w-8" />
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Question</th>
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">Subject</th>
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Topic</th>
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Difficulty</th>
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Exam</th>
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <QuestionRow key={q.id} q={q} onEdit={setEditingQuestion} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filtered.length} of 50,284 questions</span>
          <div className="flex gap-1">
            {[1, 2, 3, '...', 50].map((p, i) => (
              <button key={i} className={`px-2.5 py-1 rounded ${p === 1 ? 'bg-indigo-600 text-white' : 'hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {(showAdd || editingQuestion) && (
        <AddQuestionModal onClose={() => { setShowAdd(false); setEditingQuestion(null); }} />
      )}
    </div>
  );
}
