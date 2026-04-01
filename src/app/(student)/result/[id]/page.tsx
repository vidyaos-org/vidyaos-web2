import Link from 'next/link';
import {
  Trophy, Target, Clock, TrendingUp, ArrowRight,
  CheckCircle2, XCircle, MinusCircle, Share2
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { mockTestResult } from '@/lib/utils/mock-data';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function ScoreRing({ score, max }: { score: number; max: number }) {
  const pct = (score / max) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle
          cx="60" cy="60" r="54" fill="none"
          stroke={pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444'}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">{score}</span>
        <span className="text-xs text-slate-500">/ {max}</span>
      </div>
    </div>
  );
}

export default function ResultPage({ params }: { params: { id: string } }) {
  const result = mockTestResult;
  const pct = (result.score / result.maxScore) * 100;
  const grade = pct >= 80 ? 'Excellent' : pct >= 60 ? 'Good' : pct >= 40 ? 'Average' : 'Needs Work';
  const gradeColor = pct >= 80 ? 'text-emerald-600' : pct >= 60 ? 'text-indigo-600' : pct >= 40 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Test Result</h1>
          <p className="text-slate-500 text-sm mt-0.5">{result.examTitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <Link
            href="/exams"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Take Another Test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Score overview */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Score card */}
        <Card className="md:col-span-1 p-6 text-center">
          <ScoreRing score={Math.round(result.score)} max={result.maxScore} />
          <div className="mt-4">
            <p className={`text-xl font-bold ${gradeColor}`}>{grade}</p>
            <p className="text-sm text-slate-500 mt-1">Score: {pct.toFixed(1)}%</p>
          </div>
          {result.rank && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-slate-900">Rank #{result.rank.toLocaleString()}</span>
              <span className="text-slate-500">· Top {(100 - result.percentile!).toFixed(1)}%</span>
            </div>
          )}
        </Card>

        {/* Stats */}
        <Card className="md:col-span-2">
          <CardBody className="grid grid-cols-2 gap-4">
            {[
              { icon: CheckCircle2, label: 'Correct', value: result.correct, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: XCircle, label: 'Incorrect', value: result.incorrect, color: 'text-red-600', bg: 'bg-red-50' },
              { icon: MinusCircle, label: 'Skipped', value: result.skipped, color: 'text-slate-500', bg: 'bg-slate-50' },
              { icon: Target, label: 'Accuracy', value: `${result.accuracy.toFixed(1)}%`, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { icon: Clock, label: 'Time Taken', value: formatTime(result.timeTaken), color: 'text-purple-600', bg: 'bg-purple-50' },
              { icon: TrendingUp, label: 'Percentile', value: `${result.percentile?.toFixed(1)}th`, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className={`flex items-center gap-3 p-4 rounded-xl ${bg}`}>
                <Icon className={`w-5 h-5 ${color} shrink-0`} />
                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className={`text-lg font-bold ${color}`}>{value}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Section wise */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-slate-900">Section-wise Performance</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          {result.sectionWise.map((section) => (
            <div key={section.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-800">{section.name}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-emerald-600 font-medium">✓ {section.correct}</span>
                    <span className="text-red-500 font-medium">✗ {section.incorrect}</span>
                    <span className="text-slate-400">- {section.skipped}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-900">{section.score}/{section.maxScore}</span>
                  <Badge variant={section.accuracy >= 70 ? 'success' : section.accuracy >= 50 ? 'warning' : 'danger'}>
                    {section.accuracy.toFixed(0)}%
                  </Badge>
                </div>
              </div>
              <ProgressBar
                value={section.accuracy}
                color={section.accuracy >= 70 ? 'emerald' : section.accuracy >= 50 ? 'amber' : 'red'}
                size="sm"
              />
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Topic wise */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Topic-wise Breakdown</h2>
            <Link href="/analytics" className="text-xs text-indigo-600 font-medium hover:underline">
              View Full Analytics →
            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid md:grid-cols-2 gap-3">
            {result.topicWise.sort((a, b) => a.accuracy - b.accuracy).map((topic) => (
              <div key={topic.topic} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{topic.topic}</p>
                  <p className="text-xs text-slate-500">{topic.subject} · {topic.correct}/{topic.total} correct</p>
                </div>
                <div className={`text-sm font-bold ${
                  topic.accuracy >= 70 ? 'text-emerald-600' :
                  topic.accuracy >= 50 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {topic.accuracy}%
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="font-bold text-lg mb-3">🧠 AI Analysis & Recommendations</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="font-semibold mb-1">Strength</p>
            <p className="text-indigo-100">Your General Awareness score (87.5%) is exceptional. Indian Polity is your strongest topic — keep revising to maintain it.</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="font-semibold mb-1">Focus Area</p>
            <p className="text-indigo-100">Percentage (40%) and Speed & Distance (40%) pulled down your Quant score. Practice 20 questions daily from these topics.</p>
          </div>
        </div>
        <Link
          href="/practice"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-colors text-sm"
        >
          Start Targeted Practice <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
