'use client';
import { useState } from 'react';
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward, Settings } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface VideoPlayerProps {
  title: string;
  duration: string;
  thumbnail?: string;
  className?: string;
}

export function VideoPlayer({ title, duration, thumbnail, className }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className={cn('bg-black rounded-xl overflow-hidden', className)}>
      {/* Video area */}
      <div
        className="relative aspect-video bg-slate-900 flex items-center justify-center cursor-pointer group"
        onClick={() => setPlaying((v) => !v)}
      >
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover opacity-70" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Video Preview</span>
          </div>
        )}

        {/* Play button overlay */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center transition-opacity',
          playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        )}>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 hover:bg-white/30 transition-colors">
            {playing
              ? <Pause className="w-7 h-7 text-white" />
              : <Play className="w-7 h-7 text-white ml-1" />}
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 text-white text-xs rounded font-mono">
          {duration}
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 bg-slate-900">
        {/* Progress bar */}
        <div
          className="w-full h-1 bg-slate-700 rounded-full mb-3 cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setProgress(((e.clientX - rect.left) / rect.width) * 100);
          }}
        >
          <div
            className="h-full bg-indigo-500 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-white transition-colors">
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPlaying((v) => !v)}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
          >
            {playing
              ? <Pause className="w-4 h-4 text-slate-900" />
              : <Play className="w-4 h-4 text-slate-900 ml-0.5" />}
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <SkipForward className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-400 font-mono ml-1">
            0:00 / {duration}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button className="text-slate-400 hover:text-white transition-colors">
              <Volume2 className="w-4 h-4" />
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
