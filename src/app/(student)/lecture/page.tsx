'use client';
import { useState } from 'react';
import { Play, Clock, BookOpen, Download, Filter, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { VideoPlayer } from '@/components/modules/lecture/VideoPlayer';
import { NotesViewer } from '@/components/modules/lecture/NotesViewer';

const mockVideos = [
  { id: 'v1', title: 'Percentage — Complete Concepts & Tricks', subject: 'Maths', topic: 'Percentage', duration: '18:42', views: 12400, type: 'concept', isNew: true },
  { id: 'v2', title: 'Blood Relations — Shortcut Method (60 sec reel)', subject: 'Reasoning', topic: 'Blood Relations', duration: '1:02', views: 8200, type: 'reel', isNew: false },
  { id: 'v3', title: 'Indian Constitution — Article 1 to 395 Summary', subject: 'GA', topic: 'Polity', duration: '32:15', views: 9800, type: 'concept', isNew: false },
  { id: 'v4', title: 'Speed Distance Formula Sheet (60 sec)', subject: 'Maths', topic: 'Speed & Distance', duration: '0:58', views: 6300, type: 'reel', isNew: true },
  { id: 'v5', title: 'Reading Comprehension — Approach & Strategies', subject: 'English', topic: 'RC', duration: '24:10', views: 7100, type: 'concept', isNew: false },
];

const tabs = ['Video Lessons', 'Short Reels', 'PDF Notes'];
const subjects = ['All', 'Maths', 'Reasoning', 'GA', 'English'];

export default function LecturePage() {
  const [activeTab, setActiveTab] = useState('Video Lessons');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(mockVideos[0]);

  const typeFilter = activeTab === 'Video Lessons' ? 'concept' : activeTab === 'Short Reels' ? 'reel' : null;
  const filtered = mockVideos.filter((v) => {
    if (typeFilter && v.type !== typeFilter) return false;
    if (selectedSubject !== 'All' && v.subject !== selectedSubject) return false;
    if (search && !v.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Video Lessons</h1>
        <p className="text-slate-500 text-sm mt-0.5">Full-length concept videos, 60-second formula reels, and downloadable PDF notes</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab !== 'PDF Notes' ? (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Video player */}
          <div className="lg:col-span-3 space-y-4">
            <VideoPlayer
              title={selectedVideo.title}
              duration={selectedVideo.duration}
              className="w-full"
            />
            <div>
              <h2 className="text-base font-semibold text-slate-900">{selectedVideo.title}</h2>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="primary">{selectedVideo.subject}</Badge>
                <Badge variant="default">{selectedVideo.topic}</Badge>
                <span className="text-xs text-slate-500">{selectedVideo.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>

          {/* Video list */}
          <div className="lg:col-span-2 space-y-3">
            {/* Search & filter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              {subjects.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSubject(s)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                    selectedSubject === s ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-300 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Video cards */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filtered.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    selectedVideo.id === video.id ? 'bg-indigo-50 border border-indigo-200' : 'bg-white border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-20 h-14 bg-slate-900 rounded-lg flex items-center justify-center shrink-0 relative">
                    <Play className="w-5 h-5 text-white" />
                    <span className="absolute bottom-1 right-1 text-[10px] text-white bg-black/60 px-1 rounded font-mono">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 line-clamp-2 leading-snug">{video.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary" className="text-[10px]">{video.subject}</Badge>
                      {video.isNew && <Badge variant="success" className="text-[10px]">New</Badge>}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      <Clock className="w-2.5 h-2.5 inline mr-0.5" />{video.duration} · {video.views.toLocaleString()} views
                    </p>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-sm">No videos found</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <NotesViewer />
      )}
    </div>
  );
}
