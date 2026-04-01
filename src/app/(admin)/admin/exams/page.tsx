'use client';
import { useState } from 'react';
import { Plus, Edit2, Trash2, Copy, Eye, BookOpen, Clock, Users, BarChart2, Play } from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockExams } from '@/lib/utils/mock-data';

const typeLabels: Record<string, string> = {
  mock: 'Full Mock', sectional: 'Sectional', topic: 'Topic Test', daily_quiz: 'Daily Quiz', weekly: 'Weekly Grand',
};

function ExamRow({ exam }: { exam: typeof mockExams[0] }) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{exam.title}</p>
          <div className="flex gap-1 mt-1">
            {exam.sections.map((s) => (
              <span key={s.name} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{s.subject} ({s.questionCount}Q)</span>
            ))}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge variant="primary">{exam.category}</Badge>
      </td>
      <td className="px-4 py-3">
        <Badge variant="default">{typeLabels[exam.type]}</Badge>
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
        <div className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {exam.totalQuestions}</div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
        <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.durationMinutes}m</div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">
        {exam.negativeMarking > 0 ? <span className="text-red-500">-{exam.negativeMarking}</span> : <span className="text-slate-400">None</span>}
      </td>
      <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
        <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {exam.attemptedCount?.toLocaleString() ?? '0'}</div>
      </td>
      <td className="px-4 py-3">
        {exam.isFree ? <Badge variant="success">Free</Badge> : <Badge variant="warning">Pro</Badge>}
      </td>
      <td className="px-4 py-3">
        <Badge variant="success">Active</Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Edit">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors" title="Preview">
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors" title="Duplicate">
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminExamsPage() {
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Exam Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">Create and manage mock tests, sectional tests, and quizzes</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <BarChart2 className="w-4 h-4" /> Analytics
          </Button>
          <Button className="gap-2" onClick={() => setShowBuilder(true)}>
            <Plus className="w-4 h-4" /> Create Exam
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Exams', value: '142', sub: '+8 this month', color: 'bg-indigo-600' },
          { label: 'Total Attempts', value: '2.4L+', sub: 'All time', color: 'bg-emerald-500' },
          { label: 'Active Exams', value: '89', sub: 'Live now', color: 'bg-purple-500' },
          { label: 'Avg. Score', value: '63.2%', sub: 'Platform-wide', color: 'bg-amber-500' },
        ].map(({ label, value, sub, color }) => (
          <Card key={label} className="p-4">
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
            <div className={`mt-2 h-1 rounded-full ${color} opacity-30`} />
          </Card>
        ))}
      </div>

      {/* Quick create cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { title: 'Full Mock Test', desc: 'Multi-section, timed exam with negative marking', icon: '📝', badge: 'Most Common' },
          { title: 'Sectional Test', desc: 'Test a single subject section', icon: '📚', badge: '' },
          { title: 'Daily Quiz', desc: '10-question auto-reset quiz', icon: '⚡', badge: 'Auto-reset' },
        ].map(({ title, desc, icon, badge }) => (
          <button
            key={title}
            onClick={() => setShowBuilder(true)}
            className="p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/50 text-left transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{icon}</span>
              {badge && <Badge variant="primary" className="text-[10px]">{badge}</Badge>}
            </div>
            <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">{title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
          <p className="text-sm font-semibold text-slate-700">All Exams</p>
          <div className="flex gap-2 ml-4">
            {['All', 'SSC', 'Banking', 'RRB'].map((c) => (
              <button key={c} className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${c === 'All' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300'}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {['Exam', 'Category', 'Type', 'Questions', 'Duration', 'Neg. Mark', 'Attempts', 'Access', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockExams.map((exam) => <ExamRow key={exam.id} exam={exam} />)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exam Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Drag-and-Drop Exam Builder</h2>
              </div>
              <button onClick={() => setShowBuilder(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Exam Title</label>
                  <input type="text" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. SSC CGL Tier 1 — Full Mock #1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Exam Category</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {['SSC', 'Banking', 'RRB', 'State PCS', 'UPSC'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Test Type</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {['Full Mock', 'Sectional', 'Topic Test', 'Daily Quiz'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</label>
                  <input type="number" defaultValue={60} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Negative Marking</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {['None', '-0.25', '-0.33', '-0.5'].map((n) => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sections</label>
                {['General Intelligence & Reasoning', 'General Awareness', 'Quantitative Aptitude', 'English Comprehension'].map((section, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 mb-2 border border-slate-200 rounded-lg bg-slate-50">
                    <span className="text-slate-400 cursor-grab">⋮⋮</span>
                    <input defaultValue={section} className="flex-1 text-sm bg-transparent border-none outline-none" />
                    <input type="number" defaultValue={25} className="w-16 text-sm text-center border border-slate-300 rounded px-2 py-1" />
                    <span className="text-xs text-slate-400">questions</span>
                    <button className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
                <button className="flex items-center gap-2 text-sm text-indigo-600 hover:underline mt-1">
                  <Plus className="w-4 h-4" /> Add Section
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700">Access</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="access" defaultChecked className="text-indigo-600" /> Free
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="access" className="text-indigo-600" /> Pro
                </label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowBuilder(false)}>Cancel</Button>
              <Button variant="outline">Save Draft</Button>
              <Button>Publish Exam</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
