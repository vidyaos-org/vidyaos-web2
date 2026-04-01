'use client';
import { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface TimerProps {
  totalSeconds: number;
  onExpire?: () => void;
}

export function Timer({ totalSeconds, onExpire }: TimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.();
      return;
    }
    const id = setInterval(() => setRemaining((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [remaining, onExpire]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = (remaining / totalSeconds) * 100;
  const isWarning = pct <= 20;
  const isCritical = pct <= 10;

  return (
    <div className={cn(
      'flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-sm font-semibold transition-colors',
      isCritical ? 'bg-red-100 text-red-700 animate-pulse' :
      isWarning ? 'bg-amber-100 text-amber-700' :
      'bg-slate-100 text-slate-700'
    )}>
      {isWarning ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </div>
  );
}
