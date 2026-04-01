'use client';
import { useState } from 'react';
import { Plus, Edit2, Trash2, Users, BookOpen, Calendar, Mail, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

const mockBatches = [
  { id: 'b1', name: 'SSC CGL 2024 — Batch A', category: 'SSC', students: 240, maxStudents: 300, startDate: '2024-01-15', endDate: '2024-06-15', examsAssigned: 24, avgScore: 68.4, status: 'active' },
  { id: 'b2', name: 'IBPS PO 2024 — Morning Batch', category: 'Banking', students: 185, maxStudents: 200, startDate: '2024-02-01', endDate: '2024-07-31', examsAssigned: 18, avgScore: 71.2, status: 'active' },
  { id: 'b3', name: 'RRB NTPC — Weekend Warriors', category: 'RRB', students: 120, maxStudents: 150, startDate: '2024-03-01', endDate: '2024-08-31', examsAssigned: 12, avgScore: 65.8, status: 'active' },
  { id: 'b4', name: 'SSC CHSL 2023 — Completed', category: 'SSC', students: 320, maxStudents: 320, startDate: '2023-06-01', endDate: '2023-12-31', examsAssigned: 36, avgScore: 72.1, status: 'completed' },
];

function BatchCard({ batch }: { batch: typeof mockBatches[0] }) {
  const fillPct = (batch.students / batch.maxStudents) * 100;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{batch.name}</h3>
          <Badge variant="primary" className="mt-1">{batch.category}</Badge>
        </div>
        <Badge variant={batch.status === 'active' ? 'success' : 'default'}>
          {batch.status === 'active' ? 'Active' : 'Completed'}
        </Badge>
      </div>

      {/* Fill rate */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-500">Students enrolled</span>
          <span className="text-xs font-semibold text-slate-900">{batch.students}/{batch.maxStudents}</span>
        </div>
        <ProgressBar value={fillPct} color={fillPct >= 90 ? 'red' : fillPct >= 70 ? 'amber' : 'emerald'} size="sm" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { icon: BookOpen, label: 'Exams', value: batch.examsAssigned },
          { icon: Users, label: 'Avg Score', value: `${batch.avgScore}%` },
          { icon: Calendar, label: 'Start', value: new Date(batch.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' }) },
          { icon: Calendar, label: 'End', value: new Date(batch.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' }) },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-3.5 h-3.5 text-slate-400" />
            <div>
              <p className="text-[10px] text-slate-400">{label}</p>
              <p className="text-xs font-semibold text-slate-700">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
          <Users className="w-3.5 h-3.5" /> View Students
        </button>
        <button className="p-2 border border-slate-300 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors">
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button className="p-2 border border-slate-300 text-slate-500 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
}

export default function AdminBatchesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = mockBatches.filter((b) =>
    !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = mockBatches.reduce((s, b) => s + b.students, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Batch Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage student cohorts and assign exams</p>
        </div>
        <Button className="gap-2" onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4" /> Create Batch
        </Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Batches', value: mockBatches.length, color: 'bg-indigo-600' },
          { label: 'Active Batches', value: mockBatches.filter(b => b.status === 'active').length, color: 'bg-emerald-500' },
          { label: 'Total Students', value: totalStudents.toLocaleString(), color: 'bg-purple-500' },
          { label: 'Avg Batch Score', value: `${(mockBatches.reduce((s, b) => s + b.avgScore, 0) / mockBatches.length).toFixed(1)}%`, color: 'bg-amber-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`w-8 h-1 rounded-full ${color} mb-3`} />
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Search & filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search batches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Active', 'Completed'].map((s) => (
            <button key={s} className={`px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors ${s === 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 text-slate-600 hover:border-indigo-300'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Batch cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((batch) => <BatchCard key={batch.id} batch={batch} />)}
      </div>

      {/* Create batch modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Create New Batch</h2>
              <button onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Batch Name</label>
                <input type="text" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. SSC CGL 2024 — Batch B" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Exam Category</label>
                  <select className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {['SSC', 'Banking', 'RRB', 'State PCS'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Max Students</label>
                  <input type="number" defaultValue={200} className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                  <input type="date" className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Invite Students (email)</label>
                <div className="flex gap-2">
                  <input type="email" className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="student@email.com" />
                  <Button variant="outline" size="sm" className="gap-1.5 shrink-0">
                    <Mail className="w-3.5 h-3.5" /> Invite
                  </Button>
                </div>
                <p className="text-xs text-slate-400 mt-1">Or share the batch invite link after creation</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button>Create Batch</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
