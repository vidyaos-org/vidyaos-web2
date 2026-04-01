import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <TopNav />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
