'use client';
import { useState } from 'react';
import { Zap, CheckCircle2, ArrowRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { ExamCategory } from '@/types';

const examOptions: { id: ExamCategory; label: string; desc: string; emoji: string }[] = [
  { id: 'SSC', label: 'SSC', desc: 'CGL, CHSL, MTS, CPO', emoji: '🏛️' },
  { id: 'Banking', label: 'Banking', desc: 'IBPS PO/Clerk, SBI PO/Clerk', emoji: '🏦' },
  { id: 'RRB', label: 'Railways', desc: 'RRB NTPC, Group D, ALP', emoji: '🚂' },
  { id: 'State PCS', label: 'State PCS', desc: 'UPPSC, MPPSC, BPSC, etc.', emoji: '📋' },
  { id: 'UPSC', label: 'UPSC', desc: 'Civil Services, CDS, CAPF', emoji: '🎖️' },
];

const studyGoals = [
  { id: '1h', label: '1 hour/day', desc: 'Relaxed pace' },
  { id: '2h', label: '2 hours/day', desc: 'Steady progress' },
  { id: '4h', label: '4 hours/day', desc: 'Intensive prep' },
  { id: '6h', label: '6+ hours/day', desc: 'Full dedication' },
];

const examTimelines = [
  { id: '1m', label: 'Under 1 month' },
  { id: '3m', label: '1–3 months' },
  { id: '6m', label: '3–6 months' },
  { id: '1y', label: '6–12 months' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedExams, setSelectedExams] = useState<ExamCategory[]>([]);
  const [studyGoal, setStudyGoal] = useState('');
  const [timeline, setTimeline] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleExam = (id: ExamCategory) => {
    setSelectedExams((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const finish = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  s < step ? 'bg-indigo-600 text-white' :
                  s === step ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' :
                  'bg-slate-200 text-slate-500'
                }`}>
                  {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${s < step ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 animate-fade-in">
          {/* Step 1: Exam Selection */}
          {step === 1 && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-900">Which exam(s) are you targeting?</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6">Select all that apply. We&apos;ll customize your content.</p>
              <div className="grid grid-cols-1 gap-3">
                {examOptions.map(({ id, label, desc, emoji }) => (
                  <button
                    key={id}
                    onClick={() => toggleExam(id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      selectedExams.includes(id)
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl">{emoji}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{label}</p>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </div>
                    {selectedExams.includes(id) && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              <Button
                className="w-full mt-6"
                size="lg"
                disabled={selectedExams.length === 0}
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Step 2: Study Goal */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-bold text-slate-900 mb-2">How many hours can you study daily?</h2>
              <p className="text-slate-500 text-sm mb-6">We&apos;ll build your study plan around this.</p>
              <div className="grid grid-cols-2 gap-3">
                {studyGoals.map(({ id, label, desc }) => (
                  <button
                    key={id}
                    onClick={() => setStudyGoal(id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      studyGoal === id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-semibold text-slate-900 text-sm">{label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" disabled={!studyGoal} onClick={() => setStep(3)}>
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-bold text-slate-900 mb-2">When is your exam?</h2>
              <p className="text-slate-500 text-sm mb-6">We&apos;ll set the intensity of your prep accordingly.</p>
              <div className="grid grid-cols-2 gap-3">
                {examTimelines.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setTimeline(id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      timeline === id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-semibold text-slate-900 text-sm">{label}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1" disabled={!timeline} onClick={finish} loading={loading}>
                  {!loading && <>Start Preparing <ArrowRight className="w-4 h-4" /></>}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
