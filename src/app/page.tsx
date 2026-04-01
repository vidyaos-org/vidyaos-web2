import Link from 'next/link';
import { Zap, Brain, Trophy, Users, Target, ArrowRight, CheckCircle2, Star, TrendingUp, BookOpen } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Study Mentor', desc: 'Personalized study plans that adapt to your learning style and weak areas.' },
  { icon: Target, title: 'Mock Test Engine', desc: 'Real exam patterns — SSC CGL, IBPS PO, RRB NTPC — with negative marking.' },
  { icon: TrendingUp, title: 'Performance Analytics', desc: 'Topic-wise heatmaps, accuracy trends, and AI-detected weak spots.' },
  { icon: Users, title: 'Study Rooms', desc: 'Join live group study sessions and quiz battles with fellow aspirants.' },
  { icon: BookOpen, title: '50,000+ Questions', desc: '10+ years of PYQs with step-by-step solutions and AI explanations.' },
  { icon: Trophy, title: 'Gamification', desc: 'XP points, streaks, leaderboards, and achievement badges to keep you motivated.' },
];

const exams = ['SSC CGL', 'SSC CHSL', 'IBPS PO', 'IBPS Clerk', 'SBI PO', 'RRB NTPC', 'RRB Group D', 'State PCS'];

const stats = [
  { value: '5L+', label: 'Registered Students' },
  { value: '50K+', label: 'Practice Questions' },
  { value: '88%', label: 'Selection Rate' },
  { value: '4.8★', label: 'App Rating' },
];

const plans = [
  { name: 'Free', price: '₹0', period: '/month', features: ['5 mock tests/month', 'Basic practice', 'Community access', '1,000 questions'], cta: 'Get Started', highlight: false },
  { name: 'Pro', price: '₹199', period: '/month', features: ['Unlimited mock tests', 'Full AI features', 'Performance analytics', 'All 50K+ questions', 'Spaced repetition'], cta: 'Start Free Trial', highlight: true },
  { name: 'Elite', price: '₹499', period: '/month', features: ['Everything in Pro', 'Live quiz battles', 'Accountability partner', 'Exam day simulator', 'Mentor sessions'], cta: 'Go Elite', highlight: false },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">ExamOS</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 ml-8">
            <Link href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</Link>
            <Link href="#exams" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Exams</Link>
            <Link href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Login</Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 to-white pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-96 h-40 bg-indigo-200 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            India&apos;s First AI-Powered Exam OS
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            Crack SSC, Banking &amp; RRB
            <span className="block text-indigo-600 mt-1">with AI on your side</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            ExamOS adapts to <em>your</em> weaknesses, builds your study plan, and simulates the real exam — so you walk in ready to top it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-105 text-lg"
            >
              Start Free Today
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/exams"
              className="inline-flex items-center gap-2 px-8 py-4 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-lg"
            >
              Take a Free Mock Test
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-500">No credit card required · Free forever plan available</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-extrabold text-white">{value}</p>
              <p className="text-sm text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">Everything you need to clear your exam</h2>
            <p className="text-slate-500 mt-3 text-lg">Built for serious aspirants who want results, not just content.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                  <Icon className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exams Covered */}
      <section id="exams" className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Covering all major government exams</h2>
          <p className="text-slate-500 mb-10">Mock tests, PYQs, and AI plans built specifically for each exam pattern.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {exams.map((exam) => (
              <span
                key={exam}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-700 transition-colors cursor-pointer"
              >
                {exam}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">Simple, transparent pricing</h2>
            <p className="text-slate-500 mt-3">Start free. Upgrade when you&apos;re ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map(({ name, price, period, features: planFeatures, cta, highlight }) => (
              <div
                key={name}
                className={`p-6 rounded-2xl border-2 relative ${
                  highlight
                    ? 'border-indigo-500 bg-indigo-600 text-white shadow-xl shadow-indigo-200'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`text-lg font-bold ${highlight ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
                <div className="flex items-baseline gap-1 mt-2 mb-6">
                  <span className={`text-4xl font-extrabold ${highlight ? 'text-white' : 'text-slate-900'}`}>{price}</span>
                  <span className={`text-sm ${highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{period}</span>
                </div>
                <ul className="space-y-2 mb-8">
                  {planFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${highlight ? 'text-indigo-200' : 'text-emerald-500'}`} />
                      <span className={highlight ? 'text-indigo-100' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block w-full py-2.5 text-sm font-semibold text-center rounded-lg transition-colors ${
                    highlight
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-300 fill-amber-300" />)}
          </div>
          <h2 className="text-4xl font-extrabold mb-4">Join 5 lakh+ aspirants already using ExamOS</h2>
          <p className="text-indigo-200 mb-8 text-lg">Your government job is waiting. Let&apos;s prepare smarter.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-lg"
          >
            Start Preparing Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">ExamOS</span>
          </div>
          <p className="text-xs text-center">© 2024 ExamOS. Built for India&apos;s 2 crore+ government job aspirants.</p>
          <div className="flex gap-6 text-xs">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
