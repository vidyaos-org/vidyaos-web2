'use client';
import Link from 'next/link';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { mockUser } from '@/lib/utils/mock-data';

interface TopNavProps {
  title?: string;
}

export function TopNav({ title }: TopNavProps) {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center gap-4 px-6 sticky top-0 z-30">
      {title && (
        <h1 className="text-lg font-semibold text-slate-900 mr-4">{title}</h1>
      )}

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions, topics, exams..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-indigo-300 transition-all"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Daily Quiz CTA */}
        <Link
          href="/exams"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <span>Daily Quiz</span>
          <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-bold">+100 XP</span>
        </Link>

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
            {mockUser.name.charAt(0)}
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-700">{mockUser.name.split(' ')[0]}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
