'use client';
import { useState } from 'react';
import { Download, BookOpen, Search, ChevronRight, FileText, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Note {
  id: string;
  title: string;
  subject: string;
  pages: number;
  size: string;
  type: 'notes' | 'cheatsheet' | 'formula' | 'mindmap';
}

interface NotesViewerProps {
  notes?: Note[];
  className?: string;
}

const mockNotes: Note[] = [
  { id: 'n1', title: 'Quantitative Aptitude — Complete Formula Sheet', subject: 'Maths', pages: 12, size: '2.4 MB', type: 'formula' },
  { id: 'n2', title: 'Indian Polity Cheat Sheet — SSC CGL', subject: 'GA', pages: 8, size: '1.8 MB', type: 'cheatsheet' },
  { id: 'n3', title: 'English Grammar Rules — Quick Reference', subject: 'English', pages: 6, size: '1.2 MB', type: 'notes' },
  { id: 'n4', title: 'Reasoning Mind Map — All Topics', subject: 'Reasoning', pages: 4, size: '3.1 MB', type: 'mindmap' },
];

const typeConfig = {
  notes: { label: 'Notes', color: 'bg-indigo-100 text-indigo-700', icon: '📄' },
  cheatsheet: { label: 'Cheat Sheet', color: 'bg-emerald-100 text-emerald-700', icon: '📋' },
  formula: { label: 'Formula Sheet', color: 'bg-purple-100 text-purple-700', icon: '🔢' },
  mindmap: { label: 'Mind Map', color: 'bg-amber-100 text-amber-700', icon: '🧠' },
};

export function NotesViewer({ notes = mockNotes, className }: NotesViewerProps) {
  const [search, setSearch] = useState('');
  const [zoom, setZoom] = useState(100);

  const filtered = notes.filter((n) =>
    !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={cn('', className)}>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Zoom controls */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="p-1.5 border border-slate-300 rounded hover:bg-slate-50 text-slate-600">
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs text-slate-600 font-medium w-12 text-center">{zoom}%</span>
        <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="p-1.5 border border-slate-300 rounded hover:bg-slate-50 text-slate-600">
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      {/* Notes list */}
      <div className="space-y-2">
        {filtered.map((note) => {
          const config = typeConfig[note.type];
          return (
            <div
              key={note.id}
              className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-12 bg-slate-100 rounded flex items-center justify-center text-xl shrink-0">
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{note.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${config.color}`}>
                    {config.label}
                  </span>
                  <span className="text-xs text-slate-500">{note.subject}</span>
                  <span className="text-xs text-slate-400">{note.pages} pages · {note.size}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                  <BookOpen className="w-3.5 h-3.5" /> View
                </button>
                <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notes found</p>
          </div>
        )}
      </div>
    </div>
  );
}
