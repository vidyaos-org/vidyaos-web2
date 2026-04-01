'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  LayoutDashboard, BookOpen, ClipboardList, BarChart2,
  Users, Flame, Trophy, Settings, ChevronRight, Zap, Brain
} from 'lucide-react';
import { mockUser } from '@/lib/utils/mock-data';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/exams', label: 'Exams & Tests', icon: ClipboardList },
  { href: '/practice', label: 'Question Bank', icon: BookOpen },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/lecture', label: 'Video Lessons', icon: Brain },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-slate-900">ExamOS</span>
        <span className="ml-auto px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-100 text-indigo-700 rounded">PRO</span>
      </div>

      {/* User mini-profile */}
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            {mockUser.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{mockUser.name}</p>
            <p className="text-xs text-slate-500 truncate">{mockUser.examPreferences.join(' · ')}</p>
          </div>
        </div>
        {/* XP bar */}
        <div className="mt-3 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500 shrink-0" />
          <span className="text-xs font-medium text-orange-600">{mockUser.streak} day streak</span>
          <div className="ml-auto flex items-center gap-1">
            <Trophy className="w-3 h-3 text-amber-500" />
            <span className="text-xs font-semibold text-amber-600">{mockUser.xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-2 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Main Menu</p>
        <ul className="space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group',
                    active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <Icon className={cn('w-4 h-4', active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600')} />
                  {label}
                  {active && <ChevronRight className="w-3 h-3 ml-auto text-indigo-400" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-slate-100">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
