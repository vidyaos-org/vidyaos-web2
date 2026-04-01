'use client';
import { useState } from 'react';
import {
  MessageSquare, ThumbsUp, Users, Search, Plus, Flame,
  Radio, BookOpen, ExternalLink, ChevronRight
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockDiscussions, mockStudyRooms, mockLeaderboard } from '@/lib/utils/mock-data';

const tabs = ['Discussions', 'Study Rooms', 'Leaderboard'];

function DiscussionCard({ thread }: { thread: typeof mockDiscussions[0] }) {
  return (
    <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
          {thread.authorName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-slate-700">{thread.authorName}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-400">{new Date(thread.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
          </div>
          <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2">{thread.title}</h3>
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{thread.body}</p>
          <div className="flex items-center gap-3">
            {thread.tags.map((tag) => (
              <Badge key={tag} variant="default" className="text-[10px]">#{tag}</Badge>
            ))}
            <div className="ml-auto flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                <ThumbsUp className="w-3.5 h-3.5" /> {thread.upvotes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" /> {thread.replyCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudyRoomCard({ room }: { room: typeof mockStudyRooms[0] }) {
  return (
    <Card hover className="p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {room.isLive && (
            <span className="flex items-center gap-1 text-xs font-semibold text-red-600">
              <Radio className="w-3 h-3" /> LIVE
            </span>
          )}
        </div>
        <Badge variant={room.participantCount >= room.maxParticipants * 0.8 ? 'warning' : 'success'}>
          {room.participantCount}/{room.maxParticipants}
        </Badge>
      </div>
      <h3 className="text-sm font-semibold text-slate-900 mb-1">{room.name}</h3>
      <p className="text-xs text-slate-500 mb-1">Hosted by {room.hostName}</p>
      {room.subject && (
        <p className="text-xs text-indigo-600 mb-3 flex items-center gap-1">
          <BookOpen className="w-3 h-3" /> {room.subject}
        </p>
      )}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 mr-auto">
          {[...Array(Math.min(5, room.participantCount))].map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-300 to-purple-400 border-2 border-white" />
          ))}
          {room.participantCount > 5 && (
            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[9px] text-slate-600 font-bold">
              +{room.participantCount - 5}
            </div>
          )}
        </div>
        <Button size="sm" variant="outline" className="gap-1.5">
          <ExternalLink className="w-3 h-3" /> Join
        </Button>
      </div>
    </Card>
  );
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('Discussions');
  const [search, setSearch] = useState('');

  const filteredDiscussions = mockDiscussions.filter((d) =>
    !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.tags.some(t => t.includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Community</h1>
          <p className="text-slate-500 text-sm mt-0.5">Connect, discuss and learn with fellow aspirants</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> New Discussion
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Discussions tab */}
      {activeTab === 'Discussions' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Hot topics */}
            <div className="flex flex-wrap gap-2">
              {['profit-loss', 'ssc-cgl', 'cutoff', 'reasoning', 'polity'].map((tag) => (
                <button key={tag} onClick={() => setSearch(tag)} className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors">
                  #{tag}
                </button>
              ))}
            </div>

            <Card className="overflow-hidden">
              {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((thread) => (
                  <DiscussionCard key={thread.id} thread={thread} />
                ))
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No discussions found</p>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Trending */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-slate-900 text-sm">Trending Today</h3>
                </div>
              </CardHeader>
              <CardBody className="space-y-3">
                {mockDiscussions.map((d, i) => (
                  <div key={d.id} className="flex items-start gap-2 cursor-pointer group">
                    <span className="text-xs font-bold text-slate-400 w-4 shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-xs text-slate-700 group-hover:text-indigo-600 transition-colors leading-snug">{d.title}</p>
                  </div>
                ))}
              </CardBody>
            </Card>

            {/* Community stats */}
            <Card>
              <CardBody className="space-y-3">
                {[
                  { label: 'Active Members', value: '42,381' },
                  { label: 'Discussions Today', value: '284' },
                  { label: 'Live Study Rooms', value: '18' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{label}</span>
                    <span className="text-sm font-bold text-slate-900">{value}</span>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      )}

      {/* Study Rooms tab */}
      {activeTab === 'Study Rooms' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">{mockStudyRooms.length} active rooms right now</p>
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" /> Create Room
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockStudyRooms.map((room) => (
              <StudyRoomCard key={room.id} room={room} />
            ))}
            {/* Create new room card */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium">Create Study Room</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard tab */}
      {activeTab === 'Leaderboard' && (
        <div className="max-w-2xl">
          <div className="flex gap-2 mb-4">
            {['Daily', 'Weekly', 'Monthly', 'All Time'].map((period) => (
              <button key={period} className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors first:bg-indigo-600 first:text-white first:border-indigo-600">
                {period}
              </button>
            ))}
          </div>

          <Card>
            <div className="divide-y divide-slate-100">
              {mockLeaderboard.map((entry) => {
                const isCurrentUser = entry.userId === 'u1';
                return (
                  <div
                    key={entry.userId}
                    className={`flex items-center gap-4 px-5 py-3.5 ${isCurrentUser ? 'bg-indigo-50' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      entry.rank === 1 ? 'bg-amber-400 text-white' :
                      entry.rank === 2 ? 'bg-slate-300 text-slate-700' :
                      entry.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank - 1] : entry.rank}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                      {entry.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${isCurrentUser ? 'text-indigo-700' : 'text-slate-900'}`}>
                        {entry.name} {isCurrentUser && <span className="text-xs font-normal">(You)</span>}
                      </p>
                      <p className="text-xs text-slate-500">{entry.examCategory}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-600 font-bold text-sm shrink-0">
                      <span>⚡</span> {entry.xp.toLocaleString()} XP
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
