import { cn } from '@/lib/utils/cn';

interface ScoreCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function ScoreCard({ label, value, sub, trend, trendUp = true, icon, className }: ScoreCardProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-slate-200 shadow-sm p-5', className)}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      {trend && (
        <p className={cn('text-xs font-medium mt-2', trendUp ? 'text-emerald-600' : 'text-red-500')}>
          {trendUp ? '↑' : '↓'} {trend}
        </p>
      )}
    </div>
  );
}
