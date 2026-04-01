import { cn } from '@/lib/utils/cn';
import type { TopicHeatmapData } from '@/types';

interface TopicHeatmapProps {
  data: TopicHeatmapData[];
  className?: string;
}

const statusColors = {
  strong: 'bg-emerald-500 text-white',
  moderate: 'bg-amber-400 text-white',
  weak: 'bg-red-500 text-white',
  not_attempted: 'bg-slate-200 text-slate-400',
};

export function TopicHeatmap({ data, className }: TopicHeatmapProps) {
  const subjects = [...new Set(data.map((d) => d.subject))];

  return (
    <div className={cn('space-y-4', className)}>
      {subjects.map((subject) => {
        const topics = data.filter((d) => d.subject === subject);
        return (
          <div key={subject}>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{subject}</p>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <div
                  key={topic.topic}
                  title={`${topic.topic}: ${topic.accuracy}% (${topic.questionsAttempted} questions)`}
                  className={cn(
                    'px-2 py-1.5 rounded text-xs font-medium cursor-default transition-opacity hover:opacity-80',
                    statusColors[topic.status]
                  )}
                >
                  <p className="truncate max-w-28">{topic.topic}</p>
                  <p className="opacity-75 text-[10px]">
                    {topic.questionsAttempted > 0 ? `${topic.accuracy}%` : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex items-center gap-4 pt-2 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Strong (&gt;70%)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" /> Moderate (50–70%)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> Weak (&lt;50%)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-slate-200 inline-block" /> Not attempted</span>
      </div>
    </div>
  );
}
