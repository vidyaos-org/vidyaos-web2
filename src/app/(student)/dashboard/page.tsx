import Link from 'next/link';
import {
  Flame, Trophy, Target, Clock, BookOpen, TrendingUp, Zap,
  ArrowRight, CheckCircle2, Circle, Play, ChevronRight, Brain, AlertCircle
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  mockUser, mockUserStats, mockDailyTasks, mockExams, mockHeatmapData
} from '@/lib/utils/mock-data';

function StatCard({ label, value, sub, icon: Icon, color }: {
  label: string; value: string; sub?: string;
  icon: React.ElementType; color: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
        </div>
        <div className={`p-2.5 rounded-xl ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const completedTasks = mockDailyTasks.filter((t) => t.isCompleted).length;
  const taskProgress = (completedTasks / mockDailyTasks.length) * 100;
  const weakTopics = mockHeatmapData.filter((t) => t.status === 'weak').slice(0, 3);
  const featuredExams = mockExams.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Good morning, {mockUser.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">You&apos;re on a {mockUser.streak}-day streak. Keep it up!</p>
        </div>
        <Link
          href="/exams"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Play className="w-4 h-4" />
          Take Daily Quiz
          <Badge variant="warning" className="ml-1 text-[10px]">+100 XP</Badge>
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Current Streak"
          value={`${mockUserStats.currentStreak} days`}
          sub={`Best: ${mockUserStats.longestStreak} days`}
          icon={Flame}
          color="bg-orange-500"
        />
        <StatCard
          label="Total XP"
          value={mockUser.xp.toLocaleString()}
          sub={`+${mockUserStats.weeklyXP} this week`}
          icon={Zap}
          color="bg-indigo-600"
        />
        <StatCard
          label="Avg. Accuracy"
          value={`${mockUserStats.averageAccuracy}%`}
          sub={`${mockUserStats.totalQuestionsSolved.toLocaleString()} solved`}
          icon={Target}
          color="bg-emerald-500"
        />
        <StatCard
          label="National Rank"
          value={`#${mockUserStats.rank.toLocaleString()}`}
          sub={`Top ${(100 - mockUserStats.percentile).toFixed(1)}%`}
          icon={Trophy}
          color="bg-amber-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Study Plan */}
          <Card>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <h2 className="font-semibold text-slate-900">Today&apos;s Study Plan</h2>
              </div>
              <span className="text-sm text-slate-500">{completedTasks}/{mockDailyTasks.length} done</span>
            </div>
            <CardBody className="space-y-1">
              <ProgressBar value={taskProgress} className="mb-4" size="sm" />
              {mockDailyTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    task.isCompleted ? 'opacity-60' : 'hover:bg-slate-50 cursor-pointer'
                  }`}
                >
                  {task.isCompleted
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    : <Circle className="w-5 h-5 text-slate-300 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.isCompleted ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {task.title}
                    </p>
                    {task.subject && (
                      <p className="text-xs text-slate-500">{task.subject} · {task.estimatedMinutes} min</p>
                    )}
                  </div>
                  <Badge variant={task.isCompleted ? 'success' : 'primary'} className="shrink-0">
                    +{task.xpReward} XP
                  </Badge>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Recommended Exams */}
          <Card>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <h2 className="font-semibold text-slate-900">Recommended Tests</h2>
              </div>
              <Link href="/exams" className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {featuredExams.map((exam) => (
                <Link
                  key={exam.id}
                  href={`/test/${exam.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{exam.title}</p>
                    <p className="text-xs text-slate-500">
                      {exam.totalQuestions} Qs · {exam.durationMinutes} min · {exam.attemptedCount?.toLocaleString()} attempts
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {exam.isFree ? (
                      <Badge variant="success">Free</Badge>
                    ) : (
                      <Badge variant="primary">Pro</Badge>
                    )}
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Weak Topics Alert */}
          <Card>
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <h2 className="font-semibold text-slate-900 text-sm">Weak Areas to Focus</h2>
            </div>
            <div className="px-5 py-4 space-y-3">
              {weakTopics.map((topic) => (
                <div key={topic.topic}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-700">{topic.topic}</span>
                    <span className="text-xs text-red-600 font-semibold">{topic.accuracy}%</span>
                  </div>
                  <ProgressBar value={topic.accuracy} color="red" size="sm" />
                </div>
              ))}
              <Link
                href="/practice"
                className="flex items-center justify-center gap-1.5 mt-3 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Practice Weak Topics <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Card>

          {/* AI Mentor */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5" />
              <h3 className="font-semibold">AI Study Mentor</h3>
            </div>
            <p className="text-indigo-100 text-sm leading-relaxed mb-4">
              Based on your performance, focus on <strong>Percentage</strong> and <strong>Simplification</strong> today. Your accuracy dropped 12% in these areas.
            </p>
            <Link
              href="/analytics"
              className="flex items-center gap-1.5 text-sm font-semibold bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors w-fit"
            >
              View Full Analysis <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Quick Stats */}
          <Card>
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <h2 className="font-semibold text-slate-900 text-sm">This Week</h2>
              </div>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                { label: 'Questions Solved', value: '312', change: '+24%' },
                { label: 'Study Time', value: '14.5 hrs', change: '+8%' },
                { label: 'Tests Taken', value: '5', change: '+2' },
              ].map(({ label, value, change }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{value}</span>
                    <span className="text-xs text-emerald-600 font-medium">{change}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
