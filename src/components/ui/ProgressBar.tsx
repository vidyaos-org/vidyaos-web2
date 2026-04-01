import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
  color?: 'indigo' | 'emerald' | 'amber' | 'red';
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

const colorClasses = {
  indigo: 'bg-indigo-600',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
};

export function ProgressBar({ value, className, color = 'indigo', size = 'md', showLabel }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Progress</span>
          <span>{pct.toFixed(0)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-slate-200 rounded-full', sizeClasses[size])}>
        <div
          className={cn('rounded-full transition-all duration-500', colorClasses[color], sizeClasses[size])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
