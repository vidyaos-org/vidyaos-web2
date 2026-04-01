'use client';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { TrendingUp, Target, Clock, Trophy, Brain, AlertTriangle } from 'lucide-react';
import {
  mockUserStats, mockPerformanceData, mockHeatmapData, mockTestResult
} from '@/lib/utils/mock-data';

const radarData = [
  { subject: 'Maths', score: 58 },
  { subject: 'Reasoning', score: 74 },
  { subject: 'GA', subject2: 'Gen. Awareness', score: 82 },
  { subject: 'English', score: 70 },
  { subject: 'Speed', score: 65 },
  { subject: 'Accuracy', score: 72 },
];

const subjectGroups = ['Maths', 'Reasoning', 'GA', 'English'];

function HeatmapCell({ topic }: { topic: typeof mockHeatmapData[0] }) {
  const colorMap = {
    strong: 'bg-emerald-500',
    moderate: 'bg-amber-400',
    weak: 'bg-red-500',
    not_attempted: 'bg-slate-200',
  };
  const textMap = {
    strong: 'text-white',
    moderate: 'text-white',
    weak: 'text-white',
    not_attempted: 'text-slate-400',
  };
  return (
    <div
      title={`${topic.topic}: ${topic.accuracy}% (${topic.questionsAttempted} questions)`}
      className={`${colorMap[topic.status]} ${textMap[topic.status]} px-2 py-1.5 rounded text-xs font-medium cursor-default`}
    >
      <p className="truncate max-w-24">{topic.topic}</p>
      <p className="opacity-80 text-[10px]">{topic.questionsAttempted > 0 ? `${topic.accuracy}%` : 'N/A'}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const weakTopics = mockHeatmapData.filter((t) => t.status === 'weak');
  const strongTopics = mockHeatmapData.filter((t) => t.status === 'strong');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Performance Analytics</h1>
        <p className="text-slate-500 text-sm mt-0.5">Track your progress and identify areas for improvement</p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Target, label: 'Avg. Accuracy', value: `${mockUserStats.averageAccuracy}%`, color: 'bg-indigo-600', trend: '+4.2%' },
          { icon: TrendingUp, label: 'Questions Solved', value: mockUserStats.totalQuestionsSolved.toLocaleString(), color: 'bg-emerald-500', trend: '+312 this week' },
          { icon: Clock, label: 'Study Hours', value: `${mockUserStats.totalStudyHours}h`, color: 'bg-purple-600', trend: '+14.5h this week' },
          { icon: Trophy, label: 'Tests Taken', value: mockUserStats.totalTestsTaken, color: 'bg-amber-500', trend: '+5 this week' },
        ].map(({ icon: Icon, label, value, color, trend }) => (
          <Card key={label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">{trend}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Accuracy chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="font-semibold text-slate-900">Accuracy Trend (Last 7 Days)</h2>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockPerformanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                  formatter={(val: number) => [`${val}%`, 'Accuracy']}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#6366f1" strokeWidth={2} fill="url(#accGrad)" dot={{ fill: '#6366f1', r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Subject radar */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-slate-900">Subject Mastery</h2>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Topic heatmap */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Topic Performance Heatmap</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Strong (&gt;70%)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-amber-400 inline-block" /> Moderate (50–70%)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" /> Weak (&lt;50%)</span>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-5">
            {subjectGroups.map((subj) => {
              const topics = mockHeatmapData.filter((t) => t.subject === subj);
              if (!topics.length) return null;
              return (
                <div key={subj}>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{subj}</p>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => <HeatmapCell key={t.topic} topic={t} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* AI Weak/Strong */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h2 className="font-semibold text-slate-900">Weak Topics — Prioritize These</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {weakTopics.map((t) => (
              <div key={t.topic}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="text-sm font-medium text-slate-800">{t.topic}</span>
                    <span className="ml-2 text-xs text-slate-500">{t.subject}</span>
                  </div>
                  <span className="text-sm font-bold text-red-600">{t.accuracy}%</span>
                </div>
                <ProgressBar value={t.accuracy} color="red" size="sm" />
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-600" />
              <h2 className="font-semibold text-slate-900">AI Recommendations</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {[
              { tip: 'Solve 15 Percentage questions daily for 2 weeks', priority: 'High', xp: 120 },
              { tip: 'Review Simplification shortcuts — you\'re making careless errors', priority: 'High', xp: 100 },
              { tip: 'Syllogisms: practice Venn diagram method, not assumptions', priority: 'Medium', xp: 80 },
              { tip: 'Strong in Polity — spend 20% less time here, shift to Maths', priority: 'Low', xp: 50 },
            ].map(({ tip, priority, xp }) => (
              <div key={tip} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                <Badge variant={priority === 'High' ? 'danger' : priority === 'Medium' ? 'warning' : 'default'} className="shrink-0 mt-0.5">
                  {priority}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700 leading-relaxed">{tip}</p>
                </div>
                <Badge variant="primary" className="shrink-0">+{xp} XP</Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Recent tests */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-slate-900">Recent Test Results</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {[mockTestResult, { ...mockTestResult, id: 'r2', examTitle: 'IBPS PO Prelims Mock 1', score: 118, accuracy: 64.1, percentile: 72.3, submittedAt: '2024-03-28T14:00:00Z' }].map((r) => (
              <div key={r.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-indigo-700">{Math.round((r.score / r.maxScore) * 100)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{r.examTitle}</p>
                  <p className="text-xs text-slate-500">
                    {r.correct}✓ {r.incorrect}✗ · Accuracy {r.accuracy.toFixed(1)}% · {new Date(r.submittedAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-900">{r.score}/{r.maxScore}</p>
                  <Badge variant={r.percentile! >= 80 ? 'success' : r.percentile! >= 60 ? 'warning' : 'danger'}>
                    {r.percentile?.toFixed(1)}th %ile
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
