import Link from 'next/link';
import { Zap, LayoutDashboard, BookOpen, ClipboardList, Users, BarChart2 } from 'lucide-react';

const adminNav = [
  { href: '/admin/questions', label: 'Questions', icon: BookOpen },
  { href: '/admin/exams', label: 'Exams', icon: ClipboardList },
  { href: '/admin/batches', label: 'Batches', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Admin sidebar */}
      <aside className="w-60 bg-slate-900 text-white flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold">ExamOS</span>
            <p className="text-[10px] text-slate-400">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors mb-1"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          {adminNav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors mb-1"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-700">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Student View
          </Link>
        </div>
      </aside>

      <div className="ml-60 flex-1 flex flex-col">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 sticky top-0 z-30">
          <h1 className="text-base font-semibold text-slate-800">Admin Panel</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">A</div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
